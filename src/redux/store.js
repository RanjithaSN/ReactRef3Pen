import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import eventMiddleware from '../components/widgetizer/event.middleware';
import localStorageMiddleware from '../middleware/local.storage.middleware';
import reducer from './combined.reducers';
import createRootTasks from './sagas';
import { INITIAL_STATE as initialSiteState } from './site/site.reducer';

const sagaMiddleware = createSagaMiddleware();
const middlewareItems = [thunk, eventMiddleware, localStorageMiddleware, sagaMiddleware];

window.__INITIAL_DATA__.state.client.site.shouldShowCookieInfo = initialSiteState.shouldShowCookieInfo;
window.__INITIAL_DATA__.state.client.site.deviceType = window.localStorage.getItem('deviceType');
window.__INITIAL_DATA__.state.client.site.shouldShowOTTGuidedExperience = window.localStorage.getItem('SHOULD_SHOW_OTT_GUIDED_EXPERIENCE');
const initialState = new Immutable(window.__INITIAL_DATA__.state);

const middleWare = applyMiddleware(...middlewareItems);
export default () => {
  const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 100
  });
  const store = createStore(reducer, initialState, composeEnhancers(middleWare));
  const rootGenerator = function* () {
    yield all(createRootTasks().map((t) => fork(t)));
  };
  sagaMiddleware.run(rootGenerator);
  return store;
};
