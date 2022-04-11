import { FORMAT_LOCAL_SWEDISH_MOBILE_REGEX } from '@selfcare/core/constants/subscriber';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { CodeLoaded, SpecificOrGlobalCode } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { Subscriber } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import i18next from 'i18next';
import pathOr from 'ramda/src/pathOr';
import values from 'ramda/src/values';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { formatZuluDate } from 'selfcare-ui/src/utilities/localization/datetime';
import { EMAIL_REGEX, LOCAL_SWEDISH_MOBILE_REGEX, MAX_SUBSCRIBER_FIELD_LENGTH } from '../../constants/validation.constants';
import { patternExists } from '../../helpers/validation.helpers';
import LocaleKeys from '../../locales/keys';
import { Client } from '../client.selectors';

const EMPTY_OBJECT = {};

const Base = createSelector([
  Client
], (client) => pathOr(EMPTY_OBJECT, ['userInfo'], client));

export const UserInfoFormattedSubscriber = createSelector([
  SelectedLocale,
  Subscriber
], (locale, subscriber) => {
  return {
    ...subscriber,
    BirthDate: subscriber && subscriber.BirthDate ? formatZuluDate(subscriber.BirthDate, locale) : undefined
  };
});

export const UserInfoFormValues = createSelector([
  Base,
  UserInfoFormattedSubscriber
], (updateUserInfo, subscriber) => {
  return pathOr(subscriber, ['formValues'], updateUserInfo) || EMPTY_OBJECT;
});


export const INPUT_FIELD_TYPES = new Immutable({
  CODE_SELECT: 'code_select',
  EMAIL: 'email',
  TELEPHONE: 'tel',
  TEXT: 'text'
});

const API_VALIDATION = new Immutable({
  EMAIL: {
    regex: EMAIL_REGEX
  },
  NAME: {
    minLength: 0,
    maxLength: 100
  },
  PHONE_NUMBER: {
    minLength: 0,
    maxLength: 20
  },
  LOCAL_SWEDISH_MOBILE_NUMBER: {
    regex: LOCAL_SWEDISH_MOBILE_REGEX
  }
});

export const Fields = () => new Immutable({
  birthdate: {
    type: INPUT_FIELD_TYPES.TEXT,
    label: LocaleKeys.SUBSCRIBER.BIRTH_DATE,
    validation: {
      minimum_age: null,
      maximum_age: null,
      required: true
    },
    key: 'BirthDate',
    display: true,
    size: 'medium'
  },
  business_phone: {
    type: INPUT_FIELD_TYPES.TEXT,
    label: LocaleKeys.SUBSCRIBER.BUSINESS_PHONE,
    validation: API_VALIDATION.PHONE_NUMBER,
    key: 'BusinessPhone',
    display: true,
    size: 'full'
  },
  email: {
    type: INPUT_FIELD_TYPES.EMAIL,
    label: LocaleKeys.SUBSCRIBER.EMAIL,
    validation: API_VALIDATION.EMAIL
      .set('required', true),
    key: 'Email',
    display: true,
    size: 'full'
  },
  first_name: {
    type: INPUT_FIELD_TYPES.TEXT,
    label: LocaleKeys.SUBSCRIBER.FIRST_NAME,
    validation: API_VALIDATION.NAME
      .set('required', true),
    key: 'FirstName',
    display: true,
    size: 'medium'
  },
  gender: {
    type: INPUT_FIELD_TYPES.CODE_SELECT,
    label: LocaleKeys.SUBSCRIBER.GENDER,
    code: CODES.PersonGender,
    validation: {},
    key: 'Gender',
    display: true,
    size: 'medium'
  },
  home_phone: {
    type: INPUT_FIELD_TYPES.TEXT,
    label: LocaleKeys.SUBSCRIBER.HOME_PHONE,
    validation: API_VALIDATION.PHONE_NUMBER,
    key: 'HomePhone',
    display: true,
    size: 'full'
  },
  language: {
    type: INPUT_FIELD_TYPES.CODE_SELECT,
    label: LocaleKeys.SUBSCRIBER.LANGUAGE,
    code: CODES.Language,
    validation: {},
    key: 'Language',
    display: true,
    size: 'full'
  },
  last_name: {
    type: INPUT_FIELD_TYPES.TEXT,
    label: LocaleKeys.SUBSCRIBER.LAST_NAME,
    validation: API_VALIDATION.NAME
      .set('required', true),
    key: 'LastName',
    display: true,
    size: 'medium'
  },
  mobile_phone: {
    info: LocaleKeys.SUBSCRIBER.MOBILE_NUMBER_FORMAT,
    type: INPUT_FIELD_TYPES.TELEPHONE,
    label: LocaleKeys.SUBSCRIBER.MOBILE_PHONE,
    validation: API_VALIDATION.LOCAL_SWEDISH_MOBILE_NUMBER,
    key: 'MobilePhone',
    display: true,
    size: 'full'
  }
});

// Must return undefined in order for the form to submit. Null is evaluated as having an error
const GenerateClientValidationFunctions = (dynamicFields) => {
  let CLIENT_VALIDATION = new Immutable({});
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

const VALIDATION_FIELDS = new Immutable({
  maximum_age: 'birthdate',
  minimum_age: 'birthdate'
});

const createFieldMap = (codes, fieldsObject, formValues) => {
  let fields = Object.keys(codes.AdditionalProperties).reduce((prev, key) => {
    const value = codes.AdditionalProperties[key];
    const matches = /(capture|display)_([\w_]+)/.exec(key);
    const validation = VALIDATION_FIELDS[key];
    if (matches && fieldsObject[matches[2]]) {
      if (matches[1] === 'display') {
        return prev.setIn([matches[2], 'display'], value === 'True');
      }
      return prev.setIn([matches[2], 'validation', 'required'], value === 'True');
    }
    if (validation) {
      return prev.setIn([validation, 'validation', key], value);
    }
    return prev;
  }, fieldsObject);

  if (formValues) {
    const fieldKeys = Object.keys(fields);
    fields = Object.keys(formValues).reduce((prev, key) => {
      const value = formValues[key];
      const fieldKey = fieldKeys.find((field) => prev[field].key === key);

      if (fieldKey && value) {
        return prev.setIn(
          [fieldKey, 'defaultValue'],
          fieldKey === 'birthdate' ? new Date(value).toLocaleDateString() : value
        );
      }
      return prev;
    }, fields);
  }

  return fields;
};

export const UserInfoFormFields = createSelector([
  CodeLoaded(CODES.SubscriberRequirements),
  SpecificOrGlobalCode(CODES.SubscriberRequirements),
  Fields,
  UserInfoFormValues
], (subscriberRequirementsLoaded, subscriberRequirements, fields, formValues) => {
  const formattedData = subscriberRequirementsLoaded ? createFieldMap(subscriberRequirements, fields, formValues) : null;
  return new Immutable(fields ? {
    mobile_phone: {
      ...{},
      ...formattedData.mobile_phone,
      defaultValue: formattedData.mobile_phone.defaultValue && formattedData.mobile_phone.defaultValue.replace(FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_LOCAL_SWEDISH_MOBILE_REGEX.replace),
      label: i18next.t(LocaleKeys.SUBSCRIBER.CONTACT_PHONE_NUMNER)
    }
  } : {});
});

export const UserInfoFormFieldsFormatted = createSelector([
  UserInfoFormFields
], (fields) => {
  // This looks similar to the 'limtiedFields' but this is an array for formatting the display, that's for killing off data
  return new Immutable(fields ? [
    [fields.mobile_phone]
  ] : []);
});

export const ClientValidation = createSelector([
  UserInfoFormFields
], GenerateClientValidationFunctions);
