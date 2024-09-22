import { FC } from 'react';
import styles from '../styles/AppHeader.module.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import Link from 'next/link';

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <div className={styles.TopSection}>
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
                    <Link href="https://matcher.gitbook.io/matcher-docs">
                        <button className={styles.NavButton}>📖 Docs</button>
                    </Link>
                    <Link href="/profile">
                        <button className={styles.NavButton}>⚙️ Profile</button>
                    </Link>
                </div>
                <div className={styles.RightSection}>
                    <WalletMultiButton className={styles.WalletButton} />
                </div>
            </div>
            <div className={styles.BottomSection}>
                <Link href="/">
                    <button className={styles.NavButton}>🔥 Matcher</button>
                </Link>
                <Link href="/stats">
                    <button className={styles.NavButton}>📊 Stats</button>
                </Link>
                <Link href="https://matcher.gitbook.io/matcher-docs">
                    <button className={styles.NavButton}>📖 Docs</button>
                </Link>
                <Link href="/profile">
                    <button className={styles.NavButton}>⚙️ Profile</button>
                </Link>
            </div>
        </div>
    );
};