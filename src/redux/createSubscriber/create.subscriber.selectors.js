import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { CodeItems, CodeLoaded, codeValueOptions, SpecificOrGlobalCode } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import { Subscriber } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import parse from 'date-fns/parse';
import subYears from 'date-fns/sub_years';
import i18next from 'i18next';
import contains from 'ramda/src/contains';
import filter from 'ramda/src/filter';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import propEq from 'ramda/src/propEq';
import values from 'ramda/src/values';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { EMAIL_REGEX, LOCAL_SWEDISH_MOBILE_REGEX, MAX_SUBSCRIBER_FIELD_LENGTH } from '../../constants/validation.constants';
import { patternExists } from '../../helpers/validation.helpers';
import LocaleKeys from '../../locales/keys';
import { Client } from '../client.selectors';

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = new Immutable([]);

const Base = createSelector([
  Client
], (client) => pathOr(null, ['createSubscriber'], client));

export const CreateSubscriberFormValues = createSelector([
  Base,
  Subscriber
], (createSubscriber, subscriber) => {
  return subscriber || pathOr(EMPTY_OBJECT, ['formValues'], createSubscriber);
});

export const CreateSubscriberFormValuesValid = createSelector(
  Base,
  (createSubscriber) => (pathOr(false, ['formValuesValid'], createSubscriber))
);

export const LocalStorageChecked = createSelector(
  Base,
  (createSubscriber) => (pathOr(false, ['localStorageChecked'], createSubscriber))
);

export const SelectedCountry = createSelector([
  CreateSubscriberFormValues
], (formValues) => {
  const defaultCountry = pathOr(null, ['country'], formValues);
  return pathOr(defaultCountry, ['Country'], formValues);
});

export const SubscriberLoggedIn = createSelector([
  Subscriber
], (subscriber) => Boolean(subscriber));

const COUNTRY_CODE_KEY = 'country_code';
export const SelectOptionsForStatesRegionsOrProvincesForASelectedCountry = createSelector([
  CodeLoaded(CODES.AddressStateProvinceRegion),
  CodeItems(CODES.AddressStateProvinceRegion),
  SelectedCountry
], (isCodeLoaded, statesRegionsOrProvinces, country) => {
  return isCodeLoaded ? codeValueOptions(statesRegionsOrProvinces.filter(({ AdditionalProperties }) => {
    return AdditionalProperties[COUNTRY_CODE_KEY] === country;
  })) : EMPTY_ARRAY;
});

export const IsStateRegionProvinceRequired = createSelector([
  CodeLoaded(CODES.AddressStateProvinceRegion),
  SelectOptionsForStatesRegionsOrProvincesForASelectedCountry
], (isCodeLoaded, selectOptions) => (isCodeLoaded ? selectOptions.length > 0 : false));

export const INPUT_FIELD_TYPES = new Immutable({
  CODE_SELECT: 'code_select',
  CUSTOM_PASSWORD_CHALLENGE: 'custom_password_challenge',
  EMAIL: 'email',
  PASSWORD: 'password',
  PASSWORD_CHALLENGE: 'password_challenge',
  STATE_INPUT: 'state',
  TELEPHONE: 'tel',
  TEXT: 'text'
});

const API_VALIDATION = new Immutable({
  COMPANY_NAME: {
    minLength: 0,
    maxLength: 100
  },
  DRIVERS_LICENSE: {
    minLength: 0,
    maxLength: 20
  },
  EMAIL: {
    regex: EMAIL_REGEX
  },
  NAME: {
    minLength: 0,
    maxLength: 100
  },
  PASSWORD_CHALLENGE: {
    minLength: 0,
    maxLength: 100
  },
  PASSWORD_CHALLENGE_RESPONSE: {
    minLength: 0,
    maxLength: 50
  },
  PHONE_NUMBER: {
    minLength: 0,
    maxLength: 20
  },
  LOCAL_SWEDISH_MOBILE_NUMBER: {
    regex: LOCAL_SWEDISH_MOBILE_REGEX
  },
  SSN: {
    minLength: 0,
    maxLength: 9
  }
});
const VALIDATION_FIELDS = new Immutable({
  maximum_age: 'birthdate',
  minimum_age: 'birthdate'
});


/**
 * Out Of Scope
 * ------
 * display_subscriber_contact_preference
 * display_subscribes_to_communications
 * display_subscribes_to_partners
 * The above 3 fields are actually related to code tables 342 and 343.
 * 342 - ContactEventType
 * 343 - ContactMethod
 * Communications and Partners are booleans. They are two types of events
 * that a customer can be communicated when they occur
 * Contact Methods are Determined by 343
 * These represent how a customer is contacted.
 *
 * require_device_on_signup
 * email_verification_expiration_days
 * require_email_verification
 * display_subscriber_names
 */

export const Fields = createSelector([
  IsStateRegionProvinceRequired
], (isStateRegionRequired) => {
  return new Immutable({
    addressLine1: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.ADDRESS_LINE_1,
      validation: {
        required: true
      },
      key: 'LineOne',
      display: true
    },
    addressLine2: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.ADDRESS_LINE_2,
      validation: {},
      key: 'LineTwo',
      display: true
    },
    birthdate: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.BIRTH_DATE,
      validation: {
        minimum_age: null,
        maximum_age: null
      },
      key: 'BirthDate',
      display: true
    },
    business_phone: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.BUSINESS_PHONE,
      validation: API_VALIDATION.PHONE_NUMBER,
      key: 'BusinessPhone',
      display: true
    },
    city: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.CITY,
      validation: {
        required: true
      },
      key: 'City',
      display: true
    },
    company_name: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.COMPANY_NAME,
      validation: API_VALIDATION.COMPANY_NAME,
      key: 'CompanyName',
      display: true
    },
    confirm: {
      type: INPUT_FIELD_TYPES.PASSWORD,
      label: LocaleKeys.SUBSCRIBER.CONFIRM,
      validation: {
        required: true
      },
      key: 'confirm',
      display: true
    },
    country: {
      type: INPUT_FIELD_TYPES.CODE_SELECT,
      label: LocaleKeys.SUBSCRIBER.COUNTRY,
      code: CODES.AddressCountry,
      validation: {
        required: true
      },
      key: 'Country',
      display: true
    },
    custom_password_challenge: {
      type: INPUT_FIELD_TYPES.CUSTOM_PASSWORD_CHALLENGE,
      label: LocaleKeys.SUBSCRIBER.CUSTOM_PASSWORD_CHALLENGE,
      validation: API_VALIDATION.PASSWORD_CHALLENGE,
      key: 'customPasswordChallenge',
      display: true
    },
    drivers_license_number: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.DRIVERS_LICENSE_NUMBER,
      validation: API_VALIDATION.DRIVERS_LICENSE,
      key: 'DriversLicenseNumber',
      display: true
    },
    drivers_license_state: {
      type: INPUT_FIELD_TYPES.STATE_INPUT,
      label: LocaleKeys.SUBSCRIBER.DRIVERS_LICENSE_STATE,
      code: CODES.AddressStateProvinceRegion,
      validation: {},
      key: 'DriversLicenseState',
      display: true
    },
    email: {
      type: INPUT_FIELD_TYPES.EMAIL,
      label: LocaleKeys.SUBSCRIBER.EMAIL,
      validation: API_VALIDATION.EMAIL
        .set('required', true),
      key: 'Email',
      display: true
    },
    gender: {
      type: INPUT_FIELD_TYPES.CODE_SELECT,
      label: LocaleKeys.SUBSCRIBER.GENDER,
      code: CODES.PersonGender,
      validation: {},
      key: 'Gender',
      display: true
    },
    home_phone: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.HOME_PHONE,
      validation: API_VALIDATION.PHONE_NUMBER,
      key: 'HomePhone',
      display: true
    },
    income_level: {
      type: INPUT_FIELD_TYPES.CODE_SELECT,
      label: LocaleKeys.SUBSCRIBER.INCOME_LEVEL,
      code: CODES.SubscriberIncomeLevelType,
      validation: {},
      key: 'IncomeLevelType',
      display: true
    },
    login: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.LOGIN_FORM.USERNAME,
      validation: {
        required: true
      },
      key: 'Login',
      display: true
    },
    mobile_phone: {
      info: LocaleKeys.SUBSCRIBER.MOBILE_NUMBER_FORMAT,
      type: INPUT_FIELD_TYPES.TELEPHONE,
      label: LocaleKeys.SUBSCRIBER.MOBILE_PHONE,
      validation: API_VALIDATION.LOCAL_SWEDISH_MOBILE_NUMBER,
      key: 'MobilePhone',
      display: true
    },
    password: {
      type: INPUT_FIELD_TYPES.PASSWORD,
      label: LocaleKeys.SUBSCRIBER.PASSWORD,
      validation: {
        required: true
      },
      key: 'Password',
      display: true
    },
    password_challenge: {
      type: INPUT_FIELD_TYPES.PASSWORD_CHALLENGE,
      label: LocaleKeys.SUBSCRIBER.PASSWORD_CHALLENGE,
      validation: API_VALIDATION.PASSWORD_CHALLENGE,
      key: 'PasswordChallenge',
      display: true,
      code: CODES.DefaultPasswordChallenge
    },
    password_challenge_response: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.PASSWORD_CHALLENGE_RESPONSE,
      validation: API_VALIDATION.PASSWORD_CHALLENGE_RESPONSE,
      key: 'PasswordChallengeResponse',
      display: true
    },
    postal_code: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.POSTAL_CODE,
      validation: {
        required: true
      },
      key: 'PostalCode',
      display: true
    },
    preferred_language: {
      type: INPUT_FIELD_TYPES.CODE_SELECT,
      label: LocaleKeys.SUBSCRIBER.LANGUAGE,
      code: CODES.Language,
      validation: {},
      key: 'Language',
      display: true
    },
    race: {
      type: INPUT_FIELD_TYPES.CODE_SELECT,
      label: LocaleKeys.SUBSCRIBER.RACE,
      code: CODES.PersonRace,
      validation: {},
      key: 'Race',
      display: true
    },
    ssn: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.SSN,
      validation: API_VALIDATION.SSN,
      key: 'Ssn',
      display: true
    },
    state: {
      type: INPUT_FIELD_TYPES.STATE_INPUT,
      label: LocaleKeys.SUBSCRIBER.STATE_REGION_PROVINCE,
      validation: {
        required: isStateRegionRequired
      },
      key: 'State',
      display: true
    },
    subscriber_first_name: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.FIRST_NAME,
      validation: API_VALIDATION.NAME,
      key: 'FirstName',
      display: true
    },
    subscriber_last_name: {
      type: INPUT_FIELD_TYPES.TEXT,
      label: LocaleKeys.SUBSCRIBER.LAST_NAME,
      validation: API_VALIDATION.NAME,
      key: 'LastName',
      display: true
    },
    subscriber_lead_source: {
      type: INPUT_FIELD_TYPES.CODE_SELECT,
      label: LocaleKeys.SUBSCRIBER.LEAD_SOURCE,
      code: CODES.LeadSourceType,
      validation: {},
      key: 'LeadSourceType',
      display: true
    }
  });
});

// Must return undefined in order for the form to submit. Null is evaluated as having an error
const GenerateClientValidationFunctions = (dynamicFields) => {
  let CLIENT_VALIDATION = new Immutable({
    BirthDate: (fields) => {
      const { validation } = dynamicFields.birthdate;
      const errors = {
        maximum_age: subYears(new Date(), Number.parseInt(validation.maximum_age, 10)) > parse(fields.BirthDate),
        minimum_age: subYears(new Date(), Number.parseInt(validation.minimum_age, 10)) < parse(fields.BirthDate)
      };
      let errorMessage;
      if (errors.maximum_age) {
        errorMessage = i18next.t(LocaleKeys.SUBSCRIBER.MAXIMUM_AGE_ERROR);
      } else if (errors.minimum_age) {
        errorMessage = i18next.t(LocaleKeys.SUBSCRIBER.MINIMUM_AGE_ERROR);
      }
      return errorMessage;
    },
    confirm: ({ confirm, Password }) => {
      if (Password && confirm && confirm !== Password) {
        return i18next.t(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
      }
    },
    Password: ({ confirm, Password }) => {
      if (Password && confirm && confirm !== Password) {
        return i18next.t(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
      }
    }
  });
  values(dynamicFields)
    .forEach(({ key, label, validation }) => {
      CLIENT_VALIDATION = CLIENT_VALIDATION.update(key, (currentValidation) => {
        return (fields) => {
          if (validation.required && !fields[key]) {
            return i18next.t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
              field: i18next.t(label)
            });
          }

          if (validation.regex && fields[key] && !patternExists(fields[key], validation.regex.pattern, validation.regex.flag)) {
            return i18next.t(LocaleKeys.VALIDATION.REGEX_FIELD_TEMPLATE, {
              field: i18next.t(label)
            });
          }
          if (fields[key] && fields[key].length > MAX_SUBSCRIBER_FIELD_LENGTH) {
            return i18next.t(LocaleKeys.VALIDATION.MAX_LENGTH_TEMPLATE, {
              max: MAX_SUBSCRIBER_FIELD_LENGTH,
              field: i18next.t(label)
            });
          }
          if (currentValidation) {
            return currentValidation(fields);
          }
        };
      });
    });
  return CLIENT_VALIDATION;
};

export const READ_ONLY_PASSWORD = '************';
const createFieldMap = (codes, fieldsObject, formValues, loggedIn) => {
  let fields = Object.keys(codes.AdditionalProperties).reduce((prev, key) => {
    const value = codes.AdditionalProperties[key];
    const matches = /(capture|display)_([\w_]+)/.exec(key);
    const validation = VALIDATION_FIELDS[key];
    if (matches && fieldsObject[matches[2]]) {
      if (matches[1] === 'display') {
        return prev.setIn([matches[2], 'display'], value === 'True');
      }
      return prev.setIn([matches[2], 'validation', 'required'], value === 'True');
    } if (key === 'capture_email_as_login') {
      return prev
        .setIn(['login', 'display'], value === 'False')
        .setIn(['login', 'validation', 'required'], value === 'False');
    } if (key === 'capture_challenge_response') {
      return prev
        .setIn(['password_challenge', 'display'], value === 'True')
        .setIn(['password_challenge', 'validation', 'required'], value === 'True')
        .setIn(['password_challenge_response', 'display'], value === 'True')
        .setIn(['password_challenge_response', 'validation', 'required'], value === 'True');
    } if (validation) {
      return prev.setIn([validation, 'validation', key], value);
    }
    return prev;
  }, fieldsObject);

  if (formValues) {
    const fieldKeys = Object.keys(fields);
    fields = Object.keys(formValues).reduce((prev, key) => {
      const value = formValues[key];
      const fieldKey = fieldKeys.find((field) => prev[field].key === key);
      if (fieldKey && (value === 0 || value)) {
        return prev.setIn([fieldKey, 'defaultValue'], value);
      } if (prev[key] && !prev[key].defaultValue && value) {
        // address values come back differently, need to use the field keys to set.
        return prev.setIn([key, 'defaultValue'], value);
      }
      return prev;
    }, fields);

    if (loggedIn) {
      fields = fields.setIn(['password', 'defaultValue'], READ_ONLY_PASSWORD)
        .setIn(['confirm', 'defaultValue'], READ_ONLY_PASSWORD);
    }
  }

  return fields;
};

export const SubscriberFormFields = createSelector([
  CodeLoaded(CODES.SubscriberRequirements),
  SpecificOrGlobalCode(CODES.SubscriberRequirements),
  CreateSubscriberFormValues,
  Fields,
  SubscriberLoggedIn
], (subscriberRequirementsLoaded, subscriberRequirements, formValues, fields, loggedIn) => {
  return subscriberRequirementsLoaded ? createFieldMap(subscriberRequirements, fields, formValues, loggedIn) : null;
});

export const SubscriberFormFieldsFormatted = createSelector([
  SubscriberFormFields
], (fields) => {
  return new Immutable(fields ? [
    [fields.email],
    [fields.login],
    [fields.mobile_phone]
  ] : []);
});

export const ClientValidation = createSelector([
  SubscriberFormFields
], GenerateClientValidationFunctions);

export const CUSTOM_PASSWORD_CHALLENGE_VALUE = 'custom_password_challenge';
export const ChallengeQuestions = createSelector([
  CodeLoaded(CODES.DefaultPasswordChallenge),
  CodeItems(CODES.DefaultPasswordChallenge)
], (passwordChallengesLoaded, passwordChallenges) => {
  return passwordChallengesLoaded ? passwordChallenges
    .map(({ Name, Value }) => ({
      id: Value,
      label: Name,
      value: Name
    }))
    .concat({
      id: 'custom_password_challenge',
      value: CUSTOM_PASSWORD_CHALLENGE_VALUE,
      label: i18next.t(LocaleKeys.SUBSCRIBER.CUSTOM_PASSWORD_CHALLENGE)
    }) : EMPTY_ARRAY;
});

const GDPR_CONSENT = 'GDPR';
const GENERAL_CONSENT = 'Consent';

export const GdprConsentArray = createSelector([
  CodeItems(CODES.ConsentType),
  CodeItems(CODES.ConsentConfiguration)
], (consentType, consentConfigs) => (consentConfigs.reduce((result, config) => {
  const type = path(['AdditionalProperties', 'consent_type'], config);
  const typeObj = consentType.find(({ Value }) => (Value === type));

  if (path(['Name'], typeObj)) {
    const isNotAPromotionalConsent = contains(GDPR_CONSENT, path(['Name'], typeObj));
    if (isNotAPromotionalConsent) {
      const isGeneralConsent = contains(GENERAL_CONSENT, path(['Description'], typeObj));
      result.push({
        isGDPRConsent: !isGeneralConsent,
        required: isGeneralConsent,
        type: path(['Value'], config)
      });
    }
  }
  return result;
}, [])));

export const PromotionalConsentIds = createSelector([
  CodeItems(CODES.ConsentType),
  CodeItems(CODES.ConsentConfiguration)
], (consentType, consentConfigs) => (consentConfigs.reduce((result, config) => {
  const type = path(['AdditionalProperties', 'consent_type'], config);
  const typeObj = consentType.find(({ Value }) => (Value === type));

  if (path(['Name'], typeObj) && !contains(GDPR_CONSENT, path(['Name'], typeObj))) {
    result.push(path(['Value'], config));
  }
  return result;
}, [])));

export const PromotionalConsentArray = createSelector([
  CodeItems(CODES.ConsentType),
  CodeItems(CODES.ConsentConfiguration),
  PromotionalConsentIds,
  Subscriber
], (consentType, consentConfigs, promoConsentIds, subscriber) => {
  if (Boolean(consentType.length) && Boolean(consentConfigs.length)) {
    const promoConfigs = consentConfigs.filter((config) => promoConsentIds.includes(config.Value));

    return promoConfigs.reduce((result, consentConfig) => {
      const configValue = path(['Value'], consentConfig);
      const subscriberConsents = pathOr(EMPTY_ARRAY, ['SubscriberConsents'], subscriber);
      const isValueInSubscriberConsents = propEq('ConfigConsentId', Number(configValue));
      const filteredSubscriberConsent = filter(isValueInSubscriberConsents, subscriberConsents)[0];
      result.push({
        id: filteredSubscriberConsent ? filteredSubscriberConsent.ConfigConsentId : Number(consentConfig.Value),
        consentAccepted: pathOr(false, ['ConsentAccepted'], filteredSubscriberConsent),
        label: path(['Name'], consentConfig),
        description: path(['AdditionalProperties', 'consent_terms'], consentConfig),
        type: path(['AdditionalProperties', 'consent_type'], consentConfig)
      });
      return result;
    }, []);
  }
  return EMPTY_ARRAY;
});
