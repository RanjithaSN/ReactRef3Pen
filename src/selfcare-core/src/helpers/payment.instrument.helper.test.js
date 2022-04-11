import { PAYMENT_INSTRUMENT_TYPES } from '../constants/payment.instrument.constants';
import * as PaymentInstrumentHelper from './payment.instrument.helper';

jest.mock('./payment.instrument.helper.js');

describe('PaymentInstrumentHelpers', () => {
  describe('isPaymentMethodExpired', () => {
    describe('When payment instrument is credit card', () => {
      test('It should return the result of isPaymentMethodExpired.', () => {
        PaymentInstrumentHelper.isPaymentMethodExpired.mockReturnValue(true);
        const paymentInstrument = {
          Type: PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD
        };
        const result = PaymentInstrumentHelper.isPaymentMethodExpired(paymentInstrument);

        expect(PaymentInstrumentHelper.isPaymentMethodExpired).toHaveBeenCalledWith(paymentInstrument);
        expect(result).toBe(true);
      });
    });
  });
});
