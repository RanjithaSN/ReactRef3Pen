import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

// This configuration is used purely for the sake of giving us the capabilities of internationalizing storybook
// Components. The hard-coded values of en-US are intentionally left as is because there is no need to create a tie
// between selfcare-core and selfcare-ui at this point.

i18next
  .use(XHR)
  .init({
    lng: 'en-us',
    ns: ['ui'],
    defaultNS: 'ui',
    fallbackLng: 'en-us',
    lowerCaseLng: true,
    load: 'currentOnly',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: `locales/${LOCALE_HASH}/{{ns}}/{{lng}}.json`
    },
    react: {
      wait: true
    }
  });

export default i18next;
