const pluralize = require('pluralize');
const cache = require('./cache');
const model = require('../model');

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

function updateCache(terms, callback) {
  if (!terms) {
    model.get((err, result) => {
      if (err) {
        return callback(err);
      }
      const combinedWords = getCombinedWords(result.rows);
      cache.set('terms', result.rows);
      cache.set('fTerms', arrayToObj(result.rows));
      cache.set('cfTerms', combinedWords);
      callback(null, result.rows);
    });
  } else {
    const combinedWords = getCombinedWords(terms);
    cache.set('terms', terms);
    cache.set('fTerms', arrayToObj(terms));
    cache.set('cfTerms', combinedWords);
  }
}

function deleteCache(key) {
  cache.del(key);
}

function getDescriptions(str) {
  const words = getSingularizedWords(str);
  const descriptions = {};
  const flatTerms = cache.get('fTerms');
  const combinedTerms = cache.get('cfTerms');

  words.forEach(word => {
    const desc = flatTerms[word];
    if (desc) {
      descriptions[word] = desc;
    }
  });

  combinedTerms.forEach(({ word, description}) => {
    if (str.includes(word)) {
      descriptions[word] = description;
    }
  })
  return descriptions
}

function getDesc(str, callback) {
  const terms = cache.get('terms');
  updateCache(terms, () => {
    const descriptions = getDescriptions(str);
    callback(descriptions);
  });
}

module.exports = {
  parseWords,
  singularize,
  getSingularizedWords,
  getCombinedWords,
  arrayToObj,
  updateCache,
  deleteCache,
  getDesc,
};