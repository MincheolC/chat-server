const pluralize = require('pluralize');
const cache = require('./cache');

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

function getCombinedWords(terms) {
  return terms.filter(({ word }) => word.search(/[ .\-\_\/&]+/) !== -1);
}

function arrayToObj(terms) {
  const obj = {};
  for (let i = 0; i < terms.length; i += 1) {
    const { word, description } = terms[i];
    obj[word] = description;
  }
  return obj;
}

function updateCache(terms) {
  const combinedWords = getCombinedWords(terms);

  cache.set('terms', terms);
  cache.set('fTerms', arrayToObj(terms));
  cache.set('cfTerms', arrayToObj(combinedWords));

  console.log(cache.get('terms'))
  console.log(cache.get('fTerms'))
  console.log(cache.get('cfTerms'))
}

function deleteCache(key) {
  cache.del(key);
}

module.exports = {
  parseWords,
  singularize,
  getSingularizedWords,
  getCombinedWords,
  arrayToObj,
  updateCache,
  deleteCache,
};