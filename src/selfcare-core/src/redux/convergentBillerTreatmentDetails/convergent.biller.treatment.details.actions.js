import { apiThunkHelper } from '../utils/thunk.helpers';
import { CreateAsyncFromString } from '../utils/action.creator';

export const ConvergentBillerTreatmentDetailsTypes = {
  RetrieveConvergentBillerTreatmentDetails: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_TREATMENT_DETAILS')
};

export const RetrieveConvergentBillerTreatmentDetails = () => {
  /* istanbul ignore next */
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), ConvergentBillerTreatmentDetailsTypes.RetrieveConvergentBillerTreatmentDetails, {
      method: 'post',
      url: 'subscriber/RetrieveConvergentBillerSubscriberTreatmentDetails'
    }, {});
  };
};
