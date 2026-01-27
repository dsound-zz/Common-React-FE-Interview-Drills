# Wordle

Build a simplified Wordle-style word guessing game.

## Requirements

- Use a fixed 5-letter target word (you can hardcode it).
- Allow up to 6 guesses.
- Provide a 5-letter input (or five separate inputs) for each guess.
- On submit, lock in the guess and show letter feedback:
  - Correct letter in correct position
  - Correct letter in wrong position
  - Letter not in the word
- Prevent submitting guesses that are not 5 letters long.
- Show remaining guesses or current attempt number.
- Display a win state when the word is guessed.
- Display a loss state after 6 incorrect guesses.
- Provide a "Restart" button to play again.

## Things to consider

- What should the data structure be?
- Can I derive as much as possible from existing state before adding more?
- Do I really need `useEffect`, or is it only useful for async calls and a few other scenarios?
- What's the bare minimum JSX I'll need to implement the core logic?
- Does my logic need to live inside the component or can it be a helper function?
- Once everything works, what bare minimum styling can I add?
