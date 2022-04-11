import curry from 'ramda/src/curry';
import pathOr from 'ramda/src/pathOr';
import pipe from 'ramda/src/pipe';
import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { PaymentInstrumentTypes } from './payment.instrument.actions';

export const INITIAL_STATE = new Immutable({
  data: {},
  removing: {},
  isCreating: false,
  isValidating: false,
  isLoading: false,
  isUpdating: false,
  pendingRequests: 0
});

const clearDefault = curry((payload, instruments) => {
  if (!payload.PaymentInstrument.Default) {
    return instruments;
  }

  const prevDefault = Object.values(instruments).find((instrument) => instrument.Default);
  return prevDefault ?
    instruments.setIn([prevDefault.Id, 'Default'], false) :
    instruments;
});

const clearAccounts = curry((payload, instruments) => {
  const accounts = pathOr([], ['PaymentInstrument', 'ConvergentBillerPaymentInstrumentAccounts'], payload);
  if (!accounts.length) {
    return instruments;
  }

  const accountNumbers = accounts.map((account) => account.AccountNumber);
  return Object.values(instruments).reduce((acc, instrument) => {
    return acc.setIn(
      [instrument.Id, 'ConvergentBillerPaymentInstrumentAccounts'],
      instrument.ConvergentBillerPaymentInstrumentAccounts.filter((account) => !accountNumbers.includes(account.AccountNumber))
    );
  }, instruments);
});

const updatePaymentInstruments = curry((payload, instruments) => {
  return pipe(clearDefault(payload), clearAccounts(payload))(instruments)
    .set(payload.PaymentInstrument.Id, payload.PaymentInstrument);
});

export default function PaymentInstrumentReducer(state = INITIAL_STATE, { payload = {}, type, requestObject }) {
  switch (type) {
  case PaymentInstrumentTypes.CreatePaymentInstrument.BEGIN:
  case PaymentInstrumentTypes.Create3DS1PaymentInstrument.BEGIN:
  case PaymentInstrumentTypes.Submit3DS1FinalRequest.BEGIN:
    return state
      .set('isCreating', true)
      .set('data', INITIAL_STATE.data);
  case PaymentInstrumentTypes.CreatePaymentInstrument.SUCCESS:
  case PaymentInstrumentTypes.Submit3DS1FinalRequest.SUCCESS:
  case PaymentInstrumentTypes.Create3DS1PaymentInstrument.SUCCESS:
    return state
      .set('isCreating', false)
      .update('data', updatePaymentInstruments(payload));
  case PaymentInstrumentTypes.RetrievePaymentInstrument.BEGIN:
    return state
      .set('pendingRequests', state.pendingRequests + 1)
      .set('isLoading', true);
  case PaymentInstrumentTypes.RetrievePaymentInstrument.SUCCESS:
    return state
      .update('pendingRequests', (count) => count - 1)
      .setIn(['data', [payload.PaymentInstrument.Id]], payload.PaymentInstrument)
      .set('isLoading', (state.pendingRequests - 1) > 0);
  case PaymentInstrumentTypes.UpdatePaymentInstrument.BEGIN:
    return state.set('isUpdating', true);
  case PaymentInstrumentTypes.UpdatePaymentInstrument.SUCCESS:
    return state
      .set('isUpdating', false)
      .update('data', updatePaymentInstruments(payload));
  case PaymentInstrumentTypes.RemovePaymentInstrument.BEGIN:
    return state.setIn(['removing', requestObject.Id], true);
  case PaymentInstrumentTypes.RemovePaymentInstrument.SUCCESS:
    return state
      .setIn(['removing', requestObject.Id], false)
      .update('data', (instruments) => instruments.without(requestObject.Id));
  case PaymentInstrumentTypes.ValidatePaymentInstrument.BEGIN:
    return state.set('isValidating', true);
  case PaymentInstrumentTypes.ValidatePaymentInstrument.SUCCESS:
    return state.set('isValidating', false);
  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case PaymentInstrumentTypes.CreatePaymentInstrument.BEGIN:
    case PaymentInstrumentTypes.Create3DS1PaymentInstrument.BEGIN:
    case PaymentInstrumentTypes.Submit3DS1FinalRequest.BEGIN:
      return state.set('isCreating', false);
    case PaymentInstrumentTypes.RetrievePaymentInstrument.BEGIN:
      return state
        .update('pendingRequests', (count) => count - 1)
        .set('isLoading', (state.pendingRequests - 1) > 0);
    case PaymentInstrumentTypes.UpdatePaymentInstrument.BEGIN:
      return state.set('isUpdating', false);
    case PaymentInstrumentTypes.RemovePaymentInstrument.BEGIN:
      return state.setIn(['removing', requestObject.Id], false);
    case PaymentInstrumentTypes.ValidatePaymentInstrument.BEGIN:
      return state.set('isValidating', false);
    default:
      return state;
    }
  default:
    return state;
  }
}
