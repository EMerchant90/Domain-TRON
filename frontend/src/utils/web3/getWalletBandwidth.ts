import TronWeb from 'tronweb';
import axios from 'axios';

const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io', // Use the appropriate full node URL
});

export async function getUserBandwidth(walletAdress) {
    try {
      const bandwidth = await tronWeb.trx.getBandwidth(walletAdress);
        return bandwidth;
    } catch (error) {
      console.error('Error fetching user bandwidth:', error);
    }
  }