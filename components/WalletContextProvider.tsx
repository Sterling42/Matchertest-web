import { FC, ReactNode, useEffect, useState } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import axios from 'axios';
import RegistrationModal from './RegistrationModal'; // Import the modal component

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = 'https://mainnet.helius-rpc.com/?api-key=87f73015-922d-4549-8eea-3253f7635385';
  const wallets = [new PhantomWalletAdapter()];
  const { publicKey } = useWallet();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if (publicKey) {
        try {
          const response = await axios.get(`/api/checkProfile?wallet=${publicKey.toString()}`);
          if (!response.data.exists) {
            setShowModal(true);
          }
        } catch (error) {
          console.error('Error checking profile:', error);
        }
      }
    };

    checkProfile();
  }, [publicKey]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
          {showModal && <RegistrationModal onClose={() => setShowModal(false)} />}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;