import AscendonReducers from '@selfcare/core/redux/ascendon/ascendon.reducer';
import CdnRequestCacheReducer from '@selfcare/core/redux/cdnRequestCache/cdn.request.cache.reducer';
import { combineReducers } from 'redux';
import ClientReducer from './client.reducers';
import featureReducer from './feature/feature.reducer';

const appReducer = combineReducers({
  client: ClientReducer,
  ascendon: AscendonReducers,
  cdnRequestCache: CdnRequestCacheReducer,
  feature: featureReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
