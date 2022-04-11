import i18next from 'i18next';
import svse_app from './locales/languages/sv-se.json';
import enus_app from './locales/languages/en-us.json';

// eslint-disable-next-line import/no-unresolved
import svse_ui from '@selfcare/ui/locales/languages/sv-se.json';
// eslint-disable-next-line import/no-unresolved
import enus_ui from '@selfcare/ui/locales/languages/en-us.json';

import svse_core from '@selfcare/core/locales/languages/sv-se.json';
import enus_core from '@selfcare/core/locales/languages/en-us.json';

const namespaces = [
  'app',
  'core',
  'ui'
];

const initTranslationsOnServer = (selectedLocale, callback) => {
  const resources = {
    'sv-se': {
      app: svse_app,
      core: svse_core,
      ui: svse_ui
    },
    'en-us': {
      app: enus_app,
      core: enus_core,
      ui: enus_ui
    }
  };

  i18next.init({
    lng: selectedLocale,
    fallbackLng: selectedLocale,
    ns: namespaces,
    defaultNS: 'app',
    fallbackNS: ['ui', 'core'],
    lowerCaseLng: true,
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    },
    resources
  }, callback);

};

const initTranslationsOnClient = (selectedLocale, callback) => {
  const i18nData = window.__I18N_DATA__;
  i18next
    .init({
      resources: i18nData,
      lng: selectedLocale,
      fallbackLng: selectedLocale,
      ns: namespaces,
      defaultNS: 'app',
      fallbackNS: ['ui', 'core'],
      lowerCaseLng: true,
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false
      },
      react: {
        wait: true
      }
    }, callback);
};

export const initTranslations = (selectedLocale, callback) => {
  if (!process.browser) {
    initTranslationsOnServer(selectedLocale, callback);
  } else {
    initTranslationsOnClient(selectedLocale, callback);
  }
};
