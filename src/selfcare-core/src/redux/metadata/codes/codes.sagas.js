import { call, select, all, takeEvery } from 'redux-saga/effects';
import { CodeStatus } from './codes.selectors';
import { CodeActions } from './codes.actions';
import LoadingStatus from '../../../constants/loading.status';
import { metadataSagaHelper } from '../../utils/cdn.sagas';

export function* retrieveCodes({ codeConstant, force = false }) {
  const codeStatus = yield select(CodeStatus, codeConstant);
  const config = {
    url: `Codes/Type/${codeConstant}`
  };
  const requestObject = {
    codeType: codeConstant
  };
  if (force || codeStatus === LoadingStatus.UNLOADED) {
    yield call(metadataSagaHelper, CodeActions, config, requestObject, force);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(CodeActions.RETRIEVE_CODES_SAGA, retrieveCodes)
  ]);
}
