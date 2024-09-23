import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/RegistrationModal.module.css';
import { useWallet } from '@solana/wallet-adapter-react';

const RegistrationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { publicKey } = useWallet();
  const [username, setUsername] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPP, setAcceptedPP] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms || !acceptedPP) {
      alert('You must accept the terms of use and privacy policy.');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        username,
        wallet: publicKey?.toString() || '',
      });
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.inputText}
            />
          </label>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
              className={styles.inputCheckbox}
            />
            I accept the terms of use
          </label>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={acceptedPP}
              onChange={(e) => setAcceptedPP(e.target.checked)}
              required
              className={styles.inputCheckbox}
            />
            I accept the privacy policy
          </label>
          <button type="submit" className={styles.button}>Register</button>
        </form>
        <button onClick={onClose} className={styles.button} style={{ marginTop: '10px', background: '#551010' }}>Close</button>
      </div>
    </div>
  );
};

export default RegistrationModal;