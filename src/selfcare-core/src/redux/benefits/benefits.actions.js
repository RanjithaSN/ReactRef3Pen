import axios from 'axios';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { BenefitsConfiguration } from './benefits.selectors';
import { CreateAsyncFromString } from '../utils/action.creator';

export const BenefitsTypes = {
  RetrieveConfig: CreateAsyncFromString('BENEFITS_RETRIEVE_CONFIG')
};

export const RetrieveBenefitsConfiguration = () => {
  return async (dispatch) => {
    dispatch({
      type: BenefitsTypes.RetrieveConfig.ASYNC
    });
  };
};

export function* retrieveBenefitsConfigAsync() {
  const benefitsConfig = yield select(BenefitsConfiguration);
  if (benefitsConfig !== null) {
    return;
  }
  yield put({
    type: BenefitsTypes.RetrieveConfig.BEGIN
  });

  try {
    const { data } = yield call(axios.get, '/benefits_config.json');

    yield put({
      type: BenefitsTypes.RetrieveConfig.SUCCESS,
      payload: data
    });
  } catch (err) {
    yield put({
      type: BenefitsTypes.RetrieveConfig.FAILURE,
      payload: err
    });
  }
}

export function* watchRetrieveBenefitsConfigAsync() {
  yield takeEvery(BenefitsTypes.RetrieveConfig.ASYNC, retrieveBenefitsConfigAsync);
}
