//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

contract EnergyMarketplace {
	
	// supply of sTrx
	uint256 public _totalSupply;
	address public owner;
	// Amount of Tron for 1 second energy rent.
	uint256 public unitPriceInMinutesForRentEnergy = 100;
	
	//contractTrxBlc
	uint256 contractTrxBlc;
	
	
	// User renting detail structure.
	struct EnergyRentalDetail {
		uint256 energyAmount;
		uint rentalDuration;
	}
	
	
	// User claim detail structure.
	struct ClaimDetail {
		uint256 tronAmount;
		uint claimTime;
		bool claimed;
	}
	
	mapping(address => ClaimDetail[]) public claimers;
	
	// contain information of borrower.
	mapping(address => EnergyRentalDetail[]) public energyBorrowers;
	mapping(address=>uint256) public _balances;
	
	// event when user stake tokens
	event StakedTokenMinted(uint256 trxAmount, uint256 tokenAmount);
	// event when user un stake tokens
	event StakedTokenBurned(uint256 trxAmount, uint256 tokenAmount);
	
	//event for Energy Rented
	event EnergyRented(address indexed borrower, uint256 energyAmount);
	
	//event for Amount claimed
	event AmountClaimed(address indexed claimer, uint256 claimedAmount);
	
	constructor(){
		owner = msg.sender;
	}
	
	function setEnergyPriceUnit(uint256 unit) public {
		require(msg.sender==owner,"only owner can call function");
		unitPriceInMinutesForRentEnergy = unit;
	}
	
	function getContractTrxBalance()public view returns(uint256){
		return contractTrxBlc;
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
		
		uint256 totalShares = _totalSupply;
		
		uint sTRX = msg.value;
		if (totalShares > 0) {
			sTRX = ((msg.value*totalShares)/(contractTrxBlc));
		}
		freezebalancev2(msg.value,1);
		
		
		_mint(msg.sender, sTRX);
		//updating contract trx balance
		contractTrxBlc = contractTrxBlc + msg.value;
		
		emit StakedTokenMinted(msg.value, sTRX);
		return sTRX;
	}
	
	
	
	
	function unStake(uint256 _share) public  {
		
		uint256 trxAmount = (_share * contractTrxBlc)/(_totalSupply);
		
		//claim logic
		
		_burn(msg.sender, _share);
		contractTrxBlc = contractTrxBlc - trxAmount;
		unfreezebalancev2(trxAmount, 1);
		
		ClaimDetail memory instance;
		instance.claimTime = block.timestamp + (14 days);
		instance.tronAmount = trxAmount;
		instance.claimed = false;
		
		claimers[msg.sender].push(instance);
		
		
		emit StakedTokenBurned(trxAmount, _share);
	}
	
	function viewClaims(address claimer) public view returns(ClaimDetail[] memory){
		return claimers[claimer];
	}
	
	function claim(address claimer,uint256 index) public {
		uint256 trxAmount = claimers[claimer][index].tronAmount;
		
		
		
		if(claimers[claimer][index].claimTime <= block.timestamp && claimers[claimer][index].claimed != true){
			
			
			withdrawexpireunfreeze();
			
			
			payable(claimer).transfer(trxAmount);
			
			claimers[claimer][index].claimed = true;
			
			emit AmountClaimed(claimer,trxAmount);
			
		}else{
			
			revert();
		}
	}
	
	
	
	function rentEnergyFormula(uint tronAmount,uint256 rentalDuration) public  view returns(uint256 energyRentalAmount ){
		energyRentalAmount =  (tronAmount *1440) / (unitPriceInMinutesForRentEnergy *  rentalDuration);
		return (energyRentalAmount);
	}
	
	function rentEnergy(uint trxAmount,uint256 rentalDuration) public payable returns(uint256 energyRentalAmount) {
		energyRentalAmount = rentEnergyFormula(trxAmount,rentalDuration);
		require(msg.value == trxAmount,"Amount and msg value should be same");
		contractTrxBlc +=msg.value;
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
		require(block.timestamp>energyBorrowers[borrower][indexForBorrowerEnergy].rentalDuration,"cant undelegate before time");
		uint256 energyAmountForUnDelegate = energyBorrowers[borrower][indexForBorrowerEnergy].energyAmount;
		payable(borrower).unDelegateResource(energyAmountForUnDelegate,1);
	}
	
	function energyCleanup(address adr) public {
		require(msg.sender==owner,"only moderator can call the functions");
		energyBorrowers[adr].pop();
	}
	
	function claimCleanup(address adr) public {
		require(msg.sender==owner,"only moderator can call the functions");
		claimers[adr].pop();
	}
}
