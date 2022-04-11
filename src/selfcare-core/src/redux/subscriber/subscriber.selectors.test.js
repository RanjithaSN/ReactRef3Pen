import { FallbackCurrencyLocale } from '@selfcare/core/constants/transaction.constants';
import Immutable from 'seamless-immutable';
import LOADING_STATUS from '../../constants/loading.status';
import { SSN_EXTERNAL_REFERENCE } from './subscriber.constants';
import { INITIAL_STATE } from './subscriber.reducer';
import * as Subscriber from './subscriber.selectors';

const initializedStore = new Immutable({}).setIn(['ascendon', 'subscriberApi', 'subscriber'], INITIAL_STATE);
const EMPTY_ARRAY = [];

describe('Subscriber ', () => {
  describe('When the Subscriber is used...', () => {
    test('It should return the value of the Subscriber attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], DATA);
      expect(Subscriber.Subscriber(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Subscriber.Subscriber()).toBeNull();
    });

    test('It should return null when there is no Subscriber attribute in the store.', () => {
      expect(Subscriber.Subscriber.resultFunc({})).toBeNull();
    });
  });

  describe('When the SubscriberData is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data'], DATA);
      expect(Subscriber.SubscriberData(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Subscriber.SubscriberData()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(Subscriber.SubscriberData.resultFunc({})).toBeNull();
    });
  });

  describe('When the SubscriberIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      expect(Subscriber.SubscriberIsLoading.resultFunc({
        isLoading: true
      })).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(Subscriber.SubscriberIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(Subscriber.SubscriberIsLoading.resultFunc({})).toBe(false);
    });
  });

  describe('When the SubscriberIsLoaded is used...', () => {
    test('It should return true if is loaded is true.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'isLoaded'], true);
      expect(Subscriber.SubscriberIsLoaded(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when there is no data.', () => {
      expect(Subscriber.SubscriberIsLoaded(initializedStore)).toBe(false);
    });

    test('It should return false when we are loading.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'isLoading'], true);
      expect(Subscriber.SubscriberIsLoaded(CUSTOM_STATE)).toBe(false);
    });
  });

  describe('When the SubscriberCurrency is used...', () => {
    test('It should return the SubscriberCurrency attribute on the subscriber when one exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], {
        SubscriberCurrency: 'JPY'
      });

      expect(Subscriber.SubscriberCurrency(CUSTOM_STATE)).toEqual('JPY');
    });

    test('It should return FallbackCurrencyLocale when there is no subscriber data.', () => {
      expect(Subscriber.SubscriberCurrency(initializedStore)).toEqual(FallbackCurrencyLocale);
    });

    test('It should return FallbackCurrencyLocale when the subscriber has no SubscriberCurrency attribute.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], {
        id: 1
      });

      expect(Subscriber.SubscriberCurrency(CUSTOM_STATE)).toEqual(FallbackCurrencyLocale);
    });
  });

  describe('When the Subscriber name selectors are used...', () => {
    test('SubscriberFirstName should fallback to empty string', () => {
      expect(Subscriber.SubscriberFirstName(initializedStore)).toEqual('');
    });

    test('SubscriberFirstName should return the FirstName field', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], {
        FirstName: 'John'
      });
      expect(Subscriber.SubscriberFirstName(CUSTOM_STATE)).toEqual('John');
    });

    test('SubscriberLastName should fallback to empty string', () => {
      expect(Subscriber.SubscriberLastName(initializedStore)).toEqual('');
    });

    test('SubscriberLastName should return the LastName field', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], {
        LastName: 'Doe'
      });
      expect(Subscriber.SubscriberLastName(CUSTOM_STATE)).toEqual('Doe');
    });

    test('SubscriberFullName should fallback to empty string', () => {
      expect(Subscriber.SubscriberFullName(initializedStore)).toEqual('');
    });

    test('SubscriberFullName should return the first and last name', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], {
        FirstName: 'John',
        LastName: 'Doe'
      });
      expect(Subscriber.SubscriberFullName(CUSTOM_STATE)).toEqual('John Doe');
    });
  });

  describe('When the Subscriber Mobile Phone selector is used...', () => {
    test('SubscriberDisplayMobilePhone should fallback to empty string', () => {
      expect(Subscriber.SubscriberDisplayMobilePhone.resultFunc()).toEqual('');
    });

    test('SubscriberDisplayMobilePhone should return formatted phone number', () => {
      expect(Subscriber.SubscriberDisplayMobilePhone.resultFunc({
        MobilePhone: '467665544'
      })).toEqual('07665544');
    });
  });

  describe('When the ShouldCaptureEmailAsLogin is used...', () => {
    it('should return false when the codes have not been loaded', () => {
      expect(Subscriber.ShouldCaptureEmailAsLogin.resultFunc(false, null)).toEqual(false);
    });

    it('should return true when the capture_email_as_login is set to True', () => {
      const TEST_STORE = initializedStore.setIn([
        'ascendon', 'metadata', 'codes', 166
      ], {
        status: LOADING_STATUS.LOADED,
        items: [{
          Global: false,
          AdditionalProperties: {
            capture_email_as_login: 'True'
          }
        }]
      });
      expect(Subscriber.ShouldCaptureEmailAsLogin(TEST_STORE)).toEqual(true);
    });

    it('should return false when the capture_email_as_login is set to False', () => {
      const TEST_STORE = initializedStore.setIn([
        'ascendon',
        'codes',
        166
      ], {
        isLoaded: true,
        items: [{
          Global: false,
          AdditionalProperties: {
            capture_email_as_login: 'False'
          }
        }]
      });
      expect(Subscriber.ShouldCaptureEmailAsLogin(TEST_STORE)).toEqual(false);
    });
  });

  describe('When the SubscriberIsUpdating is used...', () => {
    test('It should return true if is loaded is true.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'isUpdating'], true);
      expect(Subscriber.SubscriberIsUpdating(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when there is no data.', () => {
      expect(Subscriber.SubscriberIsUpdating(initializedStore)).toBe(false);
    });
  });
  describe('When the contact method selectors are used...', () => {
    const CONTACT_MAPPINGS = [
      {
        AdditionalProperties: {
          contact_method_code: '1',
          contact_event_type_code: '1'
        }
      }, {
        AdditionalProperties: {
          contact_method_code: '44',
          contact_event_type_code: '3'
        }
      }, {
        AdditionalProperties: {
          contact_method_code: '5',
          contact_event_type_code: '4'
        }
      }
    ];
    const CONTACT_METHODS = [
      {
        Value: '1',
        Name: 'Email'
      }, {
        Value: '0',
        Name: 'Non-Spec'
      }, {
        Value: '44',
        Name: 'In-App'
      }, {
        Value: '5',
        Name: 'SMS'
      }
    ];
    const FILTERED_METHODS = {
      1: {
        Value: '1',
        Name: 'Email'
      },
      0: {
        Value: '0',
        Name: 'Non-Spec'
      },
      44: {
        Value: '44',
        Name: 'In-App'
      },
      5: {
        Value: '5',
        Name: 'SMS'
      }
    };

    const FORMATED_METHODS = {
      1: {
        Value: '1',
        Name: 'Email',
        eventTypeCode: '1'
      },
      44: {
        Value: '44',
        Name: 'In-App',
        eventTypeCode: '3'
      },
      5: {
        Value: '5',
        Name: 'SMS',
        eventTypeCode: '4'
      }
    };

    const livepersonId = '123456';
    const ssn = '12366666456';

    const SUBSCRIBER = {
      AdditionalProperties: [
        {
          Id: 1529,
          Values: [livepersonId]
        },
        {
          Id: 1530,
          Values: ['11111']
        }
      ],
      ContactPreferences: [
        {
          ContactEventType: 60,
          ContactMethod: 1,
          OptIn: true
        }
      ],
      ExternalReference: ssn
    };
    const SUBSCRIBER_WITH_SSN_IN_OLD_LOCATION = {
      AdditionalProperties: [
        {
          Id: 1529,
          Values: [livepersonId]
        },
        {
          Id: 1530,
          Values: ['11111']
        },
        {
          Id: 1531,
          ExternalReference: SSN_EXTERNAL_REFERENCE,
          Values: [ssn]
        }
      ],
      ContactPreferences: [
        {
          ContactEventType: 60,
          ContactMethod: 1,
          OptIn: true
        }
      ]
    };
    const SUBSCRIBER_METHODS = [
      {
        Value: '1',
        Name: 'Email',
        eventTypeCode: '1',
        optIn: true
      }, {
        Value: '5',
        Name: 'SMS',
        eventTypeCode: '4',
        optIn: false
      }, {
        Value: '44',
        Name: 'In-App',
        eventTypeCode: '3',
        optIn: false
      }
    ];

    describe('When ValidContactMethods is used...', () => {
      test('It should return an empty array if there is no data', () => {
        expect(Subscriber.ValidContactMethods.resultFunc(EMPTY_ARRAY)).toEqual({});
      });

      test('It should return an array of filtered contact methods', () => {
        expect(Subscriber.ValidContactMethods.resultFunc(CONTACT_METHODS)).toEqual(FILTERED_METHODS);
      });
    });

    describe('When ContactMethodsWithEventTypeCode is used...', () => {
      test('It should return an empty array when if there is no data', () => {
        expect(Subscriber.ContactMethodsWithEventTypeCode.resultFunc(EMPTY_ARRAY, EMPTY_ARRAY)).toEqual({});
      });

      test('It should return the list of contact methods with eventTypeCode added', () => {
        expect(Subscriber.ContactMethodsWithEventTypeCode.resultFunc(FILTERED_METHODS, CONTACT_MAPPINGS)).toEqual(FORMATED_METHODS);
      });
    });

    describe('When SubscriberContactMethods is used...', () => {
      test('It should return an empty array if there is no data', () => {
        expect(Subscriber.SubscriberContactMethods.resultFunc(null, EMPTY_ARRAY)).toEqual(EMPTY_ARRAY);
      });

      test('It should return the list of Formated Methods with OptIn added', () => {
        expect(Subscriber.SubscriberContactMethods.resultFunc(SUBSCRIBER, FORMATED_METHODS)).toEqual(SUBSCRIBER_METHODS);
      });
    });

    describe('When SubscriberSSN is used...', () => {
      test('It should return undefined if there is no data', () => {
        expect(Subscriber.SubscriberSSN.resultFunc({})).toEqual(undefined);
      });

      test('It should return the subscribers SSN if available', () => {
        expect(Subscriber.SubscriberSSN.resultFunc(SUBSCRIBER)).toEqual(ssn);
      });

      test('It should return the subscribers SSN from the old location if available', () => {
        expect(Subscriber.SubscriberSSN.resultFunc(SUBSCRIBER_WITH_SSN_IN_OLD_LOCATION)).toEqual(ssn);
      });
    });
  });
});
