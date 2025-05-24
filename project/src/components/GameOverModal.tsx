import React from 'react';

interface GameOverModalProps {
  gameStatus: 'won' | 'lost';
  solution: string;
  attempts: number;
  onNewGame: () => void;
  onShowStats: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ 
  gameStatus, 
  solution, 
  attempts,
  onNewGame,
  onShowStats
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scale-in">
        <h2 className={`text-2xl font-bold mb-4 text-center ${
          gameStatus === 'won' ? 'text-emerald-500' : 'text-red-500'
        }`}>
          {gameStatus === 'won' ? 'You won!' : 'Game Over'}
        </h2>
        
        <div className="mb-6">
          <p className="text-center mb-2">
            {gameStatus === 'won' 
              ? `You guessed the word in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!` 
              : "Better luck next time!"}
          </p>
          <p className="text-center font-medium text-lg">
            The word was: <span className="uppercase font-bold">{solution}</span>
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onShowStats}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            View Stats
          </button>
          
          <button
            onClick={onNewGame}
            className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;