// components/SettingsModal.tsx
import React from 'react';
import modalStyles from '../styles/Modal.module.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const switchNames = [
    'Birdeye Trending',
    'Top 100 Tokens',
    'Top 100 Dapps',
    'Solana Influencers',
    'Community Picks',
  ];

  return (
    <div className={modalStyles.modalOverlay}>
      <div className={modalStyles.modalContent}>
        <h2>Settings</h2>
        <div className={modalStyles.switchContainer}>
          {switchNames.map((name, index) => (
            <div key={index} className={modalStyles.switchRow}>
              <span className={modalStyles.switchLabel}>{name}</span>
              <label className={modalStyles.switch}>
                <input type="checkbox" />
                <span className={modalStyles.slider}></span>
              </label>
            </div>
          ))}
        </div>
        <div className={modalStyles.buttonContainer}>
          <button onClick={onClose} className={modalStyles.closeButton}>Close</button>
          <button className={modalStyles.confirmButton}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;