import TronWeb from 'tronweb';


const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io', // Use the appropriate full node URL
  });


  export const isValidTronAddress = async (address) => {
    try {
        const isValid = await tronWeb.isAddress(address);
        return isValid;
    } catch (error) {
      console.error('Error Validating wallet Address:', error);
    }
  }