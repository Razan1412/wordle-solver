import { supabase } from '../lib/supabase';

// Utility function to handle errors and log them
const handleError = (message: string, error: any): void => {
  console.error(`${message}:`, error);
  // Optionally, send the error to an external logging service
};

// Get a random word from the database that can be used as a solution
export const getRandomWord = async (): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('words')
      .select('word')
      .eq('is_solution', true);

    if (error || !data || data.length === 0) {
      handleError('Error fetching random word', error || 'No data returned');
      return 'react'; // fallback
    }

    const randomWord = data[Math.floor(Math.random() * data.length)].word;
    return randomWord;
  } catch (error) {
    handleError('Unexpected error in getRandomWord', error);
    return 'react';
  }
};

// Check if a word exists in the database
export const isValidWord = async (word: string): Promise<boolean> => {
  try {
    const { count, error } = await supabase
      .from('words')
      .select('*', { count: 'exact', head: true })
      .eq('word', word.toLowerCase());

    if (error) {
      handleError('Error checking word validity', error);
      return false;
    }

    return count === 1;
  } catch (error) {
    handleError('Unexpected error in isValidWord', error);
    return false;
  }
};
