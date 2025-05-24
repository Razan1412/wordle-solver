import { LetterState, TileData, GameState } from '../types/game';

// Initialize a new game state
export const initializeGame = (solution: string): GameState => {
  return {
    solution: solution.toLowerCase(),
    guesses: Array(6).fill(null).map(() => 
      Array(5).fill(null).map(() => ({ letter: '', state: 'empty' as LetterState }))
    ),
    currentGuess: 0,
    gameStatus: 'playing',
    keyboardState: {}
  };
};

// Update the keyboard state based on the latest guess
export const updateKeyboardState = (
  keyboardState: Record<string, LetterState>,
  guess: TileData[]
): Record<string, LetterState> => {
  const newState = { ...keyboardState };
  
  guess.forEach(({ letter, state }) => {
    const lowerLetter = letter.toLowerCase();
    // Only update if the new state has higher priority
    if (lowerLetter) {
      const currentState = newState[lowerLetter];
      if (!currentState || getPriorityValue(state) > getPriorityValue(currentState)) {
        newState[lowerLetter] = state;
      }
    }
  });
  
  return newState;
};

// Helper to determine priority of letter states (correct > present > absent)
const getPriorityValue = (state: LetterState): number => {
  switch (state) {
    case 'correct': return 3;
    case 'present': return 2;
    case 'absent': return 1;
    default: return 0;
  }
};

// Evaluate a guess against the solution
export const evaluateGuess = (guess: string, solution: string): TileData[] => {
  const result: TileData[] = Array(5).fill(null).map(() => ({ letter: '', state: 'empty' }));
  const solutionChars = solution.toLowerCase().split('');
  const remainingChars = [...solutionChars];
  const guessChars = guess.toLowerCase().split('');
  
  // First pass: mark correct letters
  guessChars.forEach((letter, i) => {
    result[i].letter = letter;
    if (letter === solutionChars[i]) {
      result[i].state = 'correct';
      remainingChars[i] = '#'; // Mark as used
    }
  });
  
  // Second pass: mark present and absent letters
  guessChars.forEach((letter, i) => {
    if (result[i].state !== 'correct') {
      const remainingIndex = remainingChars.findIndex(char => char === letter);
      if (remainingIndex !== -1) {
        result[i].state = 'present';
        remainingChars[remainingIndex] = '#'; // Mark as used
      } else {
        result[i].state = 'absent';
      }
    }
  });
  
  return result;
};

// Submit a guess and update game state
export const submitGuess = (gameState: GameState, guess: string): GameState => {
  if (
    gameState.gameStatus !== 'playing' ||
    gameState.currentGuess >= 6 ||
    guess.length !== 5
  ) {
    return gameState;
  }
  
  const evaluatedGuess = evaluateGuess(guess, gameState.solution);
  const newGuesses = [...gameState.guesses];
  newGuesses[gameState.currentGuess] = evaluatedGuess;
  
  const newKeyboardState = updateKeyboardState(
    gameState.keyboardState,
    evaluatedGuess
  );
  
  // Check if won
  const isWon = evaluatedGuess.every(tile => tile.state === 'correct');
  
  // Check if lost (reached max guesses without winning)
  const isLost = !isWon && gameState.currentGuess === 5;
  
  return {
    ...gameState,
    guesses: newGuesses,
    currentGuess: gameState.currentGuess + 1,
    gameStatus: isWon ? 'won' : isLost ? 'lost' : 'playing',
    keyboardState: newKeyboardState
  };
};