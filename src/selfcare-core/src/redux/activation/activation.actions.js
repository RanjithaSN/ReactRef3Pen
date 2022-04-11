import path from 'ramda/src/path';
import { Subscriber } from '../subscriber/subscriber.selectors';
import { CreateAsyncFromString } from '../utils/action.creator';
import { tele2ThunkHelper } from '../utils/thunk.helpers';

export const ActivationTypes = {
  FixedActivationRequest: CreateAsyncFromString('FIXED_ACTIVATION_REQUEST')
};

export const FixedActivationRequest = (CaseId) => {
  return (dispatch, getState) => {
    const subscriber = Subscriber(getState());
    return tele2ThunkHelper(dispatch, getState(), ActivationTypes.FixedActivationRequest, {
      auth: true,
      contentType: 'application/json',
      method: 'post',
      url: 'fixedActivationRequest'
    }, {
      CaseId,
      SubscriberId: path(['Id'], subscriber)
    });
  };
};
