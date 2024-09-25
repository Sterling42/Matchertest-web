import React, { useEffect, useState } from 'react';
import { AppBar } from '../components/AppBar';
import styles from '../styles/Stats.module.css';
import homeStyles from '../styles/Home.module.css';

interface TokenStats {
  _id: string;
  address: string;
  likes?: number;
  dislikes?: number;
  logoURI: string;
  symbol: string;
}

const Stats: React.FC = () => {
  const [tokenStats, setTokenStats] = useState<TokenStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMoreLikes, setShowMoreLikes] = useState(false);
  const [showMoreDislikes, setShowMoreDislikes] = useState(false);

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

  const sortedByLikes = [...tokenStats].sort((a, b) => {
    const aLikes = a.likes || 0;
    const aDislikes = Math.abs(a.dislikes || 0);
    const bLikes = b.likes || 0;
    const bDislikes = Math.abs(b.dislikes || 0);
    return (bLikes / (bLikes + bDislikes || 1)) - (aLikes / (aLikes + aDislikes || 1));
  });

  const sortedByDislikes = [...tokenStats].sort((a, b) => {
    const aLikes = a.likes || 0;
    const aDislikes = Math.abs(a.dislikes || 0);
    const bLikes = b.likes || 0;
    const bDislikes = Math.abs(b.dislikes || 0);
    return (bDislikes / (bLikes + bDislikes || 1)) - (aDislikes / (aLikes + aDislikes || 1));
  });

  const topLikes = showMoreLikes ? sortedByLikes.slice(0, 30) : sortedByLikes.slice(0, 10);
  const topDislikes = showMoreDislikes ? sortedByDislikes.slice(0, 30) : sortedByDislikes.slice(0, 10);

  return (
    <div className={homeStyles.App}>
      <AppBar />
      <div className={styles.statsContainer}>
        <h1>Matcher Statistics Hub</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h2>Highest Like Ratio Tokens</h2>
            <div className={styles.tokenGrid}>
              {topLikes.map((token) => {
                const likes = token.likes || 0;
                const dislikes = Math.abs(token.dislikes || 0);
                return (
                  <div key={token._id} className={styles.tokenCard}>
                    <img src={token.logoURI} alt={token.symbol} className={styles.tokenImage} />
                    <p className={styles.tokenSymbol}>{token.symbol}</p>
                    <div className={styles.ratioBar}>
                      <div
                        className={styles.likesBar}
                        style={{ width: `${(likes / (likes + dislikes || 1)) * 100}%` }}
                      ></div>
                      <div
                        className={styles.dislikesBar}
                        style={{ width: `${(dislikes / (likes + dislikes || 1)) * 100}%` }}
                      ></div>
                    </div>
                    <p>Total Votes: {likes + dislikes}</p>
                  </div>
                );
              })}
            </div>
            <button className={styles.loadMoreButton} onClick={() => setShowMoreLikes(!showMoreLikes)}>
              {showMoreLikes ? 'Show Less' : 'Load More'}
            </button>

            <h2>Highest Dislike Ratio Tokens</h2>
            <div className={styles.bottomContentWrapper}>
              <div className={styles.tokenGrid}>
                {topDislikes.map((token) => {
                  const likes = token.likes || 0;
                  const dislikes = Math.abs(token.dislikes || 0);
                  return (
                    <div key={token._id} className={styles.tokenCard}>
                      <img src={token.logoURI} alt={token.symbol} className={styles.tokenImage} />
                      <p className={styles.tokenSymbol}>{token.symbol}</p>
                      <div className={styles.ratioBar}>
                        <div
                          className={styles.likesBar}
                          style={{ width: `${(likes / (likes + dislikes || 1)) * 100}%` }}
                        ></div>
                        <div
                          className={styles.dislikesBar}
                          style={{ width: `${(dislikes / (likes + dislikes || 1)) * 100}%` }}
                        ></div>
                      </div>
                      <p>Total Votes: {likes + dislikes}</p>
                    </div>
                  );
                })}
              </div>
              <button className={styles.loadMoreButton} onClick={() => setShowMoreDislikes(!showMoreDislikes)}>
                {showMoreDislikes ? 'Show Less' : 'Load More'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Stats;