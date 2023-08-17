import { ENERGY_RENTAL_CONTRACT_ADDRESS } from '../config/constants';
import energyRentalAbi from '../config/abi/EnergyMarketplace.json';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';



const handleTransaction = async (transaction, successMessage, showAlert) => {
  try {
    const tronWeb = window.tronWeb;
    const contract = await tronWeb.contract(energyRentalAbi, ENERGY_RENTAL_CONTRACT_ADDRESS);
    
    const result = await transaction(contract);
    console.log(result);
    if (showAlert) {
      if (typeof result === 'object' && result.constructor === Object) {
        const explorerLink = `https://nile.tronscan.org/#/transaction/${result.transaction.txID}`
        sweetAlertService.showSuccessAlert('Success', successMessage, explorerLink);
      }
      else {
        const explorerLink = `https://nile.tronscan.org/#/transaction/${result}`
        sweetAlertService.showSuccessAlert('Success', successMessage, explorerLink);
      }
    }
    return result;
  } catch (error: any) {
    const errorMessage = error.message ? error.message : 'Transaction failed';
    sweetAlertService.showErrorAlert('Error', errorMessage);
    throw error;
  }
};

export const rentEnergy = async (trxAmount, rentalDuration) => {
  return await handleTransaction(
    async (contract) => await contract.rentEnergy((parseInt(trxAmount) * Math.pow(10,6) ), parseInt(rentalDuration)).send({
      callValue:parseInt(trxAmount) * Math.pow(10,6) ,
      shouldPollResponse: false,
    }),
    'Energy Rented successfully',
    true,
  );
};

export const stakeTron = async (trxAmount) => {
  return await handleTransaction(
    async (contract) => {
      const trx = parseInt(trxAmount) * Math.pow(10, 6)

      return contract.stake().send({
        callValue: trx,
        shouldPollResponse: false
      })
    },
    'Staking successful',
    true,
  );
};

export const unstakeTron = async (trxAmount) => {
  return await handleTransaction(
    async (contract) => await contract.unStake(parseInt(trxAmount)).send({  shouldPollResponse: false }),
    'Unstaking successful',
    true,
  );
};

export const getTrxBalanceOfContract = async () => {
  return await handleTransaction(
    async contract =>  await contract.getContractTrxBalance().call(),
    'TRX Balance fetched successfully',
    false,
  );
};

export const getTotalContractSupply = async () => {
  return await handleTransaction(
    contract => contract._totalSupply().call(),
    'Total contract supply fetched successfully',
    false,
  );
};

export const getUserStrxBalance = async (walletAddress) => {
  return await handleTransaction(
    async (contract) => await contract.balanceOf(walletAddress).call(),
    'Wallet STRX Balance fetched successfully',
    false
  );
};

export const getUserClaimHistory = async (walletAddress) => {
  return await handleTransaction(
    async contract => await contract.viewClaims(walletAddress).call(),
    'Wallet STRX Balance fetched successfully',
    false,
  );
};

export const claimUnstakedTrx = async (walletAddress , index) => {
  return await handleTransaction(
    async contract => await contract.claim(walletAddress , index).send({ shouldPollResponse: false}),
    'Wallet STRX Balance fetched successfully',
    false,
  );
};
