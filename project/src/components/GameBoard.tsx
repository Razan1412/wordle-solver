import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import { TileData } from '../types/game';

interface GameBoardProps {
  guesses: TileData[][];
  currentGuess: number;
  currentInput: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  guesses, 
  currentGuess,
  currentInput 
}) => {
  const [revealingRow, setRevealingRow] = useState<number | null>(null);

  // Trigger reveal animation when a new guess is submitted
  useEffect(() => {
    if (currentGuess > 0) {
      setRevealingRow(currentGuess - 1);
      const timer = setTimeout(() => {
        setRevealingRow(null);
      }, 1600); // Slightly longer than the last tile's reveal
      return () => clearTimeout(timer);
    }
  }, [currentGuess]);

  // Create current row with input
  const getCurrentRow = () => {
    const inputArray = currentInput.split('');
    return Array(5).fill(null).map((_, i) => ({
      letter: inputArray[i] || '',
      state: 'empty'
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1 mb-4">
      {guesses.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {/* If this is the current row and we haven't submitted yet, show current input */}
          {rowIndex === currentGuess ? (
            getCurrentRow().map((tile, i) => (
              <Tile
                key={`current-${i}`}
                letter={tile.letter}
                state={tile.state}
                position={i}
                isRevealing={false}
              />
            ))
          ) : (
            // Otherwise show the submitted guesses or empty tiles
            row.map((tile, i) => (
              <Tile
                key={`${rowIndex}-${i}`}
                letter={tile.letter}
                state={tile.state}
                position={i}
                isRevealing={revealingRow === rowIndex}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;