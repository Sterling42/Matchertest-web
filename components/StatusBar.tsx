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
        <span>Swipes: {swipes} / {cooldown}</span>
        <button className={statusBarStyles.button}>📥</button>
        <button className={statusBarStyles.button}>⚙️</button>
      </div>
    </nav>
  );
};

export default StatusBar;