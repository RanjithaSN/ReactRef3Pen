import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const SubscriptionTypes = {
  RetrieveSubscription: CreateAsyncFromString('RETRIEVE_SUBSCRIPTION'),
  UpdateSubscription: CreateAsyncFromString('UPDATE_SUBSCRIPTION'),
  ClearSubscriptions: 'CLEAR_SUBSCRIPTIONS'
};

export const RetrieveSubscription = (subscriptionId) => (dispatch, getState) => {
  return apiThunkHelper(dispatch, getState(), SubscriptionTypes.RetrieveSubscription, {
    method: 'post',
    url: 'Subscriber/RetrieveSubscription'
  }, {
    Id: subscriptionId
  });
};

export const UpdateSubscription = (body) => (dispatch, getState) => {
  return apiThunkHelper(dispatch, getState(), SubscriptionTypes.UpdateSubscription, {
    method: 'post',
    url: 'Subscriber/UpdateSubscription'
  }, body);
};

export const ClearSubscriptionDetails = () => {
  return {
    type: SubscriptionTypes.ClearSubscriptions
  };
};
