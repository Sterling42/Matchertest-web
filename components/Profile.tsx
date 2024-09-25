import React, { useEffect, useState } from 'react';
import styles from '../styles/Profile.module.css';
import Tokens from './Tokens';
import { useWallet } from '@solana/wallet-adapter-react';

const calculateLevel = (xp: number, increaseRate: number) => {
  let level = 1;
  let requiredXp = 100;
  while (xp >= requiredXp) {
    xp -= requiredXp;
    level++;
    requiredXp *= 1 + increaseRate;
  }
  return { level, progress: (xp / requiredXp) * 100 };
};

const Profile: React.FC = () => {
  const { publicKey } = useWallet();
  const [userData, setUserData] = useState<{ xp: number; rxp: number } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (publicKey) {
        try {
          const response = await fetch(`/api/getUserData?wallet=${publicKey.toString()}`);
          const data = await response.json();
          setUserData({ xp: data.xp, rxp: data.rxp });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [publicKey]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { level: xpLevel, progress: xpProgress } = calculateLevel(userData.xp, 0.02);
  const { level: rxpLevel, progress: rxpProgress } = calculateLevel(userData.rxp, 0.10);

  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileHeader}>Your Matcher Profile</div>
      <div className={styles.ProfileContainer}>
        <div className={styles.ProfileInfo}>
          <div
            className={styles.ProfilePicture}
            style={{ backgroundImage: 'url(/path/to/profile-picture.jpg)' }}
          ></div>
          <div className={styles.LevelXPBar}>
            <div className={styles.Level}>Matcher Level: {xpLevel}</div>
            <div className={styles.XPBar}>
              <div className={styles.XPBarFill} style={{ width: `${xpProgress}%` }}></div>
            </div>
          </div>
          <div className={styles.LevelXPBar}>
            <div className={styles.Level}>Rewards Level: {rxpLevel}</div>
            <div className={styles.XPBar}>
              <div className={styles.XPBarFill} style={{ width: `${rxpProgress}%`, backgroundColor: '#ff9800' }}></div>
            </div>
          </div>
        </div>
        <div className={styles.TokenList}>
          <Tokens />
        </div>
      </div>
    </div>
  );
};

export default Profile;