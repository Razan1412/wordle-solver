/*
  # Create words table for Wordle game

  1. New Tables
    - `words`
      - `id` (uuid, primary key)
      - `word` (text, unique, not null)
      - `is_solution` (boolean) - indicates if the word can be used as a solution
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `words` table
    - Add policy for public read access to words
*/

CREATE TABLE IF NOT EXISTS words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text UNIQUE NOT NULL CHECK (char_length(word) = 5),
  is_solution boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Words are publicly readable"
  ON words
  FOR SELECT
  TO public
  USING (true);

-- Insert initial word list
INSERT INTO words (word, is_solution) VALUES
  ('react', true),
  ('build', true),
  ('world', true),
  ('hello', true),
  ('games', true),
  ('piano', true),
  ('ghost', true),
  ('robot', true),
  ('model', true),
  ('brain', true),
  ('smart', true),
  ('learn', true),
  ('logic', true),
  ('think', true),
  ('solve', true),
  ('adapt', true),
  ('power', true),
  ('focus', true),
  ('lunar', true),
  ('orbit', true),
  ('cloud', true),
  ('coder', true),
  ('nexus', true),
  ('hyper', true),
  ('cyber', true),
  ('pixel', true),
  ('pulse', true),
  ('datum', true),
  ('array', true),
  ('query', true),
  ('spark', true),
  ('synth', true),
  ('ether', true),
  ('frame', true),
  ('delta', true),
  ('proxy', true),
  ('index', true),
  ('storm', true),
  ('bytes', true),
  ('voice', true)
ON CONFLICT (word) DO NOTHING;