// components/StatusBar.tsx
import React, { useState } from 'react';
import statusBarStyles from '../styles/StatusBar.module.css';
import SettingsModal from './SettingsModal';

interface StatusBarProps {
  swipes: number;
  cooldown: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ swipes, cooldown }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className={statusBarStyles.statusBar}>
      <div className={statusBarStyles.centerContent}>
        <div className={statusBarStyles.textContainer}>
          <span>Swipes: {swipes} {cooldown}</span>
        </div>
        <button className={statusBarStyles.button}>📥Matches</button>
        <button className={statusBarStyles.button} onClick={handleSettingsClick}>⚙️Settings</button>
      </div>
      <SettingsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </nav>
  );
};

export default StatusBar;