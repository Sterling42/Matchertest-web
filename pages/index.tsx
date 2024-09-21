// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import WalletContextProvider from '../components/WalletContextProvider';
import { AppBar } from '../components/AppBar';
import Footer from '../components/Footer';
import Game from '../components/Game';

const Home: React.FC = () => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Matcher</title>
        <meta name="description" content="Wallet-Adapter" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <main className={styles.main}>
          <Game />
        </main>
        <Footer />
      </WalletContextProvider>
    </div>
  );
};

export default Home;