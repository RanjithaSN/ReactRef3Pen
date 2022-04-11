import { PAYMENT_INSTRUMENT_TYPES } from '@selfcare/core/constants/payment.instrument.constants';
import i18next from 'i18next';
import * as CreditCardHelpers from '../components/paymentInstrument/creditCard/credit.card.helper';
import * as helpers from './payment.instrument.helpers';

jest.mock('../components/paymentInstrument/creditCard/credit.card.helper');

describe('PaymentInstrumentHelpers', () => {
  describe('isExpired', () => {
    describe('When payment instrument is credit card', () => {
      test('It should return the result of isCreditCardExpired.', () => {
        CreditCardHelpers.isCreditCardExpired.mockReturnValue(true);
        const paymentInstrument = {
          Type: PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD
        };
        const result = helpers.isExpired(paymentInstrument);

        expect(CreditCardHelpers.isCreditCardExpired).toHaveBeenCalledWith(paymentInstrument);
        expect(result).toBe(true);
      });
    });
  });

  describe('generateDescriptor', () => {
    describe('When payment instrument is credit card', () => {
      test('It should return the result of generateCreditCardDescriptor', () => {
        CreditCardHelpers.generateCreditCardDescriptor.mockReturnValue(i18next.mockReturn);
        const paymentInstrument = {
          Type: PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD
        };
        expect(helpers.generateDescriptor(paymentInstrument)).toEqual(i18next.mockReturn);
      });
    });

    describe('When payment instrument is unmatched type', () => {
      test('It should return paymentInstrument.Name', () => {
        const paymentInstrument = {
          Type: 9999,
          Name: 'Name'
        };
        expect(helpers.generateDescriptor(paymentInstrument)).toEqual(paymentInstrument.Name);
      });
    });
  });
});
