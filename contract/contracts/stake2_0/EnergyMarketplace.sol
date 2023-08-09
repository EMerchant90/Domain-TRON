//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

contract EnergyMarketplace {
 
	// supply of sTrx
    uint256 public _totalSupply;
    address public owner;
	// Amount of Tron for 1 second energy rent.
    uint256 public unitPriceInMinutesForRentEnergy = 100;


	// User renting detail structure.
    struct EnergyRentalDetail {
        uint256 energyAmount;
        uint rentalDuration;
    }

	// contain information of borrower.
    mapping(address => EnergyRentalDetail[]) public energyBorrowers;
    mapping(address=>uint256) public _balances;
	
	// event when user stake tokens
    event StakedTokenMinted(uint256 trxAmount, uint256 tokenAmount);
	// event when user un stake tokens
	event StakedTokenBurned(uint256 trxAmount, uint256 tokenAmount);

	//event for Energy Rented
	event EnergyRented(address indexed borrower, uint256 energyAmount);
	
    constructor(){
        owner = msg.sender;
    }
    
    function setEnergyPriceUnit(uint256 unit) public {
        require(msg.sender==owner,"only owner can call function");
        unitPriceInMinutesForRentEnergy = unit;
    }
	

    function getTotalSupply()public view returns(uint256){
        return _totalSupply;
    }

    function _mint(address to,uint256 amount) internal {
       _balances[to] +=  amount;
       _totalSupply += amount;
    }
    
    function _burn(address to,uint256 amount) internal {
       _balances[to] -=  amount;
       _totalSupply -= amount;

    }


    //stake some tron to get Rewards
    function stake() public payable returns(uint256){
        require(msg.value > 0,'Amount Should be Greater than 0');
        uint256 totalTrx = address(this).balance;
        uint256 totalShares = _totalSupply;

		uint sTRX = msg.value;
		if (totalShares > 0) {
			sTRX = ((msg.value*totalShares)/(totalTrx));
		}
		freezebalancev2(msg.value,1);
		emit StakedTokenMinted(msg.value, sTRX);
		return sTRX;
    }

    function unStake(uint256 _share) public  {
		uint256 totalTrx = address(this).balance;
	
		uint256 trxAmount = (_share * totalTrx)/(_totalSupply);
        _burn(msg.sender, _share);
        payable(msg.sender).transfer(trxAmount);
        emit StakedTokenBurned(trxAmount, _share);
    }

    function rentEnergyFormula(uint tronAmount,uint256 rentalDuration) public  view returns(uint256 energyRentalAmount ){
        energyRentalAmount =  (tronAmount *1440) / (unitPriceInMinutesForRentEnergy *  rentalDuration);
        return (energyRentalAmount);
    }

    function rentEnergy(uint trxAmount,uint256 rentalDuration) public payable returns(uint256 energyRentalAmount) {
       energyRentalAmount = rentEnergyFormula(trxAmount,rentalDuration);
       require(msg.value == trxAmount,"Amount and msg value should be same");
       EnergyRentalDetail memory instance;
       rentalDuration = block.timestamp + rentalDuration;
       instance.energyAmount += energyRentalAmount;
       instance.rentalDuration += rentalDuration;
       energyBorrowers[msg.sender].push(instance);
		
		payable(msg.sender).delegateResource(energyRentalAmount, 1);
       
        emit EnergyRented(msg.sender, energyRentalAmount);
        return energyRentalAmount;
    }

    function balanceOf(address x) public view returns(uint256 amount){
        return _balances[x];
    }


    //pop all the elements of an array for energy borrower
    function endRent(address borrower,uint256 indexForBorrowerEnergy) public {
        require(msg.sender==owner,"only moderator can call the function");
        require(block.timestamp>energyBorrowers[borrower][indexForBorrowerEnergy].rentalDuration,"cant delegate before time");
        uint256 energyAmountForUnDelegate = energyBorrowers[borrower][indexForBorrowerEnergy].energyAmount;
        payable(borrower).unDelegateResource(energyAmountForUnDelegate,1);
    }

    function cleanup(address adr) public {
        require(msg.sender==owner,"only moderator can call the functions");
            energyBorrowers[adr].pop();
    }


    function rentEnergyFormulaMins(uint tronAmount,uint256 rentalDuration) public  view returns(uint256 payTron ){
       uint256 energyRentalAmount;

       energyRentalAmount =  (tronAmount * 1440) / (unitPriceInMinutesForRentEnergy *  rentalDuration);
       return (energyRentalAmount);

    }


}
