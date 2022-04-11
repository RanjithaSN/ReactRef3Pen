import { CreateAsyncFromString } from '../utils/action.creator';
import { tele2ThunkHelper } from '../utils/thunk.helpers';

export const SubmitOneTimePaymentTypes = {
  SubmitPaymentRetry: CreateAsyncFromString('SUBMIT_PAYMENT_RETRY')
};

export const SubmitPaymentRetry = (caseId) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), SubmitOneTimePaymentTypes.SubmitPaymentRetry, {
      auth: true,
      contentType: 'application/json',
      method: 'post',
      url: 'submitPayNow'
    }, {
      CaseId: caseId
    });
  };
};
