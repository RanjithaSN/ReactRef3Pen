import LOADING_STATUS from '@selfcare/core/constants/loading.status';
import addYears from 'date-fns/add_years';
import i18next from 'i18next';
import Immutable from 'seamless-immutable';
import LocaleKeys from '../../locales/keys';
import { INITIAL_STATE } from './create.subscriber.reducer';
import * as CreateSubscriber from './create.subscriber.selectors';

const TEST_STORE = Immutable({})
  .setIn(['client', 'createSubscriber', 'formValues', 'Country'], 'USA')
  .setIn(['ascendon', 'metadata', 'codes', 10], {
    status: LOADING_STATUS.LOADED,
    items: [{
      Value: '10',
      Name: 'What planet are you from?'
    }]
  })
  .setIn(['ascendon', 'metadata', 'codes', 166], {
    status: LOADING_STATUS.LOADED,
    items: [
      {
        AdditionalProperties: {
          minimum_age: '13',
          maximum_age: '22',
          display_home_phone: 'True',
          capture_home_phone: 'False',
          display_mobile_phone: 'True',
          capture_mobile_phone: 'False',
          display_business_phone: 'True',
          capture_business_phone: 'False',
          display_birthdate: 'False',
          capture_birthdate: 'False',
          display_gender: 'False',
          capture_gender: 'False',
          capture_email_as_login: 'True',
          display_subscriber_lead_source: 'False',
          capture_subscriber_lead_source: 'False',
          display_subscriber_contact_preference: 'False',
          capture_subscriber_contact_preference: 'False',
          display_subscribes_to_communications: 'False',
          display_subscribes_to_partners: 'False',
          subscribes_to_newsletter_alias: '',
          subscribes_to_partners_alias: '',
          require_device_on_signup: 'False',
          display_race: 'False',
          capture_race: 'False',
          display_ssn: 'False',
          capture_ssn: 'False',
          display_drivers_license_number: 'False',
          capture_drivers_license_number: 'False',
          display_drivers_license_state: 'False',
          capture_drivers_license_state: 'False',
          display_income_level: 'False',
          capture_income_level: 'False',
          display_preferred_language: 'True',
          capture_preferred_language: 'False',
          capture_subscriber_first_name: 'True',
          capture_subscriber_last_name: 'True',
          capture_challenge_response: 'True',
          require_email_verification: 'False',
          email_verification_expiration_days: '',
          display_subscriber_names: 'True',
          display_company_name: 'False',
          capture_company_name: 'False'
        },
        Value: '10078'
      }
    ]
  });

const WITH_STATES = TEST_STORE.setIn(['ascendon', 'metadata', 'codes', 60], {
  status: LOADING_STATUS.LOADED,
  items: [{
    AdditionalProperties: {
      country_code: 'USA'
    },
    Value: 'Nebraska'
  }, {
    AdditionalProperties: {
      country_code: 'CA'
    },
    Value: 'Alberta'
  }]
});

describe('Create Subscriber ...', () => {
  beforeEach(() => {
    i18next.t.mockClear();
  });

  describe('When the SubscriberFormFields is used...', () => {
    it('should return null when the codes have not been loaded', () => {
      expect(CreateSubscriber.SubscriberFormFields.resultFunc(false, null)).toBeNull();
    });

    it('should set display to true for HomePhone', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).home_phone.display).toBe(true);
    });

    it('should not require home phone, as it is not set to capture', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).home_phone.validation.required).toBe(false);
    });

    it('should require first name', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).subscriber_first_name.validation.required).toBe(true);
    });

    it('should set the minimum age to the value in minimum_age on birthdate\'s validation', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).birthdate.validation.minimum_age).toBe('13');
    });

    it('should set the maximum age to the value in maximum_age on birthdate\'s validation', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).birthdate.validation.maximum_age).toBe('22');
    });

    it('should set the validation of login to be false if "capture_email_as_login" is true, as the login field is not going to be populated by the user', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).login.validation.required).toEqual(false);
    });

    it('should set the display value of login to be false if "capture_email_as_login" is true, as the login field is not going to be populated by the user', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).login.display).toEqual(false);
    });

    it('should only display password challenge if "capture_challenge_response" is true', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).password_challenge.display).toEqual(true);
    });

    it('should only display password challenge response if "capture_challenge_response" is true', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).password_challenge_response.display).toEqual(true);
    });

    it('should set password challenge to required if "capture_challenge_response" is true', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).password_challenge.validation.required).toEqual(true);
    });

    it('should set password challenge response if "capture_challenge_response" is true', () => {
      expect(CreateSubscriber.SubscriberFormFields(TEST_STORE).password_challenge_response.validation.required).toEqual(true);
    });
    describe('and a default address is supplied ... ', () => {
      const DEFAULT_ADDRESS = {
        addressLine1: '123 Main St',
        addressLine2: 'Apt E',
        city: 'My City',
        country: 'USA',
        state: 'Nebraska',
        postal_code: '67555'
      };
      let result;
      const STORE_WITH_DEFAULT = TEST_STORE.setIn(['ascendon', 'subscriberApi', 'offering', 'address'], DEFAULT_ADDRESS);

      beforeEach(() => {
        result = CreateSubscriber.SubscriberFormFields(STORE_WITH_DEFAULT);
      });
      it('should return undefined for the subscriber first name field', () => {
        expect(result.subscriber_first_name.defaultValue).toEqual(undefined);
      });
      it('should return undefined for the default value subscriber password field', () => {
        expect(result.password.defaultValue).toEqual(undefined);
      });

      describe('and createSubscriber formValues are supplied...', () => {
        const CREATE_SUBSCRIBER_FORMVALUES = {
          City: 'Omaha',
          Country: 'USA',
          Email: 'jdoe@grr.la',
          FirstName: 'Jane',
          Language: 'en-US',
          LastName: 'Doe',
          LineOne: '7890 Dodge St',
          PostalCode: '68022',
          State: 'NE'
        };

        const STORE_WITH_FORMVALUES = STORE_WITH_DEFAULT.setIn(['client', 'createSubscriber', 'formValues'], CREATE_SUBSCRIBER_FORMVALUES);
        beforeEach(() => {
          result = CreateSubscriber.SubscriberFormFields(STORE_WITH_FORMVALUES);
        });

        it('should return form values for the subscriber address line one field', () => {
          expect(result.addressLine1.defaultValue).toEqual(CREATE_SUBSCRIBER_FORMVALUES.LineOne);
        });
        it('should return form values for the subscriber country field', () => {
          expect(result.country.defaultValue).toEqual(CREATE_SUBSCRIBER_FORMVALUES.Country);
        });
        it('should return form values for the subscriber postal code field', () => {
          expect(result.postal_code.defaultValue).toEqual(CREATE_SUBSCRIBER_FORMVALUES.PostalCode);
        });
        it('should return form values for the subscriber state field', () => {
          expect(result.state.defaultValue).toEqual(CREATE_SUBSCRIBER_FORMVALUES.State);
        });
      });
    });
    describe('and a subscriber is logged in ... ', () => {
      let subscriberResult;
      const SUBSCRIBER = {
        Ssn: '*****6432',
        BirthDate: '1989-09-09T00:00:00.000Z',
        LastSuccessfulLogin: '2018-12-13T19:27:08.863Z',
        StatusName: 'Active',
        LastSessionCountry: 'USA',
        HomeCountry: 'USA',
        SubscriberCurrency: 'USD',
        EffectiveStartDate: '2018-12-13T17:25:36.900Z',
        id: 350501,
        FirstName: 'Test',
        LastName: 'Here',
        Email: 'test@here.com',
        Language: 'ar-EG',
        Login: 'testOne',
        ConvergentBillerId: '14009194'
      };
      const SUBSCRIBER_ADDRESS = {
        LineOne: '765 Here St.',
        LineTwo: undefined,
        City: 'Spencer',
        Country: 'USA',
        Id: 88111,
        Name: '765 Here St.',
        PostalCode: '68777',
        State: 'NE',
        DefaultService: true
      };
      const STORE_WITH_SUBSCRIBER = TEST_STORE.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], SUBSCRIBER)
        .setIn(['ascendon', 'subscriberApi', 'address', 'data'], [SUBSCRIBER_ADDRESS]);

      beforeEach(() => {
        subscriberResult = CreateSubscriber.SubscriberFormFields(STORE_WITH_SUBSCRIBER);
      });
      it('should return populated value for the subscriber first name field', () => {
        expect(subscriberResult.subscriber_first_name.defaultValue).toEqual(SUBSCRIBER.FirstName);
      });
      it('should return READ_ONLY_PASSWORD for the default value subscriber password field', () => {
        expect(subscriberResult.password.defaultValue).toEqual(CreateSubscriber.READ_ONLY_PASSWORD);
      });
    });
  });

  describe('When ChallengeQuestions is used...', () => {
    it('should return an empty array when the codes are not loaded', () => {
      expect(CreateSubscriber.ChallengeQuestions.resultFunc(false, null)).toEqual([]);
    });
    it('should set the ID to the value', () => {
      expect(CreateSubscriber.ChallengeQuestions(TEST_STORE)[0].id).toEqual('10');
    });
    it('should set the label to the name of the code', () => {
      expect(CreateSubscriber.ChallengeQuestions(TEST_STORE)[0].label).toEqual('What planet are you from?');
    });
    it('should set the value to the name of the code (this is different than most code selectors)', () => {
      expect(CreateSubscriber.ChallengeQuestions(TEST_STORE)[0].value).toEqual('What planet are you from?');
    });
    it('should have an additional option whose value is the custom password challenge value', () => {
      expect(CreateSubscriber.ChallengeQuestions(TEST_STORE)[1].value).toEqual(CreateSubscriber.CUSTOM_PASSWORD_CHALLENGE_VALUE);
    });
    it('should translate the label from CUSTOM_PASSWORD_CHALLENGE', () => {
      const result = CreateSubscriber.ChallengeQuestions(TEST_STORE);
      expect(result[1].label).toEqual(i18next.mockReturn);
    });
  });

  describe('When Fields is used...', () => {
    it('should return the object with the isStateRegionRequired flag assigned onto the state validation', () => {
      const isStateRegionRequired = true;
      const response = CreateSubscriber.Fields.resultFunc(isStateRegionRequired);
      expect(response.state.validation.required).toEqual(isStateRegionRequired);
    });
  });

  describe('When SubscriberFormFieldsFormatted is used...', () => {
    it('should return an empty array if the fields are null', () => {
      expect(CreateSubscriber.SubscriberFormFieldsFormatted.resultFunc(null)).toEqual([]);
    });
    it('should return a non-empty array if the fields exist', () => {
      expect(CreateSubscriber.SubscriberFormFieldsFormatted(TEST_STORE)).not.toEqual([]);
    });
  });

  describe('When SubscriberLoggedIn is used...', () => {
    it('should return false if no user is logged in', () => {
      expect(CreateSubscriber.SubscriberLoggedIn.resultFunc(null)).toBe(false);
    });
    it('should return true if subscriber has an id', () => {
      expect(CreateSubscriber.SubscriberLoggedIn.resultFunc({
        id: 'none'
      })).toBe(true);
    });
  });

  describe('When ClientValidation is used...', () => {
    const baseValidation = CreateSubscriber.ClientValidation(TEST_STORE);
    describe('custom validation logic', () => {
      describe('BirthDate', () => {
        it('should show the maximum age error when birthdate makes the user older than the maximum age', () => {
          baseValidation.BirthDate({
            BirthDate: addYears(new Date(), -1000)
          });
          expect(i18next.t).toHaveBeenCalledWith(LocaleKeys.SUBSCRIBER.MAXIMUM_AGE_ERROR);
        });
        it('should show the minimum age error when birthdate makes the user younger than the minimum age', () => {
          baseValidation.BirthDate({
            BirthDate: addYears(new Date(), 1000)
          });
          expect(i18next.t).toHaveBeenCalledWith(LocaleKeys.SUBSCRIBER.MINIMUM_AGE_ERROR);
        });
        it('should return undefined in the event of the BirthDate being within the range', () => {
          const result = baseValidation.BirthDate({
            BirthDate: addYears(new Date(), -21)
          });
          expect(result).toBeUndefined();
        });
      });

      describe('confirm', () => {
        it('should not return a pass match error if confirm is not filled out', () => {
          baseValidation.confirm({
            Password: 'test'
          });
          expect(i18next.t).not.toHaveBeenCalledWith(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
        });
        it('should not return a pass match error if Password is not filled out', () => {
          baseValidation.confirm({
            confirm: 'test'
          });
          expect(i18next.t).not.toHaveBeenCalledWith(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
        });
        it('should return the password match error when confirm does not match that of password', () => {
          baseValidation.confirm({
            Password: 'test',
            confirm: 'nottest'
          });
          expect(i18next.t).toHaveBeenCalledWith(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
        });
      });

      describe('Password', () => {
        it('should not return a pass match error if confirm is not filled out', () => {
          baseValidation.Password({
            Password: 'test'
          });
          expect(i18next.t).not.toHaveBeenCalledWith(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
        });
        it('should not return a pass match error if Password is not filled out', () => {
          baseValidation.Password({
            confirm: 'test'
          });
          expect(i18next.t).not.toHaveBeenCalledWith(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
        });
        it('should return the password match error when confirm does not match that of password', () => {
          baseValidation.Password({
            Password: 'test',
            confirm: 'nottest'
          });
          expect(i18next.t).toHaveBeenCalledWith(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
        });
      });
    });

    describe('required validation logic', () => {
      it('should return the required field template, translated', () => {
        baseValidation.Email({});
        expect(i18next.t).toHaveBeenCalledWith(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
          field: i18next.t() // Field is passed in, since we mock t to return the same string regardless, just plopping that result here
        });
      });

      it('should return undefined if there is no custom validation and it is not required', () => {
        const result = baseValidation.Language({});
        expect(result).toBeUndefined();
      });
    });
  });
  describe('When CreateSubscriberFormValuesValid is used...', () => {
    test('It should return false if form fields not loaded / valid', () => {
      expect(CreateSubscriber.CreateSubscriberFormValuesValid(INITIAL_STATE)).toEqual(false);
    });
    test('It should return true if form fields loaded / valid', () => {
      expect(CreateSubscriber.CreateSubscriberFormValuesValid.resultFunc({
        formValuesValid: true
      })).toEqual(true);
    });
  });
  describe('When SelectOptionsForStatesForASelectedCountry is used...', () => {
    test('It should return an empty array if the codes are not loaded', () => {
      const results = CreateSubscriber.SelectOptionsForStatesRegionsOrProvincesForASelectedCountry(TEST_STORE);
      expect(results).toEqual([]);
    });
    test('It should include Nebraska', () => {
      const results = CreateSubscriber.SelectOptionsForStatesRegionsOrProvincesForASelectedCountry(WITH_STATES);
      expect(results.find(({ value }) => value === 'Nebraska')).toEqual({
        value: 'Nebraska'
      });
    });
  });

  describe('When IsStateRegionProvinceRequired is used...', () => {
    test('It should return false when there are no options for a country', () => {
      const store = WITH_STATES.setIn(['client', 'createSubscriber', 'formValues', 'Country'], 'UZB');
      const results = CreateSubscriber.IsStateRegionProvinceRequired(store);
      expect(results).toBe(false);
    });
    test('It should return true when there are options for a country', () => {
      const results = CreateSubscriber.IsStateRegionProvinceRequired(WITH_STATES);
      expect(results).toBe(true);
    });
    test('It should return a function that always returns false if the code is not loaded', () => {
      const TEST_SPEC = WITH_STATES.setIn(['ascendon', 'metadata', 'codes', 60, 'status'], LOADING_STATUS.UNLOADED);
      expect(CreateSubscriber.IsStateRegionProvinceRequired(TEST_SPEC)).toEqual(false);
    });
  });

  describe('When GdprConsentArray is used...', () => {
    test('It should return an empty array if no consent information is available.', () => {
      const results = CreateSubscriber.GdprConsentArray.resultFunc([], []);
      expect(results).toEqual([]);
    });
    test('It should return GDPR consents in an array', () => {
      const results = CreateSubscriber.GdprConsentArray.resultFunc([{
        Description: 'Test 1',
        Name: 'Test 1',
        Value: 1
      }, {
        Description: 'general Consent',
        Name: 'Test 2 GDPR',
        Value: 2
      }, {
        Description: 'Test 3',
        Name: 'GDPR',
        Value: 3
      }, {
        Description: 'Test 4',
        Name: 'Test 4',
        Value: 4
      }], [{
        AdditionalProperties: {
          consent_type: 4,
          consent_terms: 'Test 4 Terms'
        },
        Name: 'Test 4 Name',
        Value: 44
      }, {
        AdditionalProperties: {
          consent_type: 3,
          consent_terms: 'Test 3 Terms'
        },
        Name: 'Test 3 Name',
        Value: 33
      }, {
        AdditionalProperties: {
          consent_type: 1,
          consent_terms: 'Test 1 Terms'
        },
        Name: 'Test 1 Name',
        Value: 11
      }, {
        AdditionalProperties: {
          consent_type: 4,
          consent_terms: 'Test 4 Terms'
        },
        Name: 'Test 4 Name',
        Value: 44
      }, {
        AdditionalProperties: {
          consent_type: 2,
          consent_terms: 'Test 2 Terms'
        },
        Name: 'Test 2 Name',
        Value: 22
      }]);
      expect(results).toEqual([{
        isGDPRConsent: true,
        required: false,
        type: 33
      }, {
        isGDPRConsent: false,
        required: true,
        type: 22
      }]);
    });
  });

  const CONSENT_TYPE_ARRAY = [{
    Value: '1',
    Name: 'Consent 1',
    Description: 'Consent 1 consent type description'
  }, {
    Value: '2',
    Name: 'Consent 2',
    Description: 'Consent 2 consent type description'
  }, {
    Value: '3',
    Name: 'Consent 3_GDPR',
    Description: 'Consent 3 consent type description'
  }, {
    Value: '4',
    Name: 'GDPR',
    Description: 'Consent 4 consent type description'
  }, {
    Value: '5',
    Name: 'Consent 5',
    Description: 'Consent 5 consent type description'
  }];

  const CONSENT_CONFIG_ARRAY = [
    {
      Value: '3',
      Name: 'Test Consent 1',
      AdditionalProperties: {
        consent_type: '1',
        consent_terms: 'Test Consent 1 Description'
      }
    },
    {
      Value: '4',
      Name: 'Consent 1',
      AdditionalProperties: {
        consent_type: '2',
        consent_terms: 'Consent 1 Description'
      }
    },
    {
      Value: '5',
      Name: 'Consent 2',
      AdditionalProperties: {
        consent_type: '3',
        consent_terms: 'Consent 2 Description'
      }
    },
    {
      Value: '6',
      Name: 'Consent 3',
      AdditionalProperties: {
        consent_type: '5',
        consent_terms: 'Consent 3 Description'
      }
    },
    {
      Value: '7',
      Name: 'General Consent 1',
      AdditionalProperties: {
        consent_type: '4',
        consent_terms: 'General Consent 1 Description'
      }
    }
  ];

  describe('When PromotionalConsentIds is used...', () => {
    test('It should return an empty array if no consent information is available.', () => {
      const results = CreateSubscriber.PromotionalConsentIds.resultFunc([], []);
      expect(results).toEqual([]);
    });
    test('It should return promotional consent Ids in an array', () => {
      const results = CreateSubscriber.PromotionalConsentIds.resultFunc(CONSENT_TYPE_ARRAY, CONSENT_CONFIG_ARRAY);

      expect(results).toEqual(['3', '4', '6']);
    });
  });
  describe('When PromotionalConsentArray is used...', () => {
    test('It should return an empty array if no consent information is available.', () => {
      const results = CreateSubscriber.PromotionalConsentArray.resultFunc([], []);
      expect(results).toEqual([]);
    });
    test('It should return promotional consents in an array', () => {
      const results = CreateSubscriber.PromotionalConsentArray.resultFunc(CONSENT_TYPE_ARRAY, CONSENT_CONFIG_ARRAY, ['3'], {
        SubscriberConsents: [
          {
            ConfigConsentId: 3,
            ConsentDateTime: '2019-10-20T20:59:18.967Z',
            ConsentAccepted: true
          },
          {
            ConfigConsentId: 4,
            ConsentDateTime: '2019-10-20T20:59:18.967Z',
            ConsentAccepted: false
          },
          {
            ConfigConsentId: 7,
            ConsentDateTime: '2019-10-20T20:59:18.967Z',
            ConsentAccepted: true
          }
        ]
      });

      expect(results).toEqual([{
        consentAccepted: true,
        id: 3,
        label: 'Test Consent 1',
        description: 'Test Consent 1 Description',
        type: '1'
      }]);
    });
  });
});
