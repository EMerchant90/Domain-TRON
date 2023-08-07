import { ENERGY_RENTAL_CONTRACT_ADDRESS } from '../config/constants';
import energyRentalAbi from '../config/abi/EnergyRentalFacet.json';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';



  const handleTransaction = async (transaction, successMessage, showAlert) => {
    try {
        const tronWeb = window.tronWeb;
        const contract = await tronWeb.contract(energyRentalAbi, ENERGY_RENTAL_CONTRACT_ADDRESS);
        const result = await transaction(contract); // Call the function on the contract instance
      
      if (showAlert) {
        sweetAlertService.showSuccessAlert('Success', successMessage);
      }
      
      return result;
    } catch (error:any) {
      const errorMessage = error.message ? error.message : 'Transaction failed';
      sweetAlertService.showErrorAlert('Error', errorMessage);
      throw error;
    }
  };
  
  export const rentEnergy = async (trxAmount, rentalDuration) => {
    return await handleTransaction(
      async (contract) => await contract.rentEnergy(trxAmount, rentalDuration).send(),
      'Energy Rented successfully',
      true ,
    );
  };
  
  export const stakeTron = async (trxAmount) => {
    return await handleTransaction(
      async (contract) => await contract.stakeTron(trxAmount).send(),
      'Staking successful',
      true,
    );
  };
  
  export const unstakeTron = async (trxAmount) => {
    return await handleTransaction(
      async (contract) => await contract.unstakeTron(trxAmount).send({ trxAmount }),
      'Unstaking successful',
      true,
    );
  };

export const getTrxBalance = async () => {
    return await handleTransaction(
      contract => contract.getEthBalance().call(),
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
