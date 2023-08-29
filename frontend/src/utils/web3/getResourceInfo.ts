import axios from 'axios';

export async function getUserResourceInfo(walletAddress) {
    try {
      const res = await axios.get(`https://nileapi.tronscan.org/api/accountv2?address=${walletAddress}`)
      return res.data;
    } catch (error) {
      console.error('Error fetching user transactions:', error);
    }
  }