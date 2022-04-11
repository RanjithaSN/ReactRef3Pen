import LoadingStatus from '@selfcare/core/constants/loading.status';
import { EXTERNAL_PAYMENT, PAYMENT_INSTRUMENT_TYPES } from '@selfcare/core/constants/payment.instrument.constants';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import i18next from 'i18next';
import Immutable from 'seamless-immutable';
import { PaymentMethodFormSchema } from '../../components/paymentInstrument/adyenExternalPaymentMethod/payment.method.form.schema';
import * as CreditCardHelpers from '../../components/paymentInstrument/creditCard/credit.card.helper';
import { CreditCardFormSchema } from '../../components/paymentInstrument/creditCardForm/credit.card.form.schema';
import { INITIAL_STATE } from './payment.instrument.form.reducer';
import * as selectors from './payment.instrument.form.selectors';

jest.mock('../../components/paymentInstrument/creditCard/credit.card.helper');
jest.mock('../../helpers/payment.instrument.helpers');

const initialState = Immutable({
  client: {
    paymentInstrumentForm: INITIAL_STATE
  },
  ascendon: {
    codes: {
      [CODES.CreditCardType]: {
        loadingStatus: LoadingStatus.LOADED,
        items: [{
          Value: 1,
          Name: 'Visa'
        }]
      }
    }
  }
});
const basePath = ['client', 'paymentInstrumentForm'];

describe('CreatePaymentInstrument ', () => {
  describe('Base', () => {
    test('It should return paymentInstrumentForm from the client store.', () => {
      expect(selectors.Base(initialState)).toEqual(INITIAL_STATE);
    });
  });

  describe('BillingAddressValues', () => {
    const billingAddressValues = {
      test: 'address'
    };

    test('It should return billingAddress.', () => {
      const state = initialState.setIn([...basePath, 'billingAddressValues'], billingAddressValues);
      expect(selectors.BillingAddressValues(state)).toEqual(billingAddressValues);
    });
  });

  describe('UseExistingBillingAddress', () => {
    test('It should return useExistingBillingAddress.', () => {
      const state = initialState.setIn([...basePath, 'useExistingBillingAddress'], true);
      expect(selectors.UseExistingBillingAddress(state)).toEqual(true);
    });
  });

  describe('PaymentInstrumentDefault', () => {
    test('It should return default.', () => {
      const state = initialState.setIn([...basePath, 'default'], true);
      expect(selectors.PaymentInstrumentDefault(state)).toBe(true);
    });
  });

  describe('PaymentInstrumentSavePayment', () => {
    test('It should return the value of savePayment flag when one exists.', () => {
      const state = initialState.setIn([...basePath, 'savePayment'], true);
      expect(selectors.PaymentInstrumentSavePayment(state)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(selectors.PaymentInstrumentSavePayment()).toBe(false);
    });
  });

  describe('SelectedBillingAddressId', () => {
    const id = 12345;
    let state;

    beforeEach(() => {
      state = initialState.setIn([...basePath, 'selectedBillingAddressId'], id);
    });

    describe('When useExistingBillingAddress is false', () => {
      test('It should return null.', () => {
        state = state.setIn([...basePath, 'useExistingBillingAddress'], false);
        expect(selectors.SelectedBillingAddressId(state)).toBe(null);
      });
    });

    describe('When useExistingBillingAddress is true', () => {
      test('It should return selectedBillingAddressId.', () => {
        state = state.setIn([...basePath, 'useExistingBillingAddress'], true);
        expect(selectors.SelectedBillingAddressId(state)).toBe(id);
      });
    });
  });

  describe('PaymentInstrumentType', () => {
    test('It should return paymentInstrumentType.', () => {
      const state = initialState.setIn([...basePath, 'paymentInstrumentType'], PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD);
      expect(selectors.PaymentInstrumentType(state)).toEqual(PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD);
    });
  });

  describe('PaymentInstrumentEditMode', () => {
    test('It should return editMode.', () => {
      const state = initialState.setIn([...basePath, 'editMode'], true);
      expect(selectors.PaymentInstrumentEditMode(state)).toBe(true);
    });
  });

  describe('ValidationSchema', () => {
    describe('When paymentInstrumentType is CREDIT_CARD.', () => {
      describe('When useExistingBillingAddress is true.', () => {
        test('It should return the credit card form schema.', () => {
          const state = initialState
            .setIn([...basePath, 'paymentInstrumentType'], PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD)
            .setIn([...basePath, 'useExistingBillingAddress'], true);
          expect(Object.keys(selectors.ValidationSchema(state))).toEqual(Object.keys(CreditCardFormSchema()));
        });
      });

      describe('When useExistingBillingAddress is false.', () => {
        test('It should return the credit card and address form schemas combined.', () => {
          const state = initialState
            .setIn([...basePath, 'paymentInstrumentType'], PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD)
            .setIn([...basePath, 'useExistingBillingAddress'], false);
          expect(Object.keys(selectors.ValidationSchema(state))).toEqual(Object.keys({
            ...CreditCardFormSchema()
          }));
        });
      });
    });

    describe('When paymentInstrumentType is EXTERNAL_PAYMENT.', () => {
      test('It should return the payment method form schema.', () => {
        const state = initialState
          .setIn([...basePath, 'paymentInstrumentType'], PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT);
        expect(Object.keys(selectors.ValidationSchema(state))).toEqual(Object.keys(PaymentMethodFormSchema()));
      });
    });
  });

  describe('PaymentInstrumentValues', () => {
    const paymentInstrumentValues = {
      test: 'instrument'
    };

    test('It should return paymentInstrumentValues.', () => {
      const state = initialState.setIn([...basePath, 'paymentInstrumentValues'], paymentInstrumentValues);
      expect(selectors.PaymentInstrumentValues(state)).toEqual(paymentInstrumentValues);
    });
  });

  describe('SubmittablePaymentInstrument', () => {
    const billingAddressValues = {
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      country: 'country',
      city: 'city',
      id: 333333,
      region: 'region',
      postal_code: 'postal_code'
    };
    const formattedBillingAddress = {
      Name: 'addressLine1',
      LineOne: 'addressLine1',
      LineTwo: 'addressLine2',
      Country: 'country',
      City: 'city',
      State: 'region',
      PostalCode: 'postal_code'
    };

    beforeEach(() => {
      CreditCardHelpers.generateCreditCardDescriptor.mockReturnValue(i18next.mockReturn);
    });

    describe('When paymentInstrumentType is CREDIT_CARD.', () => {
      const paymentInstrumentValues = {
        AccountNumber: 'xxxxxxx1234',
        Type: 1
      };

      test('It should return the formatted credit card payment instrument.', () => {
        const state = initialState
          .setIn([...basePath, 'paymentInstrumentType'], PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD)
          .setIn([...basePath, 'paymentInstrumentValues'], paymentInstrumentValues)
          .setIn([...basePath, 'billingAddressValues'], billingAddressValues)
          .setIn([...basePath, 'default'], true);
        expect(selectors.SubmittablePaymentInstrument(state)).toEqual({
          Type: PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD,
          Name: i18next.mockReturn,
          CreditCard: paymentInstrumentValues,
          BillingAddress: formattedBillingAddress,
          BillingAddressId: undefined,
          SavePayment: false,
          Id: null,
          Default: true
        });
      });
    });

    describe('When paymentInstrumentType is EXTERNAL_PAYMENT.', () => {
      const paymentInstrumentValues = {
        AccountNumber: 'xxxxxxx1234',
        Type: 10108,
        NameOnAccount: 'Checkout Shopper PlaceHolder',
        ExternalBillData: '853571836332138G',
        ExpirationMonth: '03',
        ExpirationYear: '2030'
      };

      test('It should return the formatted external payment instrument.', () => {
        const state = initialState
          .setIn([...basePath, 'paymentInstrumentType'], PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT)
          .setIn([...basePath, 'paymentInstrumentValues'], paymentInstrumentValues)
          .setIn([...basePath, 'default'], true);
        expect(selectors.SubmittablePaymentInstrument(state)).toEqual({
          ExternalBill: {
            AccountNumber: 'xxxxxxx1234',
            Type: 10108,
            NameOnAccount: 'Checkout Shopper PlaceHolder',
            ExternalBillData: '853571836332138G',
            ExpirationMonth: '03',
            ExpirationYear: '2030'
          },
          Default: true
        });
      });
    });

    describe('When creating payment instrument address with existing address', () => {
      describe('And there are addresses', () => {
        test('It should return instrument with BillingAddress', () => {
          const state = initialState
            .setIn(['ascendon', 'subscriberApi', 'address', 'data'], [{
              ...formattedBillingAddress,
              Id: 1
            }])
            .setIn([...basePath, 'paymentInstrumentType'], PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD)
            .setIn([...basePath, 'useExistingBillingAddress'], true)
            .setIn([...basePath, 'selectedBillingAddressId'], 1);
          expect(selectors.SubmittablePaymentInstrument(state).BillingAddress).toEqual({
            ...formattedBillingAddress,
            Id: 1
          });
        });
      });

      describe('And there are no addresses', () => {
        test('It should return instrument with no BillingAddress', () => {
          const state = initialState
            .setIn([...basePath, 'paymentInstrumentType'], PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD)
            .setIn([...basePath, 'useExistingBillingAddress'], true);
          expect(selectors.SubmittablePaymentInstrument(state).BillingAddress).toBeUndefined();
        });
      });
    });

    describe('When EncryptedPaymentInstrument is used.', () => {
      const externalBillerInfo = {
        encryptedCard: 'alksdfjwlkewjoisdflksdjf',
        encryptedMonth: '234wersdf324124',
        encryptedYear: '23434523kssdkflkjvnkkdkiekikkkk'
      };
      const NameOnAccount = 'Checkout Shopper PlaceHolder';

      test('It should return the formatted external payment instrument.', () => {
        const result = selectors.EncryptedPaymentInstrument.resultFunc(false, externalBillerInfo, billingAddressValues, NameOnAccount);

        expect(result.Default).toBe(false);
        expect(result.BillingAddressId).toBe(billingAddressValues.id);
        expect(result.Type).toBe(EXTERNAL_PAYMENT);

        expect(result.ExternalBill.NameOnAccount).toBe(NameOnAccount);
        expect(result.ExternalBill.ExternalBillData).toBe(JSON.stringify({
          ...externalBillerInfo,
          storeDetails: true
        }));
      });
    });
  });
});
