import React from 'react';
import styles from '../styles/Profile.module.css';
import Tokens from './Tokens';

const Profile: React.FC = () => {
  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileHeader}>Profile Page</div>
      <div className={styles.ProfileContainer}>
        <div className={styles.ProfileInfo}>
          <div
            className={styles.ProfilePicture}
            style={{ backgroundImage: 'url(/path/to/profile-picture.jpg)' }}
          ></div>
          <div className={styles.LevelXPBar}>
            <div className={styles.Level}>Level: 10</div>
            <div className={styles.XPBar}>
              <div className={styles.XPBarFill} style={{ width: '70%' }}></div>
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