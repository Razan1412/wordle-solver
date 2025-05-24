export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface TileData {
  letter: string;
  state: LetterState;
}

export interface GameState {
  solution: string;
  guesses: TileData[][];
  currentGuess: number;
  gameStatus: 'playing' | 'won' | 'lost';
  keyboardState: Record<string, LetterState>;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
}