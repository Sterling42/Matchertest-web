import { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import WalletContextProvider from '../components/WalletContextProvider';
import { AppBar } from '../components/AppBar';
import Head from 'next/head';
import Footer from '../components/Footer'; // Import Footer component

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Matcher</title>
        <meta name="description" content="Wallet-Adapter" />
        <link rel="icon" href="/sol.ico" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}></div>
        <Footer /> {/* Add Footer component */}
      </WalletContextProvider>
    </div>
  );
};

export default Home;