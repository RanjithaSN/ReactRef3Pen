import path from 'ramda/src/path';
import { parseToISOString } from '../../helpers/date.helper';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper, tele2ThunkHelper } from '../utils/thunk.helpers';
import { SubscriberSSN } from './subscriber.selectors';

export const SubscriberTypes = {
  RetrieveSubscriber: CreateAsyncFromString('RETRIEVE_SUBSCRIBER'),
  UpdateCredentials: CreateAsyncFromString('UPDATE_CREDENTIALS'),
  UpdateSubscriber: CreateAsyncFromString('UPDATE_SUBSCRIBER')
};

export const RetrieveSubscriber = () => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SubscriberTypes.RetrieveSubscriber, {
      method: 'post',
      url: 'subscriber/RetrieveSubscriber'
    }, {});
  };
};

export const buildUpdateSubscriberPayload = (subscriber, ssn) => {
  return {
    email: subscriber.Email,
    login: subscriber.Login,
    pnr: Number.parseInt(ssn, 0),
    MobilePhone: subscriber.MobilePhone,
    ContactPreferences: subscriber.ContactPreferences,
    SubscriberConsents: subscriber.SubscriberConsents
  };
};

export const UpdateSubscriber = (subscriber) => {
  return async (dispatch, getState) => {
    const data = subscriber;

    if (path(['BirthDate'], subscriber)) {
      data.BirthDate = parseToISOString(subscriber.BirthDate, true);
    }

    return tele2ThunkHelper(dispatch, getState(), SubscriberTypes.UpdateSubscriber, {
      auth: true,
      method: 'post',
      url: 'updateSubscriber'
    }, buildUpdateSubscriberPayload(data, SubscriberSSN(getState())), data.Id);
  };
};

export const UpdateCredentials = (credentials) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SubscriberTypes.UpdateCredentials, {
      method: 'post',
      url: 'Subscriber/UpdateCredentials'
    }, credentials);
  };
};
