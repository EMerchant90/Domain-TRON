import axios from 'axios';

export async function getDelegatedToResourceData(walletAddress) {
  try {
    const apiUrl = `https://nileapi.tronscan.org/api/account/resourcev2?limit=10&start=0&address=${walletAddress}&type=2`
    const response = await axios.get(apiUrl);
    console.log("getDelegatedToResourceData", response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching delegated to resource data:', error);
  }
}

