// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import homeStyles from '../styles/Home.module.css';
import WalletContextProvider from '../components/WalletContextProvider';
import { AppBar } from '../components/AppBar';
import Game from '../components/Game';
import StatusBar from '../components/StatusBar'; // Import StatusBar

const Home: React.FC = () => {
  return (
    <div className={`${homeStyles.App} ${homeStyles.unscrollable} ${homeStyles.customBackground}`}>
      <Head>
        <title>Matcher</title>
        <meta name="description" content="Wallet-Adapter" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <StatusBar swipes={10} cooldown="5m" /> {/* Add StatusBar */}
        <main className={homeStyles.main}>
          <Game />
        </main>
      </WalletContextProvider>
    </div>
  );
};

export default Home;