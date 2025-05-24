import React from 'react';
import { Brain } from 'lucide-react';

interface SolveWithAIButtonProps {
  disabled: boolean;
}

const SolveWithAIButton: React.FC<SolveWithAIButtonProps> = ({ disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2
        py-2 px-4 rounded-full font-medium text-white
        bg-gradient-to-r from-indigo-600 to-purple-600
        shadow-lg shadow-indigo-200 dark:shadow-none
        transition-all duration-300 
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-300 dark:hover:shadow-none'}
      `}
    >
      <Brain className="w-5 h-5" />
      <span>Solve with AI</span>
    </button>
  );
};

export default SolveWithAIButton;