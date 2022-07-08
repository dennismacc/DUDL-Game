const chosenWord = require('../logic/randomWords')

const checkAnswers = (answer) => {
   if (answer === chosenWord) {
    return true;
   }
   else{
    return false;
   }
    };


module.exports = checkAnswers;

