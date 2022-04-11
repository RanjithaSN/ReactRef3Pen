import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { PaymentInstrumentTypes } from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import { ThreeDSTypes } from './threeDS.actions';
import reducer, { INITIAL_STATE } from './threeDS.reducer';

describe('ThreeDS Reducer ', () => {
  describe('When SET_PROCESSING_3DS_PAYMENT_INSTRUMENT action is dispatched...', () => {
    test('It should set the processing3DSPaymentInstrument to true', () => {
      const response = reducer(INITIAL_STATE, {
        type: ThreeDSTypes.SET_PROCESSING_3DS,
        payload: true
      });
      expect(response.processing3DSPaymentInstrument).toEqual(true);
    });

    test('It should set the processing3DSPaymentInstrument to the false', () => {
      const response = reducer(INITIAL_STATE, {
        type: ThreeDSTypes.SET_PROCESSING_3DS,
        payload: false
      });
      expect(response.processing3DSPaymentInstrument).toEqual(false);
    });
  });

  describe('When SET_THREE_DS_1_REDIRECT_URL action is dispatched ...', () => {
    test('It should set the threeDS1RedirectUrl to the payload value', () => {
      const response = reducer(INITIAL_STATE, {
        type: ThreeDSTypes.SET_THREE_DS_1_REDIRECT_URL,
        payload: 'test/url'
      });
      expect(response.threeDS1RedirectUrl).toEqual('test/url');
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched with trigger Create3DS1PaymentInstrument.BEGIN', () => {
    test('It should set 3DS values to null', () => {
      const initState = INITIAL_STATE
        .set('current3DS1MDValue', 'abc')
        .set('current3DS1PaResValue', 'def')
        .set('current3DS1PDValue', 'ghi')
        .set('threeDS1RedirectUrl', 'jkl')
        .set('processing3DSPaymentInstrument', true);

      const response = reducer(initState, {
        type: FaultTypes.API_FAULT,
        requestObject: {},
        payload: {
          trigger: PaymentInstrumentTypes.Create3DS1PaymentInstrument.BEGIN
        }
      });
      expect(response.current3DS1MDValue).toBeNull();
      expect(response.current3DS1PaResValue).toBeNull();
      expect(response.current3DS1PDValue).toBeNull();
      expect(response.threeDS1RedirectUrl).toBeNull();
      expect(response.processing3DSPaymentInstrument).toBe(false);
    });
  });

  describe('When FaultTypes.API_FAULT is dispatched with trigger Submit3DS1FinalRequest.BEGIN', () => {
    test('It should set 3DS values to null', () => {
      const initState = INITIAL_STATE
        .set('current3DS1MDValue', 'abc')
        .set('current3DS1PaResValue', 'def')
        .set('current3DS1PDValue', 'ghi')
        .set('threeDS1RedirectUrl', 'jkl')
        .set('processing3DSPaymentInstrument', true);

      const response = reducer(initState, {
        type: FaultTypes.API_FAULT,
        requestObject: {},
        payload: {
          trigger: PaymentInstrumentTypes.Submit3DS1FinalRequest.BEGIN
        }
      });
      expect(response.current3DS1MDValue).toBeNull();
      expect(response.current3DS1PaResValue).toBeNull();
      expect(response.current3DS1PDValue).toBeNull();
      expect(response.threeDS1RedirectUrl).toBeNull();
      expect(response.processing3DSPaymentInstrument).toBe(false);
    });
  });
});
