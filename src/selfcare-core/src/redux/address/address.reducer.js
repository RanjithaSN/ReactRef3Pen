import path from 'ramda/src/path';
import Immutable from 'seamless-immutable';
import { FaultTypes } from '../fault/fault.actions';
import { PaymentInstrumentTypes } from '../paymentInstrument/payment.instrument.actions';
import { AddressActionTypes } from './address.actions';

export const INITIAL_STATE = new Immutable({
  data: [],
  isLoading: false,
  isLoaded: false
});

export default (state = INITIAL_STATE, { payload = {}, type }) => {
  switch (type) {
  case AddressActionTypes.RETRIEVE_ADDRESSES.BEGIN:
    return state
      .set('isLoading', true)
      .set('isLoaded', false);
  case AddressActionTypes.RETRIEVE_ADDRESSES.SUCCESS:
    return state
      .set('data', payload.Addresses)
      .set('isLoading', false)
      .set('isLoaded', true);

  case PaymentInstrumentTypes.CreatePaymentInstrument.SUCCESS:
  case PaymentInstrumentTypes.UpdatePaymentInstrument.SUCCESS:
    return state
      .update('data', (addresses) => {
        const billingAddress = path(['PaymentInstrument', 'BillingAddress'], payload);
        if (!billingAddress || addresses.some((address) => address.Id === billingAddress.Id)) {
          return addresses;
        }
        return addresses.concat(Immutable([billingAddress]));
      });

  case FaultTypes.API_FAULT:
    switch (payload.trigger) {
    case AddressActionTypes.RETRIEVE_ADDRESSES.BEGIN:
    case AddressActionTypes.REMOVE_ADDRESS.BEGIN:
      return state
        .set('isLoaded', true)
        .set('isLoading', false);
    default:
      return state;
    }
  default:
    return state;
  }
};
