const api = require('./translate.api');

xdescribe('Translate.api', () => {
  test('Translates a simple string', () => {
    expect.assertions(1);
    const text = 'Hello';

    return api.callTranslateApi(text).then((data) => {
      expect(data).toBe('Salut');
    });
  });

  test('Translates a string with a replacement', () => {
    expect.assertions(1);
    const text = 'Hello {{name}}';

    return api.callTranslateApi(text).then((data) => {
      expect(data).toBe('Salut {{name}}');
    });
  });
});
