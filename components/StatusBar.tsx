// components/StatusBar.tsx
import React from 'react';
import statusBarStyles from '../styles/StatusBar.module.css';

interface StatusBarProps {
  swipes: number;
  cooldown: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ swipes, cooldown }) => {
  return (
    <nav className={statusBarStyles.statusBar}>
      <div className={statusBarStyles.centerContent}>
        <div className={statusBarStyles.textContainer}>
          <span>Swipes: {swipes} {cooldown}</span>
        </div>
        <button className={statusBarStyles.button}>📥Matches</button>
        <button className={statusBarStyles.button}>⚙️Settings</button>
      </div>
    </nav>
  );
};

export default StatusBar;