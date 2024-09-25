import React, { useState, useRef } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import styles from '../styles/Game.module.css';
import { Token } from '../pages/api/interface/game'; // Adjust the path if necessary
import { useWallet } from '@solana/wallet-adapter-react';
import useFetchToken from '../hooks/useFetchToken';
import DraggableSquare from './DraggableSquare';

const Game: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);
  const { token, loading, fetchToken } = useFetchToken();

  const trackToken = async (token: Token, action: 'like' | 'dislike') => {
    try {
      await fetch('/api/trackToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: token.address, action, symbol: token.symbol, logoURI: token.logoURI }),
      });

      // Update user stats
      if (publicKey) {
        await fetch('/api/updateUserStats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress: publicKey.toString(),
            swipes: 1,
            xp: 10,
            rxp: 1,
            tokenAddress: token.address,
            action,
          }),
        });
      }
    } catch (error) {
      console.error('Error tracking token:', error);
    }
  };

  const handleStop = (data: DraggableData) => {
    const gameFrame = document.querySelector(`.${styles.gameFrame}`);
    if (gameFrame) {
      const { left, right } = gameFrame.getBoundingClientRect();
      const square = nodeRef.current.getBoundingClientRect();

      if (square.right < left) {
        console.log('Disliked');
        if (token) trackToken(token, 'dislike');
        fetchToken();
      } else if (square.left > right) {
        console.log('Liked');
        if (token) trackToken(token, 'like');
        fetchToken();
      }

      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div className={styles.gameFrame}>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <DraggableSquare
        token={token}
        loading={loading}
        position={position}
        onStop={handleStop}
        connected={connected}
        nodeRef={nodeRef}
      />
    </div>
  );
};

export default Game;