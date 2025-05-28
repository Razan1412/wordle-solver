import React from 'react';
import { LetterState } from '../types/game';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyboardState: Record<string, LetterState>;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, keyboardState }) => {
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '←']
  ];

  // Get the appropriate class for a key based on its state
  const getKeyClass = (key: string) => {
    const normalizedKey = key.toLowerCase();
    if (normalizedKey === 'enter' || normalizedKey === '←') 
      return 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500';
    
    const state = keyboardState[normalizedKey];
    switch (state) {
      case 'correct':
        return 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600';
      case 'present':
        return 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600';
      case 'absent':
        return 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700';
      default:
        return 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500';
    }
  };

  return (
    <div className="keyboard w-full max-w-xl mx-auto mb-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`
                flex items-center justify-center 
                ${key === 'Enter' ? 'w-16 text-xs' : key === '←' ? 'w-10' : 'w-8 sm:w-10'} 
                h-14
                font-bold rounded uppercase 
                transition-all duration-200
                ${getKeyClass(key)}
              `}
            >
              {key === '←' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;