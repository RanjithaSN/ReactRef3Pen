import { PAYMENT_INSTRUMENT_TYPES } from '@selfcare/core/constants/payment.instrument.constants';
import is from 'ramda/src/is';
import omit from 'ramda/src/omit';
import Immutable from 'seamless-immutable';
import { PaymentInstrumentFormTypes } from './payment.instrument.form.actions';

const EMPTY_OBJECT = Immutable({});

export const INITIAL_STATE = Immutable({
  billingAddressValues: EMPTY_OBJECT,
  default: false,
  editMode: false,
  paymentInstrument: EMPTY_OBJECT,
  paymentInstrumentType: PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD,
  paymentInstrumentValues: EMPTY_OBJECT,
  savePayment: false,
  selectedBillingAddressId: null,
  useExistingBillingAddress: false,
  useExistingPI: false
});

export default function CreatePaymentInstrumentReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case PaymentInstrumentFormTypes.RESET_PAYMENT_INSTRUMENT_FORM:
    return INITIAL_STATE;
  case PaymentInstrumentFormTypes.INITIALIZE_EDIT_PAYMENT_INSTRUMENT_FORM:
    return state
      .set('paymentInstrumentType', payload.type)
      .set('paymentInstrumentValues', omit(['Cvv'], payload.values))
      .set('selectedBillingAddressId', payload.billingAddressId)
      .set('default', payload.values.Default)
      .set('editMode', true);
  case PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT:
    return state.set('paymentInstrument', payload || EMPTY_OBJECT);
  case PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT_DEFAULT:
    return state.set('default', payload);
  case PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT_OPTIONS:
    return state.set('default', is(Boolean, payload.isDefault) ? payload.isDefault : state.default)
      .set('savePayment', payload.canSave);
  case PaymentInstrumentFormTypes.UPDATE_PAYMENT_INSTRUMENT_VALUES: {
    if (payload) {
      return state
        .set('useExistingPI', (payload && is(String, payload.Id)) ? false : Boolean(payload.Id))
        .set('paymentInstrumentValues', payload);
    }
    return state.set('paymentInstrumentValues', EMPTY_OBJECT);
  }
  default:
    return state;
  }
}
