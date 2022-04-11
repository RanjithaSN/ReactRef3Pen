import { ACCESSED_SUBSCRIBER_ID_HEADER } from '../../constants/subscriber';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';


export const SubscriberOfferingsTypes = {
  RetrieveSubscriberOfferings: CreateAsyncFromString('RETRIEVE_SUBSCRIBER_OFFERINGS')
};

export const RetrieveSubscriberOfferings = (subscriberId) => {
  return (dispatch, getState) => {
    const headers = {};
    if (subscriberId) {
      headers[ACCESSED_SUBSCRIBER_ID_HEADER] = subscriberId;
    }
    return apiThunkHelper(dispatch, getState(), SubscriberOfferingsTypes.RetrieveSubscriberOfferings, {
      method: 'post',
      url: 'Subscriber/RetrieveSubscriberOfferings',
      headers
    });
  };
};
