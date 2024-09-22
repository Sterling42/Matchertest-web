import { FC } from 'react';
import styles from '../styles/AppHeader.module.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import Link from 'next/link';

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <div className={styles.LeftSection}>
                <Image src="/solanaLogo.png" height={50} width={50} alt={''} />
                <span className={styles.Title}>Matcher</span>
            </div>
            <div className={styles.MiddleSection}>
                <Link href="/">
                    <button className={styles.NavButton}>🔥 Matcher</button>
                </Link>
                <Link href="/stats">
                    <button className={styles.NavButton}>📊 Stats</button>
                </Link>
                <button className={styles.NavButton}>📖 Docs</button>
                <button className={styles.NavButton}>❓ Faq</button>
            </div>
            <div className={styles.RightSection}>
                <Link href="/profile">
                    <button className={styles.NavButton}>⚙️ Profile</button>
                </Link>
                <WalletMultiButton className={styles.WalletButton} />
            </div>
        </div>
    );
};