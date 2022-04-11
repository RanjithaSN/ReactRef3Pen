import i18next from 'i18next';
import * as CreditCardHelper from './credit.card.helper';
import LocaleKeys from '../../../locales/keys';

describe('Credit Card Helper...', () => {
  const creditCardTypes = [
    {
      Name: 'Visa',
      Value: 1
    }
  ];

  describe('When generateCreditCardDescriptor is called...', () => {
    const paymentInstrument = {
      CreditCard: {
        AccountNumber: '123456789',
        Type: 1,
        ExpirationMonth: 1,
        ExpirationYear: 3000
      }
    };

    test('It should use the payment instrument name if one exists.', () => {
      expect(
        CreditCardHelper.generateCreditCardDescriptor(creditCardTypes, {
          ...paymentInstrument,
          Name: 'My Card'
        })
      ).toEqual('My Card');
    });

    test('It should translate descriptor with type and last 4 digits.', () => {
      CreditCardHelper.generateCreditCardDescriptor(creditCardTypes, paymentInstrument);
      expect(i18next.t.mock.calls[0]).toEqual([
        LocaleKeys.PAYMENT_INSTRUMENT.CREDIT_CARD_DESCRIPTOR,
        {
          name: 'Visa',
          lastFour: '6789'
        }
      ]);
    });
  });

  describe('When generateCreditCardExpiration is called...', () => {
    const paymentInstrument = {
      CreditCard: {
        AccountNumber: '123456789',
        Type: 1,
        ExpirationMonth: 1,
        ExpirationYear: 3000
      }
    };

    beforeEach(() => {
      i18next.t.mockClear();
    });

    test('It should translate abbreviated month immediately following expiration month', () => {
      CreditCardHelper.generateCreditCardExpiration(paymentInstrument);
      expect(i18next.t.mock.calls[0]).toEqual([LocaleKeys.DATE.MONTHS_ABBREVIATED[1]]);
    });

    test('It should use future-tense template for non-expired cards.', () => {
      CreditCardHelper.generateCreditCardExpiration(paymentInstrument);
      expect(i18next.t.mock.calls[1]).toEqual([
        LocaleKeys.PAYMENT_INSTRUMENT.EXPIRES_ON_TEMPLATE,
        {
          month: i18next.mockReturn,
          year: 3000
        }
      ]);
    });

    test('It should use past-tense template for expired cards.', () => {
      const expiredPaymentInstrument = {
        CreditCard: {
          AccountNumber: '123456789',
          Type: 1,
          ExpirationMonth: 1,
          ExpirationYear: 2000
        }
      };
      CreditCardHelper.generateCreditCardExpiration(expiredPaymentInstrument);
      expect(i18next.t.mock.calls[1]).toEqual([
        LocaleKeys.PAYMENT_INSTRUMENT.EXPIRED_ON_TEMPLATE,
        {
          month: i18next.mockReturn,
          year: 2000
        }
      ]);
    });
  });

  describe('When getExpirationDate is used...', () => {
    test('It should return September 30, 2018 at 23:59:59.999 when the payment instrument expires in 9/18.', () => {
      const expectedDate = new Date(2018, 8, 30, 23, 59, 59, 999);
      const paymentInstrument = {
        CreditCard: {
          ExpirationMonth: '9',
          ExpirationYear: '2018'
        }
      };
      const expirationDate = CreditCardHelper.getExpirationDate(paymentInstrument);
      expect(expectedDate.toISOString()).toEqual(expirationDate.toISOString());
    });

    test('It should return December 31, 2018 at 23:59:59.999 when the payment instrument expires in 12/18.', () => {
      const expectedDate = new Date(2018, 11, 31, 23, 59, 59, 999);
      const paymentInstrument = {
        CreditCard: {
          ExpirationMonth: '12',
          ExpirationYear: '2018'
        }
      };
      const expirationDate = CreditCardHelper.getExpirationDate(paymentInstrument);
      expect(expectedDate.toISOString()).toEqual(expirationDate.toISOString());
    });
  });

  describe('When isCreditCardExpired is used...', () => {
    test('It should return true if the credit card expired prior to now.', () => {
      const paymentInstrument = {
        CreditCard: {
          ExpirationMonth: '9',
          ExpirationYear: '2011'
        }
      };
      expect(CreditCardHelper.isCreditCardExpired(paymentInstrument)).toBeTruthy();
    });

    test('It should return false if the credit card expires after now.', () => {
      const paymentInstrument = {
        CreditCard: {
          ExpirationMonth: '9',
          ExpirationYear: '2900'
        }
      };
      expect(CreditCardHelper.isCreditCardExpired(paymentInstrument)).toBeFalsy();
    });
  });
});
