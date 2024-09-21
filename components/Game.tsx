import React, { useState, useRef, useEffect } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import styles from '../styles/Game.module.css';

const Game: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [token, setToken] = useState<{ name: string; symbol: string; logoURI: string } | null>(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/randomToken');
        const data = await response.json();
        setToken({ name: data.name, symbol: data.symbol, logoURI: data.logoURI });
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  const handleStop = (data: DraggableData) => {
    const gameFrame = document.querySelector(`.${styles.gameFrame}`);
    if (gameFrame) {
      const { left, top, right, bottom } = gameFrame.getBoundingClientRect();
      const square = nodeRef.current.getBoundingClientRect();

      if (
        square.left < left ||
        square.top < top ||
        square.right > right ||
        square.bottom > bottom
      ) {
        setPosition({ x: 0, y: 0 });
      } else {
        setPosition({ x: data.x, y: data.y });
      }
    }
  };

  return (
    <div className={styles.gameFrame}>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <Draggable nodeRef={nodeRef} position={position} onStop={(e, data) => handleStop(data)}>
        <div ref={nodeRef} className={styles.draggableSquare}>
          {token ? (
            <>
              <img src={token.logoURI} alt={token.name} className={styles.tokenImage} />
              <p>{token.name}</p>
              <p>{token.symbol}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Draggable>
    </div>
  );
};

export default Game;