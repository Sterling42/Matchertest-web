import React from 'react';
import { AppBar } from '../components/AppBar';
import Profile from '../components/Profile';
import styles from '../styles/Home.module.css';

const ProfilePage: React.FC = () => {
  return (
    <div className={styles.App}>
      <AppBar />
      <div className={styles.AppBody}>
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;