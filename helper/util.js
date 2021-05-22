const pluralize = require('pluralize');

function parseWords(str) {
  const regexWords = /([a-zA-Z0-9]+)/g
  return Array.from(str.matchAll(regexWords)).map(obj => obj[0]);
}

function singularize(word) {
  const regexProperNoun = /^[A-Z0-9]+/
  return regexProperNoun.test(word) ? word : pluralize.singular(word);
}

function getSingularizedWords(str) {
  return parseWords(str).map(word => singularize(word));
}

module.exports = {
  parseWords,
  singularize,
  getSingularizedWords,
};