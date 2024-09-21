import { FC } from 'react';
import styles from '../styles/AppHeader.module.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <div className={styles.LeftSection}>
                <Image src="/solanaLogo.png" height={50} width={50} />
                <span className={styles.Title}>Matcher on Solana</span>
            </div>
            <div className={styles.RightSection}>
                <button className={styles.NavButton}>Matcher</button>
                <button className={styles.NavButton}>Profile</button>
                <button className={styles.NavButton}>Docs</button>
                <WalletMultiButton className={styles.WalletButton} />
            </div>
        </div>
    );
};