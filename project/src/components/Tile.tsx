import React, { useEffect, useState } from 'react';
import { LetterState } from '../types/game';

interface TileProps {
  letter: string;
  state: LetterState;
  position: number;
  isRevealing: boolean;
}

const Tile: React.FC<TileProps> = ({ letter, state, position, isRevealing }) => {
  const [animate, setAnimate] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Handle new letter animation
  useEffect(() => {
    if (letter && !revealed) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [letter, revealed]);

  // Handle revealing animation with delay based on position
  useEffect(() => {
    if (isRevealing && !revealed) {
      const timer = setTimeout(() => {
        setRevealed(true);
      }, position * 300);
      return () => clearTimeout(timer);
    }
    
    // if (!isRevealing) {
    //   setRevealed(false);
    // }
  }, [isRevealing, position]);

  // Determine tile classes based on state
  const getStateClass = () => {
    if (!revealed) return 'border-gray-300 dark:border-gray-600';
    
    switch (state) {
      case 'correct':
        return 'bg-emerald-500 border-emerald-500 text-white';
      case 'present':
        return 'bg-amber-500 border-amber-500 text-white';
      case 'absent':
        return 'bg-gray-600 border-gray-600 text-white';
      default:
        return 'border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div 
      className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 border-2 m-0.5 text-3xl font-bold uppercase
        ${getStateClass()}
        ${animate ? 'scale-110' : 'scale-100'}
        ${revealed ? 'flip-reveal' : ''}
        transition-all duration-300 select-none`}
    >
      {letter}
    </div>
  );
};

export default Tile;