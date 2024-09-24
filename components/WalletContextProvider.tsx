// components/WalletContextProvider.tsx
import { FC, ReactNode, useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = 'https://mainnet.helius-rpc.com/?api-key=87f73015-922d-4549-8eea-3253f7635385';
  const wallets = [new PhantomWalletAdapter()];

  const { connected, publicKey } = useWallet();

  useEffect(() => {
    const checkAndCreateUser = async () => {
      if (connected && publicKey) {
        try {
          const response = await fetch(`/api/checkUser?wallet=${publicKey.toString()}`);
          const data = await response.json();
          if (!data.exists) {
            await fetch('/api/createUser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ wallet: publicKey.toString() }),
            });
          }
        } catch (error) {
          console.error('Error checking or creating user:', error);
        }
      }
    };

    checkAndCreateUser();
  }, [connected, publicKey]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;