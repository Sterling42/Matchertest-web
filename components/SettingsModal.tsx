// components/SettingsModal.tsx
import React, { useState, useEffect } from 'react';
import modalStyles from '../styles/Modal.module.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const switchNames = [
    'Birdeye Trending',
    'Top 100 Tokens',
    'Top 100 Dapps',
    'Solana Influencers',
    'Community Picks',
  ];

  const [switchStates, setSwitchStates] = useState<boolean[]>([]);
  const [tempSwitchStates, setTempSwitchStates] = useState<boolean[]>([]);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '[]');
    if (savedSettings.length === 0) {
      // Default settings: Birdeye Trending is on
      const defaultSettings = [true, false, false, false, false];
      setSwitchStates(defaultSettings);
      setTempSwitchStates(defaultSettings);
    } else {
      setSwitchStates(savedSettings);
      setTempSwitchStates(savedSettings);
    }
  }, [isOpen]);

  const handleToggle = (index: number) => {
    const newSwitchStates = [...tempSwitchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setTempSwitchStates(newSwitchStates);
  };

  const handleConfirm = () => {
    setSwitchStates(tempSwitchStates);
    localStorage.setItem('settings', JSON.stringify(tempSwitchStates));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={modalStyles.modalOverlay}>
      <div className={modalStyles.modalContent}>
        <h2>Settings</h2>
        <div className={modalStyles.switchContainer}>
          {switchNames.map((name, index) => (
            <div key={index} className={modalStyles.switchRow}>
              <span className={modalStyles.switchLabel}>{name}</span>
              <label className={modalStyles.switch}>
                <input
                  type="checkbox"
                  checked={tempSwitchStates[index]}
                  onChange={() => handleToggle(index)}
                />
                <span className={modalStyles.slider}></span>
              </label>
            </div>
          ))}
        </div>
        <div className={modalStyles.buttonContainer}>
          <button onClick={onClose} className={modalStyles.closeButton}>Close</button>
          <button onClick={handleConfirm} className={modalStyles.confirmButton}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;