// components/DraggableSquare.tsx
import React from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import styles from '../styles/Game.module.css';
import { Token } from '../pages/api/interface/game';

interface DraggableSquareProps {
  token: Token | null;
  loading: boolean;
  position: { x: number; y: number };
  onStop: (data: DraggableData) => void;
  connected: boolean;
  nodeRef: React.RefObject<HTMLDivElement>;
}

const DraggableSquare: React.FC<DraggableSquareProps> = ({ token, loading, position, onStop, connected, nodeRef }) => {
  const handleChartButtonClick = () => {
    if (token) {
      const url = `https://dexscreener.com/solana/${token.address}`;
      window.open(url, '_blank');
    }
  };

  return (
    <Draggable nodeRef={nodeRef} position={position} onStop={(e, data) => onStop(data)} disabled={!connected}>
      <div ref={nodeRef} className={styles.draggableSquare}>
        {loading ? (
          <div className={styles.spinner}></div>
        ) : (
          token && (
            <>
              <img src={token.logoURI} alt={token.name} className={styles.tokenImage} />
              <p className={styles.tokenDescription}>Name: <span className={styles.tokenName}>{token.name}</span></p>
              <p className={styles.tokenDescription}>Ticker: <span className={styles.tokenSymbol}>{token.symbol}</span></p>
              <button className={styles.chartButton} onClick={handleChartButtonClick}>Chart</button>
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
  );
};

export default DraggableSquare;