import { PaymentInstrumentTypes } from '../paymentInstrument/payment.instrument.actions';
import reducer, { INITIAL_STATE } from './address.reducer';
import { AddressActionTypes } from './address.actions';
import { FaultTypes } from '../fault/fault.actions';

describe('Address Reducer', () => {
  test('When RETRIEVE_ADDRESSES.BEGIN is dispatched the loading state should be updated', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: AddressActionTypes.RETRIEVE_ADDRESSES.BEGIN
      }
    );

    expect(state.isLoading).toBe(true);
    expect(state.isLoaded).toBe(false);
  });

  [
    AddressActionTypes.RETRIEVE_ADDRESSES.SUCCESS
  ].forEach((type) => {
    test(`When ${type} is dispatched the loading state should be loaded`, () => {
      const setup = INITIAL_STATE.merge({
        isLoading: true,
        isLoaded: false
      });
      const payload = {
        Addresses: [
          {
            postal_code: '12345'
          }
        ]
      };
      const state = reducer(
        setup,
        {
          payload,
          type
        }
      );

      expect(state.data).toEqual(payload.Addresses);
      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
    });
  });

  [
    PaymentInstrumentTypes.CreatePaymentInstrument.SUCCESS,
    PaymentInstrumentTypes.UpdatePaymentInstrument.SUCCESS
  ].forEach((type) => {
    describe(`When ${type} is dispatched`, () => {
      const initState = INITIAL_STATE.set('data', [{
        Id: 1
      }]);

      test('It should return unchanged state when PaymentInstrument.BillingAddress is undefined.', () => {
        const state = reducer(initState, {
          type,
          payload: {}
        });
        expect(state).toEqual(initState);
      });

      test('It should return unchanged state when PaymentInstrument.BillingAddress exists.', () => {
        const state = reducer(initState, {
          type,
          payload: {
            PaymentInstrument: {
              BillingAddress: {
                Id: 1
              }
            }
          }
        });
        expect(state).toEqual(initState);
      });

      test('It should add new PaymentInstrument.BillingAddress to the list.', () => {
        const state = reducer(initState, {
          type,
          payload: {
            PaymentInstrument: {
              BillingAddress: {
                Id: 2
              }
            }
          }
        });
        expect(state.data).toEqual([{
          Id: 1
        }, {
          Id: 2
        }]);
      });
    });
  });

  [
    AddressActionTypes.RETRIEVE_ADDRESSES.BEGIN
  ].forEach((trigger) => {
    test(`When ${trigger} api fault is received the state should update`, () => {
      const setup = INITIAL_STATE.merge({
        isLoading: true,
        isLoaded: false
      });
      const state = reducer(
        setup,
        {
          payload: {
            trigger
          },
          type: FaultTypes.API_FAULT
        }
      );

      expect(state.isLoading).toBe(false);
      expect(state.isLoaded).toBe(true);
    });
  });
});
