const randomWord = require('../json/words.json');

function randomWords() {
  return randomWord[Math.floor(Math.random() * randomWords.length)];
}

module.exports = randomWords;
