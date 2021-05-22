const { parseWords, singularize, getSingularizedWords } = require('../util');

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