import React, { useState, useRef } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import styles from '../styles/Game.module.css';

const Game: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

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
        <div ref={nodeRef} className={styles.draggableSquare}></div>
      </Draggable>
    </div>
  );
};

export default Game;