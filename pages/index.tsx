// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import homeStyles from '../styles/Home.module.css';
import WalletContextProvider from '../components/WalletContextProvider';
import { AppBar } from '../components/AppBar';
import Game from '../components/Game';
import StatusBar from '../components/StatusBar';
import { useWallet } from '@solana/wallet-adapter-react';

const Home: React.FC = () => {
  const { publicKey } = useWallet();
  const [swipes, setSwipes] = useState<number>(0);
  const [cooldown, setCooldown] = useState<string>('5m');

  useEffect(() => {
    const fetchUserData = async () => {
      if (publicKey) {
        try {
          const response = await fetch(`/api/getUserData?wallet=${publicKey.toString()}`);
          const data = await response.json();
          setSwipes(data.swipes);
          setCooldown(data.cooldown); // Assuming cooldown is part of the user data
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [publicKey]);

  return (
    <div className={`${homeStyles.App} ${homeStyles.unscrollable} ${homeStyles.customBackground}`}>
      <Head>
        <title>Matcher</title>
        <meta name="description" content="Wallet-Adapter" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <StatusBar swipes={swipes} cooldown={cooldown} />
        <main className={homeStyles.main}>
          <Game onSwipe={() => setSwipes((prev) => prev - 1)} swipes={swipes} /> {/* Pass swipes prop */}
        </main>
      </WalletContextProvider>
    </div>
  );
};

export default Home;