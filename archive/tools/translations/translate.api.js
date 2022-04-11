const uuidv4 = require('uuid/v4'); // eslint-disable-line
const request = require('request'); // eslint-disable-line
const translateText = require('./translate.text');

module.exports = {
  callTranslateApi
};

function callTranslateApi(text, language) {
  // https://cognitive.uservoice.com/knowledgebase/articles/1867210-api-translator-text-how-to-avoid-translation
  const scrubbedText = translateText.scrubText(text);

  const options = {
    method: 'POST',
    baseUrl: 'https://api.cognitive.microsofttranslator.com/',
    url: 'translate',
    qs: {
      'api-version': '3.0',
      to: language,
      from: 'en',
      textType: 'html' // this allows us to use the div tag to skip translation for keys
    },
    headers: {
      'Ocp-Apim-Subscription-Key': process.argv[2],
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    body: [{
      text: scrubbedText
    }],
    json: true
  };

  return new Promise((resolve, reject) => {
    request(options, (err, resp, body) => {
      if (err || body.message) {
        reject(err || body);
      } else {
        const translated = body[0].translations[0].text;
        resolve(translateText.stripTranslatorMarkup(translated));
      }
    });
  });
}
