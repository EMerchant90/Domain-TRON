import { TNS_CONTRACT_ADDRESS } from '../config/constants';
import tnsAbi from '../config/abi/tns.json';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';

const handleTransaction = async (transaction, successMessage:string, showAlert:boolean) => {
  try {
    const tronWeb = window.tronWeb;
    const contract = await tronWeb.contract(tnsAbi, TNS_CONTRACT_ADDRESS);

    const result = await transaction(contract);

    console.log(result);
    if (showAlert) {
      if (typeof result === 'object' && result.constructor === Object) {
        const explorerLink = `https://nile.tronscan.org/#/transaction/${result.transaction.txID}`
        sweetAlertService.showSuccessAlert('Success', successMessage, explorerLink);
      }
      else if(typeof result === 'string'){
        const explorerLink = `https://nile.tronscan.org/#/transaction/${result}`
        sweetAlertService.showSuccessAlert('Success', successMessage, explorerLink);
      }else{
        sweetAlertService.showSuccesMessage('Success', successMessage);
      }
    }
    return result;
  } catch (error: any) {
    const errorMessage = error.message ? error.message : 'Transaction failed';
    sweetAlertService.showErrorAlert('Error', errorMessage);
    throw error;
  }
};

export const buyDomain = async (domain:string, tld:string) => {
  console.log(domain, tld);
  return await handleTransaction(
    async (contract) => await contract.buyDomain(domain , tld).send({
      value:10000000,
      shouldPollResponse: false,
    }),
    'Your domain has been minted successfully',
    true,
  );
};

export const getOwner = async (domain:string) => {
  console.log("dom",domain);
  return await handleTransaction(
    async (contract) => await contract.getOwner(domain).call({shouldPollResponse: false}),
    'Got the owner of the domain',
    false,
  );
};


