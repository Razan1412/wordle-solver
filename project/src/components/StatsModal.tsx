import React from 'react';
import { GameStats } from '../types/game';

interface StatsModalProps {
  stats: GameStats;
  isOpen: boolean;
  onClose: () => void;
  onNewGame: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ stats, isOpen, onClose, onNewGame }) => {
  if (!isOpen) return null;
  
  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;
  
  // Find the max value in guess distribution to scale bars
  const maxDistribution = Math.max(...Object.values(stats.guessDistribution), 1);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Statistics</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-6 text-center">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{stats.gamesPlayed}</span>
            <span className="text-xs">Played</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{winPercentage}</span>
            <span className="text-xs">Win %</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{stats.currentStreak}</span>
            <span className="text-xs">Current Streak</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{stats.maxStreak}</span>
            <span className="text-xs">Max Streak</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Guess Distribution</h3>
        <div className="space-y-2 mb-6">
          {Object.entries(stats.guessDistribution).map(([guess, count]) => (
            <div key={guess} className="flex items-center">
              <div className="w-4 text-right mr-2">{guess}</div>
              <div 
                className="h-6 bg-purple-600 text-white flex items-center justify-end px-2 text-sm font-medium rounded"
                style={{ 
                  width: `${Math.max((count / maxDistribution) * 100, 4)}%`,
                  minWidth: count > 0 ? '2rem' : '0' 
                }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => {
            onNewGame();
            onClose();
          }}
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default StatsModal;