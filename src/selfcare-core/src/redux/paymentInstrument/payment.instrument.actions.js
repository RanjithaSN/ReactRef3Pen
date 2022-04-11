import { ACCESSED_SUBSCRIBER_ID_HEADER } from '../../constants/subscriber';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper, stubThunkHelper } from '../utils/thunk.helpers';

export const PaymentInstrumentTypes = {
  CreatePaymentInstrument: CreateAsyncFromString('CREATE_PAYMENT_INSTRUMENT'),
  Create3DS1PaymentInstrument: CreateAsyncFromString('CREATE_3DS1_PAYMENT_INSTRUMENT'),
  RetrievePaymentInstrument: CreateAsyncFromString('RETRIEVE_PAYMENT_INSTRUMENT'),
  UpdatePaymentInstrument: CreateAsyncFromString('UPDATE_PAYMENT_INSTRUMENT'),
  RemovePaymentInstrument: CreateAsyncFromString('REMOVE_PAYMENT_INSTRUMENT'),
  Submit3DS1FinalRequest: CreateAsyncFromString('SUBMIT_3DS_1_FINAL_REQUEST'),
  ValidatePaymentInstrument: CreateAsyncFromString('VALIDATE_PAYMENT_INSTRUMENT')
};

export const CreatePaymentInstrument = (paymentInstrument) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), PaymentInstrumentTypes.CreatePaymentInstrument, {
      method: 'post',
      url: 'Subscriber/CreatePaymentInstrument'
    }, {
      PaymentInstrument: {
        ...paymentInstrument
      }
    });
  };
};

export const RetrievePaymentInstrument = (id, subscriberId) => {
  return (dispatch, getState) => {
    const headers = {};
    if (subscriberId) {
      headers[ACCESSED_SUBSCRIBER_ID_HEADER] = subscriberId;
    }
    return apiThunkHelper(dispatch, getState(), PaymentInstrumentTypes.RetrievePaymentInstrument, {
      method: 'post',
      url: 'subscriber/RetrievePaymentInstrument',
      headers
    }, {
      Id: id
    });
  };
};

export const UpdatePaymentInstrument = (paymentInstrument) => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), PaymentInstrumentTypes.UpdatePaymentInstrument, {
      method: 'post',
      url: 'Subscriber/UpdatePaymentInstrument'
    }, {
      PaymentInstrument: paymentInstrument
    });
  };
};

export const RemovePaymentInstrument = (id) => {
  return (dispatch, getState) => {
    return stubThunkHelper(dispatch, getState(), PaymentInstrumentTypes.RemovePaymentInstrument, {
      method: 'post',
      url: 'Adyen/RemovePaymentInstrument'
    }, {
      Id: id
    });
  };
};
