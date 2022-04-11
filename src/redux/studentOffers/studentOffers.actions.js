import { UserIsAvailable } from '../orderFlow/subscriberInformation/subscriber.information.selectors';
import { IsCalculatingDecisionBeingModified } from '../ordering/ordering.actions';
import { SubscriberSSN } from 'selfcare-core/src/redux/subscriber/subscriber.selectors';
import { mecenatThunkHelper } from 'selfcare-core/src/redux/utils/thunk.helpers';
import { CreateAsyncFromString } from 'selfcare-core/src/redux/utils/action.creator';

export const StudentOfferTypes = {
  STUDENT_SSN_CHECK: CreateAsyncFromString('STUDENT_SSN_CHECK')
};

export const SSNCheck = (ssn) => {
  return (dispatch, getState) => {
    return mecenatThunkHelper(dispatch, getState(), StudentOfferTypes.STUDENT_SSN_CHECK, {
      method: 'get',
      url: `?ssnnumber=${ssn}`
    });
  };
};

export const StudentSsnCheck = (formattedSSN = '') => {
  return async (dispatch, getState) => {
    const state = getState();

    if (SubscriberSSN(state) && (UserIsAvailable(state) || formattedSSN.length > 0)) {
      const ssn = SubscriberSSN(state);
      await dispatch(IsCalculatingDecisionBeingModified(true));
      const response = await dispatch(SSNCheck(ssn));
      await dispatch(IsCalculatingDecisionBeingModified(false));

      if (response.status !== 'VALID') {
        return true;
      }
    }

    return false;
  };
};
