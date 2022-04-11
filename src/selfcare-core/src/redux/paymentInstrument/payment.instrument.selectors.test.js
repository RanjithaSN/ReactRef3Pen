import Immutable from 'seamless-immutable';
import uuidv4 from 'uuid/v4';
import { INITIAL_STATE } from './payment.instrument.reducer';
import * as PaymentInstrument from './payment.instrument.selectors';

const initializedStore = new Immutable({
  ascendon: {
    subscriberApi: {
      paymentInstrument: INITIAL_STATE
    }
  }
});

describe('PaymentInstrument ', () => {
  describe('When the PaymentInstrument is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'paymentInstrument', 'data'], DATA);
      expect(PaymentInstrument.PaymentInstruments(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(PaymentInstrument.PaymentInstruments()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(PaymentInstrument.PaymentInstruments.resultFunc({})).toBeNull();
    });
  });

  describe('When the IsCreatingPaymentInstrument is used...', () => {
    test('It should return false when no store is passed in.', () => {
      expect(PaymentInstrument.IsCreatingPaymentInstrument()).toBe(false);
    });

    test('It should return the value of the isCreating flag when one exists.', () => {
      const state = initializedStore.setIn(['ascendon', 'subscriberApi', 'paymentInstrument', 'isCreating'], true);
      expect(PaymentInstrument.IsCreatingPaymentInstrument(state)).toBe(true);
    });
  });

  describe('When the PaymentInstrumentIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'paymentInstrument', 'isLoading'], true);
      expect(PaymentInstrument.PaymentInstrumentIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return the value of the isCreating attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'paymentInstrument', 'isCreating'], true);
      expect(PaymentInstrument.PaymentInstrumentIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(PaymentInstrument.PaymentInstrumentIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(PaymentInstrument.PaymentInstrumentIsLoading({})).toBe(false);
    });
  });

  describe('When the PaymentInstrumentIsUpdating is used...', () => {
    test('It should return the value of the isUpdating attribute when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'paymentInstrument', 'isUpdating'], true);
      expect(PaymentInstrument.PaymentInstrumentIsUpdating(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(PaymentInstrument.PaymentInstrumentIsUpdating()).toBe(false);
    });

    test('It should return false when there is no isUpdating attribute in the store.', () => {
      expect(PaymentInstrument.PaymentInstrumentIsUpdating.resultFunc({})).toBe(false);
    });
  });

  describe('When the PaymentInstrumentsList is used...', () => {
    test('It should return an alphabetized array of their payment instruments if the subscriber has payment instruments loaded.', () => {
      const DATA = {
        1: {
          Id: 1,
          CreditCard: {
            ExpirationMonth: '12',
            ExpirationYear: '2020'
          },
          Name: 'Main Credit Card'
        },
        2: {
          Id: 2,
          Name: 'A Credit Card'
        }
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'paymentInstrument', 'data'], DATA);
      const response = PaymentInstrument.PaymentInstrumentsList(CUSTOM_STATE);

      expect(response.length).toEqual(2);
      expect(response[0]).toEqual(DATA[2]);
      expect(response[1]).toEqual(DATA[1]);
    });

    test('It should return an empty array when there are no payment instruments loaded.', () => {
      expect(PaymentInstrument.PaymentInstrumentsList.resultFunc({})).toEqual(PaymentInstrument.EMPTY_ARRAY);
    });

    test('It should return an empty object when there is no store passed in.', () => {
      expect(PaymentInstrument.PaymentInstrumentsList()).toEqual(PaymentInstrument.EMPTY_ARRAY);
    });
  });

  describe('When the SupportedPaymentInstruments is used...', () => {
    const instruments = [{
      Id: 1,
      Name: 'One',
      Type: 0
    }, {
      Id: 2,
      Name: 'Two',
      Type: 99
    }, {
      Id: 3,
      Name: 'Three',
      Type: 1
    }];

    const { SupportedPaymentInstruments } = PaymentInstrument;

    test('It should return only supported payment instruments', () => {
      expect(SupportedPaymentInstruments.resultFunc(instruments)).toEqual([instruments[0]]);
    });

    test('It should sanely return an empty list when input is empty', () => {
      expect(SupportedPaymentInstruments.resultFunc([])).toEqual([]);
    });
  });

  describe('When the ExistingSupportedPaymentInstruments is used...', () => {
    const instruments = [{
      Id: 1,
      Name: 'One',
      Type: 0
    }, {
      Id: 3,
      Name: 'Three',
      Type: 1
    }, {
      Id: uuidv4().toString(),
      Name: 'Four',
      Type: 1
    }];

    const { ExistingSupportedPaymentInstruments } = PaymentInstrument;

    test('It should return only existing supported payment instruments', () => {
      expect(ExistingSupportedPaymentInstruments.resultFunc(instruments)).toEqual([instruments[0], instruments[1]]);
    });

    test('It should sanely return an empty list when input is empty', () => {
      expect(ExistingSupportedPaymentInstruments.resultFunc([])).toEqual([]);
    });
  });

  describe('When the SupportedCreditCardTypes is used...', () => {
    const types = [{
      Name: 'One',
      Value: '1'
    }, {
      Name: 'Two',
      Value: '2'
    }];

    const { SupportedCreditCardTypes } = PaymentInstrument;

    test('It should return only supported credit card types', () => {
      expect(SupportedCreditCardTypes.resultFunc(types)).toEqual([{
        Name: 'One',
        Value: 1
      }, {
        Name: 'Two',
        Value: 2
      }]);
    });

    test('It should sanely return an empty list when input is empty', () => {
      expect(SupportedCreditCardTypes.resultFunc([])).toEqual([]);
    });
  });

  describe('When DefaultPaymentInstrument is used...', () => {
    test('It should return null if no payment instruments exist.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'paymentInstrument', 'data'], null);
      const response = PaymentInstrument.DefaultPaymentInstrument(CUSTOM_STATE);
      expect(response).toBeNull();
    });
    test('It should return only the PI with the Default flag set to true.', () => {
      const DATA = {
        1: {
          Id: 1,
          CreditCard: {
            ExpirationMonth: '12',
            ExpirationYear: '2020'
          },
          Name: 'Main Credit Card',
          Default: true
        },
        2: {
          Id: 2,
          Name: 'A Credit Card',
          Default: false
        }
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'paymentInstrument', 'data'], DATA);
      const response = PaymentInstrument.DefaultPaymentInstrument(CUSTOM_STATE);

      expect(response).toEqual({
        Id: 1,
        CreditCard: {
          ExpirationMonth: '12',
          ExpirationYear: '2020'
        },
        Name: 'Main Credit Card',
        Default: true
      });
    });
  });
});
