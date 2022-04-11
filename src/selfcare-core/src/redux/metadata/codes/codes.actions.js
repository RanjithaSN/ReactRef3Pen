import LoadingStatus from '../../../constants/loading.status';
import { CreateAsyncFromString } from '../../utils/action.creator';
import { metadataThunkHelper } from '../../utils/thunk.helpers';
import { CodeStatus } from './codes.selectors';

export const CodeActions = {
  ...CreateAsyncFromString('RETRIEVE_CODE'),
  RETRIEVE_CODES_SAGA: 'RETRIEVE_CODES_SAGA'
};

export const RetrieveCodes = (codeConstant, force = false) => {
  return async (dispatch, getState) => {
    const state = getState();

    if (force || CodeStatus(codeConstant, state) === LoadingStatus.UNLOADED) {
      return metadataThunkHelper(dispatch, state, CodeActions, {
        url: `Codes/Type/${codeConstant}`
      }, {
        codeType: codeConstant
      });
    }
  };
};

export const RetrieveCodesSagaAction = (codeConstant, force = false) => {
  return {
    type: CodeActions.RETRIEVE_CODES_SAGA,
    codeConstant,
    force
  };
};
