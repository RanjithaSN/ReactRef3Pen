const translateText = require('./translate.text');

describe('Translate.text', () => {
  test('Replaces double braces', () => {
    const input = '{{city}} {{state}}';
    const result = '<span class="notranslate">city</span> <span class="notranslate">state</span>';
    expect(translateText.scrubText(input)).toBe(result);
  });

  test('strips translator markup', () => {
    const input = 'test <span class="notranslate">city</span> <span class="notranslate">state</span>';
    const result = 'test {{city}} {{state}}';
    expect(translateText.stripTranslatorMarkup(input)).toBe(result);
  });
});
