import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { setI18n } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectedLocale } from 'selfcare-core/src/redux/preferences/preferences.selectors';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import { LocaleReady } from './redux/site/site.actions';
import { LocaleReady as IsLocaleReady } from './redux/site/site.selectors';

const namespaces = [
  'app',
  'core',
  'ui'
];

const initTranslations = (selectedLocale, callback) => {
  i18next
    .use(XHR)
    .init({
      lng: selectedLocale,
      fallbackLng: selectedLocale,
      ns: namespaces,
      defaultNS: 'app',
      fallbackNS: ['ui', 'core'],
      lowerCaseLng: true,
      load: 'currentOnly',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false
      },
      backend: {
        loadPath: `/locales/${LOCALE_HASH}/{{ns}}/{{lng}}.json`
      },
      react: {
        wait: true
      }
    }, callback);
};

const InitTranslations = ({ children, selectedLocale, localeReady, setLocaleReady }) => {
  const handleLocaleReady = useCallback(() => {
    setI18n(i18next);
    setLocaleReady(true);
  }, [setLocaleReady]);

  useEffect(() => {
    initTranslations(selectedLocale, handleLocaleReady);
  }, [selectedLocale, handleLocaleReady]);

  if (!localeReady) {
    return <LoadingIndicator isLoading />;
  }
  return <>{children}</>;
};

InitTranslations.propTypes = {
  children: PropTypes.node.isRequired,
  selectedLocale: PropTypes.string.isRequired,
  localeReady: PropTypes.bool.isRequired,
  setLocaleReady: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  selectedLocale: SelectedLocale,
  localeReady: IsLocaleReady
});

const mapActionsToProps = {
  setLocaleReady: LocaleReady
};
export default connect(mapStateToProps, mapActionsToProps)(InitTranslations);
