import axios from 'axios';

export async function convertTRXToUSD() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd');
    const tronToUSD = response.data.tron.usd;

    return tronToUSD
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

