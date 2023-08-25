import TronWeb from 'tronweb';


const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io', // Use the appropriate full node URL
});

export async function getUserEnergy(walletAdress) {
    try {
      const energy = await tronWeb.trx.getAccountResources(walletAdress);
        return energy;
    } catch (error) {
      console.error('Error fetching user energy:', error);
    }
  }