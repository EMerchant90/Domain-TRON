import axios from 'axios';

export async function getResourceDataFromStaking(walletAddress) {
  try {
    const apiUrl = `https://nileapi.tronscan.org/api/account/resourcev2?limit=10&start=0&address=${walletAddress}&type=0`
    const response = await axios.get(apiUrl);
    return response.data
  } catch (error) {
    console.error('Error fetching resource data from staking:', error);
  }
}

