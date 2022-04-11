import MasterCardLogo from '../creditCard/logos/mastercard.png';
import VisaLogo from '../creditCard/logos/visa.png';
import * as PaymentMethodHelper from './payment.method.helper';

const mockData = {
  MASTERCARD_NAME: 'mc-1111',
  VISA_NAME: 'visa-1111',
  RANDOM_NAME: 'visamc1111',
  MASTERCARD: 'Mastercard',
  VISA: 'Visa',
  EMPTY: ''
};

describe('PaymentMethodHelpers', () => {
  describe('getPaymentCardLogo', () => {
    test('Should get mastercard logo', () => {
      const paymentInstrument = {
        Name: mockData.MASTERCARD_NAME
      };
      const result = PaymentMethodHelper.getPaymentCardLogo(paymentInstrument);
      expect(result).toBe(MasterCardLogo);
    });

    test('Should get visa logo', () => {
      const paymentInstrument = {
        Name: mockData.VISA_NAME
      };
      const result = PaymentMethodHelper.getPaymentCardLogo(paymentInstrument);
      expect(result).toBe(VisaLogo);
    });

    test('Should return empty string', () => {
      const paymentInstrument = {
        Name: mockData.RANDOM_NAME
      };
      const result = PaymentMethodHelper.getPaymentCardLogo(paymentInstrument);
      expect(result).toBe(mockData.EMPTY);
    });
  });
  describe('getCardType', () => {
    test('Should get mastercard type', () => {
      const paymentInstrument = {
        Name: mockData.MASTERCARD_NAME
      };
      const result = PaymentMethodHelper.getCardType(paymentInstrument);
      expect(result).toBe(mockData.MASTERCARD);
    });

    test('Should get visa card type', () => {
      const paymentInstrument = {
        Name: mockData.VISA_NAME
      };
      const result = PaymentMethodHelper.getCardType(paymentInstrument);
      expect(result).toBe(mockData.VISA);
    });

    test('Should return empty string', () => {
      const paymentInstrument = {
        Name: mockData.RANDOM_NAME
      };
      const result = PaymentMethodHelper.getCardType(paymentInstrument);
      expect(result).toBe(mockData.EMPTY);
    });
  });
});
