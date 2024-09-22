import React, { useEffect, useState } from 'react';
import { AppBar } from '../components/AppBar';
import Footer from '../components/Footer';
import styles from '../styles/Stats.module.css';

interface TokenStats {
  _id: string;
  address: string;
  likes: number;
  dislikes: number;
  logoURI: string;
  symbol: string;
}

const Stats: React.FC = () => {
  const [tokenStats, setTokenStats] = useState<TokenStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenStats = async () => {
      try {
        const response = await fetch('/api/getTokenStats');
        const data = await response.json();
        setTokenStats(data);
      } catch (error) {
        console.error('Error fetching token stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenStats();
  }, []);

  return (
    <div>
      <AppBar />
      <div className={styles.statsContainer}>
        <h1>Token Statistics</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.tokenGrid}>
            {tokenStats.map((token) => (
              <div key={token._id} className={styles.tokenCard}>
                <img src={token.logoURI} alt={token.symbol} className={styles.tokenImage} />
                <p className={styles.tokenSymbol}>{token.symbol}</p>
                <div className={styles.ratioBar}>
                  <div
                    className={styles.likesBar}
                    style={{ width: `${(token.likes / (token.likes + token.dislikes || 1)) * 100}%` }}
                  ></div>
                  <div
                    className={styles.dislikesBar}
                    style={{ width: `${(token.dislikes / (token.likes + token.dislikes || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Stats;