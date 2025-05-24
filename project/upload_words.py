import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()  # Load .env file

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")
TABLE_NAME = "words"

print("Script started")

# Check for env values
if not SUPABASE_URL or not SUPABASE_KEY:
    print("Missing SUPABASE_URL or SUPABASE_KEY in .env")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def load_words(filename):
    try:
        with open(filename, "r") as f:
            words = [line.strip().lower() for line in f if line.strip()]
            print(f"📄 Loaded {len(words)} words from {filename}")
            return words
    except Exception as e:
        print(f"Error reading {filename}:", e)
        return []

def upload_words(words, is_solution):
    for word in words:
        response = supabase.table(TABLE_NAME).insert({
            "word": word,
            "is_solution": is_solution
        }).execute()

        if hasattr(response, 'status_code') and response.status_code == 201:
            print(f"Inserted: {word}")
        else:
            print(f"Failed to insert '{word}':", response.data)

def main():
    solution_words = load_words("wordle-answers-alphabetical.txt")
    allowed_words = load_words("wordle-allowed-guesses.txt")

    upload_words(solution_words, is_solution=True)
    upload_words(allowed_words, is_solution=False)

if __name__ == "__main__":
    main()
