import { CurrentSession } from '@selfcare/core/redux/session/session.selectors';
import { CreateAsyncFromString } from '../utils/action.creator';
import { SESSION_ID_HEADER } from '../utils/api.constants';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const SessionActionTypes = {
  CLOSE_SUBSCRIBER_SESSION: CreateAsyncFromString('CLOSE_SUBSCRIBER_SESSION'),
  CREATE_PROSPECT_SESSION: 'CREATE_PROSPECT_SESSION',
  CREATE_SUBSCRIBER_SESSION: CreateAsyncFromString('CREATE_SUBSCRIBER_SESSION'),
  REFRESH_SESSION: CreateAsyncFromString('REFRESH_SESSION'),
  RETRIEVE_LIVEPERSON_AUTHENTICATION: CreateAsyncFromString('RETRIEVE_LIVEPERSON_AUTHENTICATION')
};

export const UpdateProspectSession = (sessionId) => ({
  type: SessionActionTypes.CREATE_PROSPECT_SESSION,
  payload: {
    SessionId: sessionId
  }
});

export const CreateSubscriberSession = (username, password) => {
  return async (dispatch, getState) => {
    await apiThunkHelper(dispatch, getState(), SessionActionTypes.CREATE_SUBSCRIBER_SESSION, {
      method: 'post',
      removeCurrentSession: true,
      url: 'subscriber/CreateSession'
    }, {
      Login: username,
      Password: password
    });
  };
};

export const RefreshSession = (sessionId) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SessionActionTypes.REFRESH_SESSION, {
      method: 'post',
      url: 'subscriber/RefreshSession',
      headers: {
        [SESSION_ID_HEADER]: sessionId
      }
    });
  };
};

export const CloseSession = () => {
  return async (dispatch, getState) => {
    const sessionId = CurrentSession(getState());
    const payload = apiThunkHelper(dispatch, getState(), SessionActionTypes.CLOSE_SUBSCRIBER_SESSION, {
      method: 'post',
      url: 'subscriber/CloseSession',
      headers: {
        [SESSION_ID_HEADER]: sessionId
      }
    });

    return dispatch({
      type: SessionActionTypes.CLOSE_SUBSCRIBER_SESSION.SUCCESS,
      payload
    });
  };
};
