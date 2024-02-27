function calcWordFrequencies() {
  // Read input from the user
  const wordList = prompt("").split(" ");

  // Create a map to store word frequencies
  const wordFreq = new Map();

  // Count frequencies of each word
  wordList.forEach((word) => {
    // Convert word to lowercase to treat 'Hi' and 'hi' as the same word
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });

  // Output word frequencies
  wordFreq.forEach((freq, word) => {
    console.log(`${word} ${freq}`);
  });
}
