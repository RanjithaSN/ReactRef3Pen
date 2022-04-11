import { apiThunkHelper } from '../utils/thunk.helpers';
import { CreateAsyncFromString } from '../utils/action.creator';

export const ConvergentBillerAccountDetailsTypes = {
  RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS')
};

export const RetrieveConvergentBillerAccountDetails = () => {
  return (dispatch, getState) => apiThunkHelper(dispatch, getState(), ConvergentBillerAccountDetailsTypes.RETRIEVE_CONVERGENT_BILLER_ACCOUNT_DETAILS, {
    method: 'post',
    url: 'subscriber/RetrieveConvergentBillerAccountDetails'
  }, {});
};
