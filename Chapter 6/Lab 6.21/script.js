function playGuessingGame(numToGuess, totalGuesses = 10) {
  let numGuesses = 0;
  let guess = prompt("Enter a number between 1 and 100.");
  while (numGuesses <= totalGuesses) {
    if (guess == null) {
      return 0;
    }
    if (guess == numToGuess) {
      numGuesses++;
      return numGuesses;
    }
    if (guess < numToGuess) {
      numGuesses++;
      guess = prompt(guess + " is too small. Guess a larger number.");
    }
    if (guess > numToGuess) {
      numGuesses++;
      guess = prompt(guess + " is too large. Guess a smaller number.");
    }
    if (isNaN(guess)) {
      guess = prompt("Please enter a number.");
    }
  }
  return 0;
}
