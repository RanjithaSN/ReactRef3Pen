import { transactionEventFromOrder } from '@selfcare/core/analytics/transaction.analytics';
import { dataLayerPush } from '@selfcare/core/analytics/analytics.helper';
import { PaymentInstrumentTypes } from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import { SubmitOrderTypes } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import { apiThunkHelper } from '@selfcare/core/redux/utils/thunk.helpers';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { ADYEN_DEVICE_TYPE } from '../../constants/payment.instrument.constants';
import { SavedShoppingCartWithDownPayments } from '../cart/cart.selectors';
import { ThreeDSPaymentInstrumentFinalRequest } from '../paymentInstrument/payment.instrument.form.selectors';
import { read as localStorageRead, remove as localStorageRemove } from '@selfcare/core/helpers/storage/local.storage';
import { MAKE_CARD_DEFAULT } from '@selfcare/core/redux/utils/api.constants';

export const ThreeDSTypes = {
  CLEAR_THREE_DS_1_VALUES: 'CLEAR_THREE_DS_1_VALUES',
  SET_PROCESSING_3DS: 'SET_PROCESSING_3DS_PAYMENT_INSTRUMENT',
  SET_THREE_DS_1_VALUES: 'SET_THREE_DS_1_VALUES',
  SET_THREE_DS_1_REDIRECT_URL: 'SET_THREE_DS_1_REDIRECT_URL'
};

export const Set3DS1Values = (values) => ({
  type: ThreeDSTypes.SET_THREE_DS_1_VALUES,
  payload: values
});

export const SetProcessing3DS = (value) => ({
  type: ThreeDSTypes.SET_PROCESSING_3DS,
  payload: value
});

export const Set3DS1RedirectUrl = (value) => ({
  type: ThreeDSTypes.SET_THREE_DS_1_REDIRECT_URL,
  payload: value
});

export const Clear3DS1Values = () => ({
  type: ThreeDSTypes.CLEAR_THREE_DS_1_VALUES
});

const submit3DS1FormPost = (redirectPath, params) => {
  const form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', redirectPath);

  // Move the submit function to another variable
  // so that it doesn't get overwritten.
  form.submit_function = form.submit;

  const paramKeyArray = Object.keys(params);
  paramKeyArray.forEach((key) => {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', params[key]);

    form.appendChild(hiddenField);
  });

  document.body.appendChild(form);
  form.submit_function();
};

export const Create3DS1PaymentInstrumentSecondRequest = (responseOne) => {
  return (dispatch) => {
    const threeDSData = JSON.parse(responseOne.Fault.ContextData.find((cd) => (cd.Key === 'MerchantData')).Value);
    const redirectPath = responseOne.Fault.ContextData.find((cd) => (cd.Key === 'PaymentCompletionURL')).Value;
    const callbackUrl = responseOne.Fault.ContextData.find((cd) => (cd.Key === 'PaymentVerificationCallbackURL')).Value;
    const PD = path(['Action', 'paymentData'], threeDSData);
    const MD = threeDSData.Action.data.find((obj) => (obj.Key === 'MD')).Value;
    const PaReq = threeDSData.Action.data.find((obj) => (obj.Key === 'PaReq')).Value;
    const secondRequestParams = {
      MD,
      PaReq,
      TermUrl: callbackUrl
    };
    dispatch(Set3DS1Values({
      PD,
      MD
    }));
    submit3DS1FormPost(redirectPath, secondRequestParams);
  };
};

export const Create3DS1PaymentInstrument = (paymentInstrument) => {
  return async (dispatch, getState) => {
    const headers = {
      'CD-DeviceType': ADYEN_DEVICE_TYPE.WEB
    };
    const responseOne = await apiThunkHelper(dispatch, getState(), PaymentInstrumentTypes.Create3DS1PaymentInstrument, {
      method: 'post',
      url: 'Subscriber/CreatePaymentInstrument',
      headers
    }, {
      ...paymentInstrument
    });

    return responseOne;
  };
};

export const Submit3DS1FinalRequest = (requestValues) => {
  return async (dispatch, getState) => {
    const headers = {
      'CD-DeviceType': ADYEN_DEVICE_TYPE.WEB
    };
    dispatch(Set3DS1Values(requestValues));
    const payload = ThreeDSPaymentInstrumentFinalRequest(getState());
    const isCardMarkedDefault = localStorageRead(MAKE_CARD_DEFAULT);

    if (isCardMarkedDefault) {
      payload.PaymentInstrument.Default = true;
      localStorageRemove(MAKE_CARD_DEFAULT);
    }

    const response = await apiThunkHelper(dispatch, getState(), PaymentInstrumentTypes.Submit3DS1FinalRequest, {
      method: 'post',
      url: 'Subscriber/CreatePaymentInstrument',
      headers
    }, {
      ...payload
    });

    dispatch(Clear3DS1Values());
    return response;
  };
};

export const Submit3DS1OrderFinalRequest = (requestValues) => {
  return async (dispatch, getState) => {
    const createPIResponse = await dispatch(Submit3DS1FinalRequest(requestValues));
    const shoppingCart = SavedShoppingCartWithDownPayments(getState());
    const response = await apiThunkHelper(dispatch, getState(), SubmitOrderTypes.SUBMIT_3DS1_ORDER_FINAL_REQUEST, {
      method: 'post',
      url: 'Subscriber/SubmitOrder',
      data: {
        UseDefaults: true,
        ShoppingCart: shoppingCart,
        PaymentInstruments: [{
          Id: pathOr(null, ['PaymentInstrument', 'Id'], createPIResponse)
        }]
      }
    });

    if (response && response.Order) {
      try {
        const transactionEvent = transactionEventFromOrder(response.Order);
        dataLayerPush(transactionEvent);
      } catch (err) {
        console.error(err);
      }
    }

    return response;
  };
};
