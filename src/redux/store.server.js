import { BenefitsTypes } from '@selfcare/core/redux/benefits/benefits.actions.js';
import { ConfigurationActionTypes } from '@selfcare/core/redux/configuration/configuration.actions';
import { RetrieveCampaignsAsync } from 'redux/aws/campaigns/campaigns.actions';
import { RetrieveLandingPageAsync } from 'redux/aws/landingPage/landing.page.actions';
import { RetrieveAboutPagesAsync } from 'redux/aws/aboutPages/about.pages.actions';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import thunk from 'redux-thunk';
import benefits_config from '../benefits_config.json';
import eventMiddleware from '../components/widgetizer/event.middleware';
import config from '../config.json';
import reducer from './combined.reducers';
import createRootTasks from './sagas';

const logger = () => (next) => (action) => {
  const result = next(action);
  return result;
};

export default async () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewareItems = [thunk, eventMiddleware, sagaMiddleware, logger];
  const middleWare = applyMiddleware(...middlewareItems);
  const store = createStore(reducer, composeWithDevTools(middleWare));

  const rootGenerator = function* () {
    yield all(createRootTasks().map((t) => call(t)));
  };

  const rootTask = sagaMiddleware.run(rootGenerator);

  store.dispatch({
    type: ConfigurationActionTypes.RetrieveConfiguration.SUCCESS,
    payload: config
  });
  store.dispatch({
    type: BenefitsTypes.RetrieveConfig.SUCCESS,
    payload: benefits_config
  });

  await Promise.all(
    [
      store.dispatch(RetrieveLandingPageAsync()),
      store.dispatch(RetrieveCampaignsAsync()),
      store.dispatch(RetrieveAboutPagesAsync())
    ]
  );

  const enhancedStore = {
    ...store,
    getPromise: () => rootTask.toPromise(),
    close: () => {
      store.dispatch(END);
      return rootTask.toPromise();
    }
  };
  return enhancedStore;
};
