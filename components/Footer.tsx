// components/Footer.tsx
import React from 'react';
import styles from '../styles/Footer.module.css';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftSection}>
        <p>© 2024 LonleyApeHQ. All rights reserved.</p>
        <a href="/privacy-policy" className={styles.link}>Privacy Policy</a>
        <a href="/terms-of-use" className={styles.link}>Terms of Use</a>
      </div>
      <div className={styles.rightSection}>
        <a href="https://t.me/yourcompany" className={styles.iconButton} aria-label="Telegram">
          <FaTelegramPlane />
        </a>
        <a href="https://x.com/ApeMatcher" className={styles.iconButton} aria-label="Twitter">
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;