import { apiThunkHelper, metadataThunkHelper } from '../utils/thunk.helpers';
import { CreateAsyncFromString } from '../utils/action.creator';
import { PaymentFailureRequestForOfferingInstanceId } from './support.request.selectors';

export const SupportRequestTypes = {
  CreateSupportRequest: CreateAsyncFromString('CREATE_SUPPORT_REQUEST'),
  RetrieveSupportRequest: CreateAsyncFromString('RETRIEVE_SUPPORT_REQUEST'),
  RetrieveSupportRequestTypes: CreateAsyncFromString('RETRIEVE_SUPPORT_REQUEST_TYPES'),
  FutureActivationDate: 'UPDATE_CASE_FUTURE_ACTIVATION_DATE',
  SearchSupportRequest: CreateAsyncFromString('SEARCH_SUPPORT_REQUEST')
};

export const CreateSupportRequest = (options) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SupportRequestTypes.CreateSupportRequest, {
      method: 'post',
      url: 'subscriber/CreateCase'
    }, options);
  };
};

export const RetrieveSupportRequest = (id) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SupportRequestTypes.RetrieveSupportRequest, {
      method: 'post',
      url: 'subscriber/RetrieveCase'
    }, {
      Id: {
        Value: id
      }
    });
  };
};

export const SearchSupportRequest = (options) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SupportRequestTypes.SearchSupportRequest, {
      method: 'post',
      url: 'subscriber/SearchCases'
    }, options);
  };
};

export const RetrieveSupportRequestTypes = () => {
  return (dispatch, getState) => {
    return metadataThunkHelper(dispatch, getState(), SupportRequestTypes.RetrieveSupportRequestTypes, {
      url: 'CaseTypes/'
    });
  };
};

export const OfferingHasPaymentFailureSupportRequest = (offering) => {
  return (dispatch, getState) => {
    return PaymentFailureRequestForOfferingInstanceId(getState(), offering);
  };
};
