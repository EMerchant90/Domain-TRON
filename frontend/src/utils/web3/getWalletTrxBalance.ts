import { useEffect, useState } from 'react';
import { useTronWalletAddress } from 'state/user/hooks'; // Replace with the actual path

export const getWalletTrxBalance = () => {
  const [balance, setBalance] = useState(null);
  const walletAddress = useTronWalletAddress();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (window.tronWeb && window.tronWeb.ready) {
          const result = await window.tronWeb.trx.getBalance(walletAddress);
          const trxBalance = result / 1_000_000;
          setBalance(trxBalance);
        }
      } catch (error) {
        console.error('Error fetching TRX balance:', error);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return balance;
};
