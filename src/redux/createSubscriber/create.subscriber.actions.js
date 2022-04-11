
import { SearchLocker } from '@selfcare/core/redux/locker/locker.actions';
import { CreateSubscriberSession } from '@selfcare/core/redux/session/session.actions';
import { SubscriberTypes } from '@selfcare/core/redux/subscriber/subscriber.actions';
import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { apiThunkHelper } from '@selfcare/core/redux/utils/thunk.helpers';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { ClearProspect, SubscriberInformationActions } from '../orderFlow/subscriberInformation/subscriber.information.actions';

export const CreateSubscriberActionTypes = {
  CHECK_FOR_ACTIVE_SUBSCRIBER: CreateAsyncFromString('CHECK_FOR_ACTIVE_SUBSCRIBER'),
  UPDATE_SUBSCRIBER_FORM_VALUES: 'UPDATE_SUBSCRIBER_FORM_VALUES',
  LOCAL_STORAGE_CHECKED: 'CREATE_SUBSCRIBER.LOCAL_STORAGE_CHECKED'
};

export const UpdateSubscriberFormValues = (values, isValid) => ({
  type: CreateSubscriberActionTypes.UPDATE_SUBSCRIBER_FORM_VALUES,
  payload: {
    values,
    isValid
  }
});

const CUSTOMER_SSN_ATTRIBUTE = 'SSN';

export const RetrieveSubscriberOrProspect = () => {
  return async (dispatch, getState) => {
    const payload = await apiThunkHelper(dispatch, getState(), CreateSubscriberActionTypes.CHECK_FOR_ACTIVE_SUBSCRIBER, {
      method: 'post',
      url: 'subscriber/RetrieveSubscriber'
    });
    dispatch(ClearProspect());
    const externalReferenceInAdditionalProperties = pathOr([], ['Subscriber', 'AdditionalProperties'], payload).find(({ ExternalReference }) => CUSTOMER_SSN_ATTRIBUTE === ExternalReference);
    const externalReferenceInSubscriber = path(['Subscriber', 'ExternalReference'], payload);

    const isSubscriber = externalReferenceInSubscriber || path(['Values', 0], externalReferenceInAdditionalProperties);

    if (isSubscriber) {
      dispatch(SearchLocker());
      return dispatch({
        type: SubscriberTypes.RetrieveSubscriber.SUCCESS,
        payload
      });
    }

    return dispatch({
      type: SubscriberInformationActions.CREATE_PROSPECT.SUCCESS,
      payload
    });
  };
};

export const CreateSubscriberOrProspectSession = (username, password) => {
  return async (dispatch) => {
    await dispatch(CreateSubscriberSession(username, password));
    return dispatch(RetrieveSubscriberOrProspect());
  };
};

export const LocalStorageChecked = () => ({
  type: CreateSubscriberActionTypes.LOCAL_STORAGE_CHECKED
});
