import path from 'ramda/src/path';
import { Subscriber } from '../subscriber/subscriber.selectors';
import { CreateAsyncFromString } from '../utils/action.creator';
import { KTThunkHelper } from '../utils/thunk.helpers';
import { DismissNotificationsUrl, InAppNotificationsUrl, IN_APP_NOTIFICATIONS_STATUS } from './messages.constants';

export const MessagesTypes = {
  FETCH_MESSAGES: CreateAsyncFromString('FETCH_MESSAGES'),
  DISMISS_NOTIFICATION: CreateAsyncFromString('DISMISS_NOTIFICATION')
};

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const NUMBER_OF_DAYS_TO_RETURN = 7;

export const FetchMessages = () => {
  return (dispatch, getState) => {
    const now = Date.now();
    const aWeekAgo = now - (DAY_IN_MILLISECONDS * NUMBER_OF_DAYS_TO_RETURN);
    const subscriber = Subscriber(getState());

    const data = {
      Status: IN_APP_NOTIFICATIONS_STATUS.OPEN,
      IdentityID: path(['Id'], subscriber),
      DateRange: `${new Date(aWeekAgo).toISOString()} | ${new Date(now).toISOString()}`
    };

    return KTThunkHelper(dispatch, MessagesTypes.FETCH_MESSAGES, {
      url: InAppNotificationsUrl()
    }, data);
  };
};

export const DismissNotifications = (inAppId) => {
  return (dispatch) => {
    return KTThunkHelper(dispatch, MessagesTypes.DISMISS_NOTIFICATION, {
      url: DismissNotificationsUrl()
    }, {
      IdentityId: '',
      NotificationType: '',
      InAppNotificationId: inAppId
    });
  };
};
