import React, { useState, useRef, useEffect } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import styles from '../styles/Game.module.css';
import { Token } from '../pages/api/interface/game';
import { useWallet } from '@solana/wallet-adapter-react';

const Game: React.FC = () => {
  const { connected } = useWallet();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);
  const nodeRef = useRef(null);

  const fetchToken = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/randomToken');
      const data = await response.json();
      setToken({
        name: data.name,
        symbol: data.symbol,
        logoURI: data.logoURI,
        address: data.address,
      });
    } catch (error) {
      console.error('Error fetching token:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackToken = async (token: Token, action: 'like' | 'dislike') => {
    try {
      await fetch('/api/trackToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: token.address, action, symbol: token.symbol, logoURI: token.logoURI }),
      });
    } catch (error) {
      console.error('Error tracking token:', error);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

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
      <Draggable nodeRef={nodeRef} position={position} onStop={(e, data) => handleStop(data)} disabled={!connected}>
        <div ref={nodeRef} className={styles.draggableSquare}>
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            token && (
              <>
                <img src={token.logoURI} alt={token.name} className={styles.tokenImage} />
                <p className={styles.tokenDescription}>Name: <span className={styles.tokenName}>{token.name}</span></p>
                <p className={styles.tokenDescription}>Ticker: <span className={styles.tokenSymbol}>{token.symbol}</span></p>
              </>
            )
          )}
          {!connected && (
            <div className={styles.connectWalletPrompt}>
              Please connect your wallet to play.
            </div>
          )}
        </div>
      </Draggable>
    </div>
  );
};

export default Game;