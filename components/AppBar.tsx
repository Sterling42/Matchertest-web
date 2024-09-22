import { FC } from 'react';
import styles from '../styles/AppHeader.module.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const AppBar: FC = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <div className={styles.AppHeader}>
            <div className={styles.TopSection}>
                <div className={styles.LeftSection}>
                    <Image src="/solanaLogo.png" height={50} width={50} alt={''} />
                    <span className={styles.Title}>Matcher</span>
                </div>
                <div className={styles.MiddleSection}>
                    <button
                        className={`${styles.NavButton} ${router.pathname === '/' ? styles.active : ''}`}
                        onClick={() => navigateTo('/')}
                    >
                        🔥 Matcher
                    </button>
                    <button
                        className={`${styles.NavButton} ${router.pathname === '/stats' ? styles.active : ''}`}
                        onClick={() => navigateTo('/stats')}
                    >
                        📊 Stats
                    </button>
                    <button
                        className={`${styles.NavButton} ${router.pathname === '/profile' ? styles.active : ''}`}
                        onClick={() => navigateTo('/profile')}
                    >
                        ⚙️ Profile
                    </button>
                    <button
                        className={styles.NavButton}
                        onClick={() => window.location.href = 'https://matcher.gitbook.io/matcher-docs'}
                    >
                        📖 Docs
                    </button>
                </div>
                <div className={styles.RightSection}>
                    <WalletMultiButton className={styles.WalletButton} />
                </div>
            </div>
            <div className={styles.BottomSection}>
                <button
                    className={`${styles.NavButton} ${router.pathname === '/' ? styles.active : ''}`}
                    onClick={() => navigateTo('/')}
                >
                    🔥 Matcher
                </button>
                <button
                    className={`${styles.NavButton} ${router.pathname === '/stats' ? styles.active : ''}`}
                    onClick={() => navigateTo('/stats')}
                >
                    📊 Stats
                </button>
                <button
                    className={`${styles.NavButton} ${router.pathname === '/profile' ? styles.active : ''}`}
                    onClick={() => navigateTo('/profile')}
                >
                    ⚙️ Profile
                </button>
                <button
                    className={styles.NavButton}
                    onClick={() => window.location.href = 'https://matcher.gitbook.io/matcher-docs'}
                >
                    📖 Docs
                </button>
            </div>
        </div>
    );
};