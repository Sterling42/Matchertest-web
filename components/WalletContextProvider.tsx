import { FC, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  GlowWalletAdapter,
} from '@solana/wallet-adapter-wallets';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Use the provided RPC endpoint directly
  const endpoint = 'https://mainnet.helius-rpc.com/?api-key=87f73015-922d-4549-8eea-3253f7635385';
  const wallets = [
    new PhantomWalletAdapter(),
    new GlowWalletAdapter(),
  ];

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