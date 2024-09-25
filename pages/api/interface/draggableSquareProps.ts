
// interface/DraggableSquareProps.ts
import { DraggableData } from 'react-draggable';
import { Token } from './game';

export interface DraggableSquareProps {
  token: Token | null;
  loading: boolean;
  position: { x: number; y: number };
  onStop: (data: DraggableData) => void;
  connected: boolean;
  nodeRef: React.RefObject<HTMLDivElement>;
}