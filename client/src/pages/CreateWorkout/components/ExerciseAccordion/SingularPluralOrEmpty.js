// will need a word to be empty, singular, or plural depending on the amount inputted by user
// ex. in regards to "sets" amount inputted by user. 0 = "", 1 = "set", >1 = "sets"
// pluralWordDesc must be a plural string
// using loose equality because input from user is in a string

export function singularPluralOrEmpty(amount, pluralWord) {
  let transformedString = "";
  if (amount == 1) {
    // singular word
    transformedString = `${amount} ${pluralWord.slice(0, -1)}`;
  } else if (amount > 1) {
    transformedString = `${amount} ${pluralWord}`;
  }
  return transformedString;
}
