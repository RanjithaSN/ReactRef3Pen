import * as LocalStorageHelper from '@selfcare/core/helpers/storage/local.storage';
import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { PaymentInstrumentTypes } from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import { THREE_DS_1_MD, THREE_DS_1_PARES, THREE_DS_1_PAYMENT_DATA, THREE_DS_1_PROCESSING } from '@selfcare/core/redux/utils/api.constants';
import Immutable from 'seamless-immutable';
import { ThreeDSTypes } from './threeDS.actions';

export const INITIAL_STATE = Immutable({
  current3DS1MDValue: LocalStorageHelper.read(THREE_DS_1_MD) || null,
  current3DS1PaResValue: LocalStorageHelper.read(THREE_DS_1_PARES) || null,
  current3DS1PDValue: LocalStorageHelper.read(THREE_DS_1_PAYMENT_DATA) || null,
  threeDS1RedirectUrl: null,
  processing3DSPaymentInstrument: LocalStorageHelper.read(THREE_DS_1_PROCESSING) || false
});

export default function ThreeDSReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case ThreeDSTypes.CLEAR_THREE_DS_1_VALUES:
    return state
      .set('current3DS1MDValue', null)
      .set('current3DS1PaResValue', null)
      .set('current3DS1PDValue', null)
      .set('threeDS1RedirectUrl', null)
      .set('processing3DSPaymentInstrument', false);
  case ThreeDSTypes.SET_THREE_DS_1_VALUES:
    return state
      .set('current3DS1MDValue', payload.MD ? payload.MD : state.current3DS1MDValue)
      .set('current3DS1PaResValue', payload.PaRes ? payload.PaRes : state.current3DS1PaResValue)
      .set('current3DS1PDValue', payload.PD ? payload.PD : state.current3DS1PDValue);
  case ThreeDSTypes.SET_PROCESSING_3DS:
    return state.set('processing3DSPaymentInstrument', payload);
  case ThreeDSTypes.SET_THREE_DS_1_REDIRECT_URL:
    return state.set('threeDS1RedirectUrl', payload);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case PaymentInstrumentTypes.Create3DS1PaymentInstrument.BEGIN:
    case PaymentInstrumentTypes.Submit3DS1FinalRequest.BEGIN:
      return state
        .set('current3DS1MDValue', null)
        .set('current3DS1PaResValue', null)
        .set('current3DS1PDValue', null)
        .set('threeDS1RedirectUrl', null)
        .set('processing3DSPaymentInstrument', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
