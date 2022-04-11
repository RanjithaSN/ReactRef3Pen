import axios from 'axios';
import { take, select, fork, call, put } from 'redux-saga/effects';
import { CreateAsyncFromString } from '../utils/action.creator';
import { Configuration } from './configuration.selectors';

export const ConfigurationActionTypes = {
  RetrieveConfiguration: CreateAsyncFromString('RETRIEVE_CONFIGURATION')
};

export const RetrieveConfiguration = () => {
  return async (dispatch) => {
    dispatch({
      type: ConfigurationActionTypes.RetrieveConfiguration.ASYNC
    });
  };
};

export function* retrieveConfigurationAsync() {
  // Don't try to load the configuration if it is already loaded.
  const config = yield select(Configuration);
  if (config) {
    return;
  }

  yield put({
    type: ConfigurationActionTypes.RetrieveConfiguration.BEGIN
  });

  try {
    const { data } = yield call(
      axios.get,
      'http://localhost:8001/config.json'
    );

    yield put({
      type: ConfigurationActionTypes.RetrieveConfiguration.SUCCESS,
      payload: data
    });
  } catch (err) {
    yield put({
      type: ConfigurationActionTypes.RetrieveConfiguration.FAILURE,
      payload: err
    });
  }
}

export function* watchRetrieveConfigurationAsync() {
  while (true) {
    yield take(ConfigurationActionTypes.RetrieveConfiguration.ASYNC);
    yield fork(retrieveConfigurationAsync);
  }
}
