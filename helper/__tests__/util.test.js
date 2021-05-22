const {
  parseWords,
  singularize,
  getSingularizedWords,
  getCombinedWords,
  arrayToObj,
} = require('../util');

describe('parseWords', () => {
  it('valid', () => {
    const strings = [
      'hello world',
      'You can ask anything about Microsoft Cloud - Azure, Microsoft 365.',
      'We provided a "special" gift - digital coupons - for you guys!',
      'How (are) u?😀',
      'print();',
      '1 + 2 * 4 / 5 % 2 - 1 = ?',
    ];
    const result = [
      ['hello', 'world'],
      ['You', 'can', 'ask', 'anything', 'about', 'Microsoft', 'Cloud', 'Azure', 'Microsoft', '365'],
      ['We', 'provided', 'a', 'special', 'gift', 'digital', 'coupons', 'for', 'you', 'guys'],
      ['How', 'are', 'u'],
      ['print'],
      ['1', '2', '4', '5', '2', '1'],
    ];
    strings.forEach((str, index) => {
      expect(parseWords(str)).toEqual(result[index]);
    });
  });
});

describe('singularize', () => {
  it('valid', () => {
    const plurals = [
      'singles',
      'applications',
      'words',
      'FMS',
      'Microsoft',
      'Azure',
      '365',
      'potatoes',
      'analyses',
      'sheep',
      'house',
    ];
    const result = [
      'single',
      'application',
      'word',
      'FMS',
      'Microsoft',
      'Azure',
      '365',
      'potato',
      'analysis',
      'sheep',
      'house',
    ];
    plurals.forEach((plural, index) => {
      expect(singularize(plural)).toEqual(result[index]);
    })
  })
});

describe('getSingularizedWords', () => {
  it('valid', () => {
    const strings = [
      'hello world',
      'You can ask anything about Microsoft Cloud - Azure, Microsoft 365.',
      'We provided "special" gifts - digital coupons - for you guys!',
      'How (are) you?😀',
      'print();',
      '1 + 2 * 4 / 5 % 2 - 1 = ?',
    ];
    const result = [
      ['hello', 'world'],
      ['You', 'can', 'ask', 'anything', 'about', 'Microsoft', 'Cloud', 'Azure', 'Microsoft', '365'],
      ['We', 'provided', 'special', 'gift', 'digital', 'coupon', 'for', 'you', 'guy'],
      ['How', 'is', 'you'],
      ['print'],
      ['1', '2', '4', '5', '2', '1'],
    ];
    strings.forEach((str, index) => {
      expect(getSingularizedWords(str)).toEqual(result[index]);
    });
  });
});

describe('getCombinedWords', () => {
  it('valid', () => {
    const words = [
      { word: 'Full-Stack' },
      { word: 'markup language' },
      { word: 'relational database' },
      { word: 'Btn' },
      { word: 'kick-off' },
      { word: 'R&R' },
      { word: 'F/U' },
      { word: 'N/A' },
      { word: 'Sans-serif' },
      { word: '365' },
      { word: 'house' },
    ];
    const result = [
      { word: 'Full-Stack' },
      { word: 'markup language' },
      { word: 'relational database' },
      { word: 'kick-off' },
      { word: 'R&R' },
      { word: 'F/U' },
      { word: 'N/A' },
      { word: 'Sans-serif' },
    ];
    expect(getCombinedWords(words)).toEqual(result);
  });
});

describe('arrayToObj', () => {
  it('valid', () => {
    const words = [
      { word: 'Full-Stack', description: 'a' },
      { word: 'markup language', description: 'b' },
      { word: 'Btn', description: 'c' },
      { word: 'kick-off', description: 'd' },
      { word: 'R&R', description: 'e' },
      { word: 'F/U', description: 'f' },
      { word: 'Sans-serif', description: 'g' },
      { word: 'house', description: 'h' },
    ];
    const result = {
      'Full-Stack': 'a',
      'markup language': 'b',
      'Btn': 'c',
      'kick-off': 'd',
      'R&R': 'e',
      'F/U': 'f',
      'Sans-serif': 'g',
      'house': 'h',
    };
    expect(arrayToObj(words)).toEqual(result);
  });
});