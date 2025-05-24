import React from 'react';

interface GameMessageProps {
  message: string | null;
  type: 'error' | 'success' | 'info';
}

const GameMessage: React.FC<GameMessageProps> = ({ message, type }) => {
  if (!message) return null;
  
  const getTypeClasses = () => {
    switch (type) {
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };
  
  return (
    <div className={`border px-4 py-2 rounded text-center mb-4 animate-fade-in ${getTypeClasses()}`}>
      {message}
    </div>
  );
};

export default GameMessage;