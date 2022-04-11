import Immutable from 'seamless-immutable';
import { PaymentInstrumentFormTypes } from './payment.instrument.form.actions';
import reducer, { INITIAL_STATE } from './payment.instrument.form.reducer';

describe('CreatePaymentInstrumentReducer', () => {
  describe('When RESET_PAYMENT_INSTRUMENT_FORM is dispatched', () => {
    test('It should reset the store to it\'s initial state.', () => {
      const state = reducer(Immutable({
        prop: 'val'
      }), {
        type: PaymentInstrumentFormTypes.RESET_PAYMENT_INSTRUMENT_FORM
      });
      expect(state).toEqual(INITIAL_STATE);
    });
  });

  describe('When INITIALIZE_EDIT_PAYMENT_INSTRUMENT_FORM is dispatched', () => {
    let state;
    const type = 1;
    const billingAddressId = 123;
    const values = {
      field: 'value',
      Cvv: '123'
    };

    beforeEach(() => {
      state = reducer(INITIAL_STATE, {
        type: PaymentInstrumentFormTypes.INITIALIZE_EDIT_PAYMENT_INSTRUMENT_FORM,
        payload: {
          type,
          billingAddressId,
          values
        }
      });
    });

    test('It should set paymentInstrumentType to payload.type', () => {
      expect(state.paymentInstrumentType).toBe(type);
    });

    test('It should set paymentInstrumentValues to payload.values, omitting Cvv', () => {
      expect(state.paymentInstrumentValues).toEqual({
        field: 'value'
      });
    });

    test('It should set selectedBillingAddressId to payload.billingAddressId', () => {
      expect(state.selectedBillingAddressId).toBe(billingAddressId);
    });

    test('It should set editMode to true.', () => {
      expect(state.editMode).toBe(true);
    });
  });

  describe('When SET_PAYMENT_INSTRUMENT is dispatched', () => {
    const paymentInstrument = {
      Id: 927759,
      Name: 'visa-1111',
      Type: 4,
      TypeName: 'ExternalBill'
    };
    const EMPTY_OBJECT = Immutable({});

    test('It should set paymentInstrument to an empty object if payload is falsy.', () => {
      const state = reducer(INITIAL_STATE, {
        type: PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT,
        payload: undefined
      });
      expect(state.paymentInstrument).toEqual(EMPTY_OBJECT);
    });

    test('It should set paymentInstrument to the payload.', () => {
      const state = reducer(INITIAL_STATE, {
        type: PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT,
        payload: paymentInstrument
      });
      expect(state.paymentInstrument).toEqual(paymentInstrument);
    });
  });

  describe('When SET_PAYMENT_INSTRUMENT_DEFAULT is dispatched', () => {
    test('It should set default to the payload.', () => {
      const state = reducer(INITIAL_STATE, {
        type: PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT_DEFAULT,
        payload: true
      });
      expect(state.default).toBe(true);
    });
  });

  describe('When SET_PAYMENT_INSTRUMENT_OPTIONS is dispatched', () => {
    let state;

    describe('And isDefault is a boolean', () => {
      beforeEach(() => {
        state = reducer(INITIAL_STATE, {
          type: PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT_OPTIONS,
          payload: {
            isDefault: true,
            canSave: true
          }
        });
      });

      it('Should set default', () => {
        expect(state.default).toBe(true);
      });

      it('Should set savePayment', () => {
        expect(state.savePayment).toBe(true);
      });
    });

    describe('And isDefault is not a boolean', () => {
      const updatedState = Immutable({
        ...INITIAL_STATE,
        default: true
      });

      beforeEach(() => {
        state = reducer(updatedState, {
          type: PaymentInstrumentFormTypes.SET_PAYMENT_INSTRUMENT_OPTIONS,
          payload: {
            isDefault: null,
            canSave: true
          }
        });
      });

      it('Should keep default\'s original state', () => {
        expect(state.default).toBe(updatedState.default);
      });

      it('Should set savePayment', () => {
        expect(state.savePayment).toBe(true);
      });
    });
  });

  describe('When UPDATE_PAYMENT_INSTRUMENT_VALUES is dispatched', () => {
    test('It should set paymentInstrumentValues to the payload.', () => {
      const paymentInstrumentValues = {
        test: 'instrument'
      };
      const state = reducer(INITIAL_STATE, {
        type: PaymentInstrumentFormTypes.UPDATE_PAYMENT_INSTRUMENT_VALUES,
        payload: paymentInstrumentValues
      });
      expect(state.paymentInstrumentValues).toEqual(paymentInstrumentValues);
      expect(state.useExistingPI).toBe(false);
    });
    test('It should set useExistingPI to true if Id exists on the PI Values.', () => {
      const paymentInstrumentValues = {
        Id: 1,
        test: 'instrument'
      };
      const state = reducer(INITIAL_STATE, {
        type: PaymentInstrumentFormTypes.UPDATE_PAYMENT_INSTRUMENT_VALUES,
        payload: paymentInstrumentValues
      });
      expect(state.paymentInstrumentValues).toEqual(paymentInstrumentValues);
      expect(state.useExistingPI).toBe(true);
    });
  });
});
