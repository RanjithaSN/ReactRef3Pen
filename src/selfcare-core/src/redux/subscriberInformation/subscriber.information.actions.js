import { CreateAsyncFromString } from '../utils/action.creator';
import { tele2ThunkHelper } from '../utils/thunk.helpers';

export const SubscriberInformationTypes = {
  FETCH_SSN_INFORMATION: CreateAsyncFromString('FETCH_SSN_INFORMATION'),
  UPDATE_SUBSCRIBER_SSN_INFORMATION: CreateAsyncFromString('UPDATE_SUBSCRIBER_SSN_INFORMATION'),
  STUDENT_SSN_CHECK: CreateAsyncFromString('STUDENT_SSN_CHECK')
};

export const FetchSSNDetails = (ssn) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), SubscriberInformationTypes.FETCH_SSN_INFORMATION, {
      auth: false,
      method: 'get',
      url: `getMaskedAddress/${ssn}`
    });
  };
};


export const UpdateSubscriberWithSSNDetails = (subscriber, subscriberId) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), SubscriberInformationTypes.UPDATE_SUBSCRIBER_SSN_INFORMATION, {
      auth: true,
      method: 'post',
      url: 'updateSubscriber'
    }, subscriber, subscriberId);
  };
};
