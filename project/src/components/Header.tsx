import React from 'react';
import { Brain } from 'lucide-react';

interface HeaderProps {
  onNewGame: () => void;
  onShowStats: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewGame, onShowStats }) => {
  return (
    <header className="w-full py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Brain className="w-8 h-8 text-purple-600 mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            AI Wordle
          </h1>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onShowStats}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Show statistics"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2">
              <line x1="18" x2="18" y1="20" y2="10"></line>
              <line x1="12" x2="12" y1="20" y2="4"></line>
              <line x1="6" x2="6" y1="20" y2="14"></line>
            </svg>
          </button>
          
          <button 
            onClick={onNewGame}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="New game"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M3 21v-5h5"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;