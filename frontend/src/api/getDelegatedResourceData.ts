import axios from 'axios';

export async function getDelegatedResourceData(walletAddress) {
  try {
    const apiUrl = `https://nileapi.tronscan.org/api/account/resourcev2?limit=10&start=0&address=${walletAddress}&type=1`
    const response = await axios.get(apiUrl);
    console.log("getDelegatedResourceData", response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching delegated resource data:', error);
  }
}

