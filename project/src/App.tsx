import React, { useEffect } from 'react';
import { useWordle } from './hooks/useWordle';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import GameMessage from './components/GameMessage';
import StatsModal from './components/StatsModal';
import GameOverModal from './components/GameOverModal';
import SolveWithAIButton from './components/SolveWithAIButton';

function App() {
  const {
    gameState,
    currentInput,
    error,
    stats,
    showStats,
    handleKeyPress,
    newGame,
    setShowStats
  } = useWordle();

  // Listen for keyboard events
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowStats(false);
        return;
      }
      
      handleKeyPress(e.key);
    };
    
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handleKeyPress, setShowStats]);

  if (!gameState) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Header 
        onNewGame={newGame} 
        onShowStats={() => setShowStats(true)} 
      />
      
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-start">
        {error && (
          <GameMessage message={error} type="error" />
        )}
        
        <GameBoard 
          guesses={gameState.guesses} 
          currentGuess={gameState.currentGuess}
          currentInput={currentInput}
        />
        
        <div className="mt-2 mb-6">
          <SolveWithAIButton disabled={gameState.gameStatus !== 'playing'} />
        </div>
        
        <Keyboard 
          onKeyPress={handleKeyPress}
          keyboardState={gameState.keyboardState}
        />
        
        {/* Game over modal */}
        {gameState.gameStatus !== 'playing' && (
          <GameOverModal 
            gameStatus={gameState.gameStatus} 
            solution={gameState.solution}
            attempts={gameState.currentGuess}
            onNewGame={newGame}
            onShowStats={() => setShowStats(true)}
          />
        )}
        
        {/* Stats modal */}
        <StatsModal 
          stats={stats}
          isOpen={showStats}
          onClose={() => setShowStats(false)}
          onNewGame={newGame}
        />
      </main>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>AI Wordle © 2025</p>
      </footer>
    </div>
  );
}

export default App;