import { ENERGY_RENTAL_CONTRACT_ADDRESS } from '../config/constants';
import energyRentalAbi from '../config/abi/energy_rental_marketplace.json';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';



  const handleTransaction = async (transaction, successMessage, showAlert) => {
    try {
        debugger;
        const tronWeb = window.tronWeb;
        const contract = await tronWeb.contract(energyRentalAbi, ENERGY_RENTAL_CONTRACT_ADDRESS);

        const result = await transaction(contract);

        
        if (showAlert) {
        const explorerLink = `https://nile.tronscan.org/#/transaction/${result.transaction.txID}`
        sweetAlertService.showSuccessAlert('Success', successMessage , explorerLink);
      }
      return result;
    } catch (error:any) {
      const errorMessage = error.message ? error.message : 'Transaction failed';
      sweetAlertService.showErrorAlert('Error', errorMessage);
      throw error;
    }
  };
  
  export const rentEnergy = async (trxAmount, rentalDuration) => {
    console.info('rentEnergy', trxAmount, rentalDuration);
    return await handleTransaction(
      async (contract) => await contract.rentEnergy(trxAmount, rentalDuration).send({
        shouldPollResponse: true,
      }),
      'Energy Rented successfully',
      true ,
    );
  };
  
  export const stakeTron = async (trxAmount) => {
    return await handleTransaction(
      async (contract) =>
      {
        console.info("STAKE AMOUNT", Math.floor(trxAmount * Math.pow(10, 6)))
        
        return contract.stake().send({
        value: Math.floor(trxAmount * Math.pow(10, 6)),
        shouldPollResponse: false
      })
      },
      'Staking successful',
      true,
    );
  };
  
  export const unstakeTron = async (trxAmount) => {
    return await handleTransaction(
      async (contract) => await contract.unstake(trxAmount).send({  shouldPollResponse: true }),
      'Unstaking successful',
      true,
    );
  };

export const getTrxBalanceOfContract = async () => {
    return await handleTransaction(
      // window.tronWeb.trx.getBalance()
      contract => window.tronWeb.trx.getBalance(ENERGY_RENTAL_CONTRACT_ADDRESS),
      'TRX Balance fetched successfully',
      false,
    );
  };
  
  export const getTotalContractSupply = async () => {
    return await handleTransaction(
      contract => contract._totalSupply().call(),
      'Total contract supply fetched successfully',
      false ,
    );
  };
