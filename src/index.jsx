import { loadableReady } from '@loadable/component';
import i18next from 'i18next';
import React from 'react';
import { hydrate } from 'react-dom';
import { setI18n } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RootContainer from './components/app/app.contextual';
import { initTranslations } from './i18n';
import { AppLoaded } from './redux/appLoaded/app.loaded.actions';
import { disableFeature, enableFeature, enableVariant } from './redux/feature/feature.actions';
import createStore from './redux/store';
import { prefillZendesk, setupZenDesk } from 'integrations/zen-desk';

window.dataLayer = window.dataLayer || [];

const store = createStore();

window.__initZenDesk = () => setupZenDesk(store);
window.__prefillZenDesk = () => prefillZendesk(store);

initTranslations('sv-se',
  () => {
    setI18n(i18next);
    loadableReady(() => {
      hydrate(
        <Provider store={store}>
          <BrowserRouter>
            <RootContainer />
          </BrowserRouter>
        </Provider>,
        document.getElementById('react-root')
      );
      store.dispatch(AppLoaded());
    });
  }
);

if ('serviceWorker' in navigator && navigator.serviceWorker) {
  if (process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((_) => {
          navigator.serviceWorker.controller.postMessage({
            type: 'saveSubscription'
          });
        })
        .catch((e) => console.error(e));
    });
  } else {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
}

// Turn on hot reloading for dev environments
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }
}

window.Penny = {
  enableFeature: (feature) => store.dispatch(enableFeature(feature)),
  disableFeature: (feature) => store.dispatch(disableFeature(feature)),
  enableVariant: (feature, variant) => store.dispatch(enableVariant(feature, variant))
};

