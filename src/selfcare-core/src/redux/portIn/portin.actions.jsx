import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { tele2ThunkHelper } from '@selfcare/core/redux/utils/thunk.helpers';
import format from 'date-fns/format';

export const PortInRequestTypes = {
  UpdatePortInRequest: CreateAsyncFromString('UPDATE_PORT_IN_REQUEST'),
  CancelPortInRequest: CreateAsyncFromString('CANCEL_PORT_IN_REQUEST')
};

export const UpdatePortInRequest = (caseId, offeringInstanceId, newDate) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), PortInRequestTypes.UpdatePortInRequest, {
      auth: true,
      method: 'post',
      url: 'modifyScheduledDate'
    }, {
      Action: 'Update',
      CaseId: caseId,
      OfferingInstanceId: offeringInstanceId,
      NewDate: format(newDate, 'YYYY-MM-DD')
    });
  };
};

export const CancelPortInRequest = (caseId, offeringInstanceId) => {
  return (dispatch, getState) => {
    return tele2ThunkHelper(dispatch, getState(), PortInRequestTypes.CancelPortInRequest, {
      auth: true,
      method: 'post',
      url: 'modifyScheduledDate'
    }, {
      Action: 'Cancel',
      CaseId: caseId,
      OfferingInstanceId: offeringInstanceId
    });
  };
};
