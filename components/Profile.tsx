import React from 'react';
import styles from '../styles/Profile.module.css';

const Profile: React.FC = () => {
  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileHeader}>Profile Page</div>
      <div className={styles.ProfileDetails}>
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
      </div>
    </div>
  );
};

export default Profile;