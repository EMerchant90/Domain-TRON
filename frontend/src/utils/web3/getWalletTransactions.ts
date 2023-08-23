import axios from 'axios';

//to check whether the transaction is being made to new wallet or not
export async function getUserTransactions(walletAdress) {
    try {

      const res = await axios.get(`https://nile.trongrid.io/v1/accounts/${walletAdress}/transactions`)
        
      return res.data.data;
    } catch (error) {
      console.error('Error fetching user transactions:', error);
    }
  }