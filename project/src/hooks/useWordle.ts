import { useState, useEffect, useCallback } from 'react';
import { GameState, GameStats } from '../types/game';
import { getRandomWord, isValidWord } from '../utils/words';
import { initializeGame, submitGuess } from '../utils/gameLogic';

// Default game stats
const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  }
};

export const useWordle = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);
  const [showStats, setShowStats] = useState(false);

  // Initialize the game
  useEffect(() => {
    const initGame = async () => {
      const solution = await getRandomWord();
      setGameState(initializeGame(solution));
    };
    
    initGame();
    
    // Try to load stats from localStorage
    try {
      const savedStats = localStorage.getItem('wordleStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (e) {
      console.error('Failed to load stats:', e);
    }
  }, []);

  // Save stats whenever they change
  useEffect(() => {
    if (stats !== DEFAULT_STATS) {
      try {
        localStorage.setItem('wordleStats', JSON.stringify(stats));
      } catch (e) {
        console.error('Failed to save stats:', e);
      }
    }
  }, [stats]);

  // Handle game completion
  useEffect(() => {
    if (!gameState || gameState.gameStatus === 'playing') return;
    
    // Update stats after a delay to show the final row first
    const timer = setTimeout(() => {
      setStats(prevStats => {
        const newStats = { ...prevStats };
        newStats.gamesPlayed += 1;
        
        if (gameState.gameStatus === 'won') {
          newStats.gamesWon += 1;
          newStats.currentStreak += 1;
          newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
          newStats.guessDistribution[gameState.currentGuess] += 1;
        } else {
          newStats.currentStreak = 0;
        }
        
        return newStats;
      });
      
      setShowStats(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [gameState?.gameStatus]);

  // Handle keyboard input
  const handleKeyPress = useCallback(async (key: string) => {
    if (!gameState || gameState.gameStatus !== 'playing') return;
    
    setError(null);
    
    if (key === 'Backspace' || key === '←') {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (key === 'Enter') {
      if (currentInput.length !== 5) {
        setError('Word must be 5 letters');
        return;
      }
      
      const valid = await isValidWord(currentInput);
      if (!valid) {
        setError('Not in word list');
        return;
      }
      
      setGameState(prevState => {
        if (!prevState) return null;
        return submitGuess(prevState, currentInput);
      });
      setCurrentInput('');
    } else if (/^[a-zA-Z]$/.test(key) && currentInput.length < 5) {
      setCurrentInput(prev => prev + key.toLowerCase());
    }
  }, [gameState, currentInput]);

  // Start a new game
  const newGame = useCallback(async () => {
    const solution = await getRandomWord();
    setGameState(initializeGame(solution));
    setCurrentInput('');
    setError(null);
    setShowStats(false);
  }, []);

  return {
    gameState,
    currentInput,
    error,
    stats,
    showStats,
    handleKeyPress,
    newGame,
    setShowStats,
  };
};