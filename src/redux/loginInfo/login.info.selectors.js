import { Subscriber } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import i18next from 'i18next';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import values from 'ramda/src/values';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { MAX_SUBSCRIBER_FIELD_LENGTH } from '../../constants/validation.constants';
import { patternExists } from '../../helpers/validation.helpers';
import LocaleKeys from '../../locales/keys';
import { Client } from '../client.selectors';

const EMPTY_OBJECT = {};

const Base = createSelector([
  Client
], (client) => pathOr(EMPTY_OBJECT, ['loginInfo'], client));


const LoginInfoFormattedSubscriber = createSelector([
  Subscriber
], (subscriber) => {
  return {
    NewLogin: path(['Login'], subscriber)
  };
});

export const LoginInfoFormValues = createSelector([
  Base,
  LoginInfoFormattedSubscriber
], (updateLoginInfo, subscriberLoginInfo) => {
  return pathOr(subscriberLoginInfo, ['formValues'], updateLoginInfo) || EMPTY_OBJECT;
});

export const INPUT_FIELD_TYPES = new Immutable({
  CODE_SELECT: 'code_select',
  PASSWORD: 'password',
  PASSWORD_CHALLENGE: 'password_challenge',
  TEXT: 'text'
});

export const Fields = () => new Immutable({
  new_password: {
    type: INPUT_FIELD_TYPES.PASSWORD,
    label: LocaleKeys.RESET_PASSWORD.NEW_PASSWORD,
    validation: {
      required: true
    },
    key: 'NewPassword',
    display: true,
    size: 'full'
  },
  confirm: {
    type: INPUT_FIELD_TYPES.PASSWORD,
    label: LocaleKeys.RESET_PASSWORD.CONFIRM_PASSWORD,
    validation: {
      required: true
    },
    key: 'confirm',
    display: true,
    size: 'full'
  },
  current_password: {
    type: INPUT_FIELD_TYPES.PASSWORD,
    label: LocaleKeys.MANAGE.CURRENT_PASSWORD,
    validation: {
      required: true
    },
    key: 'CurrentPassword',
    display: true,
    size: 'full'
  }
});

// Must return undefined in order for the form to submit. Null is evaluated as having an error
const GenerateClientValidationFunctions = (dynamicFields) => {
  let CLIENT_VALIDATION = new Immutable({
    confirm: ({ confirm,
      NewPassword }) => {
      if (NewPassword && confirm && confirm !== NewPassword) {
        return i18next.t(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
      }
    },
    NewPassword: ({ confirm,
      NewPassword }) => {
      if (NewPassword && confirm && confirm !== NewPassword) {
        return i18next.t(LocaleKeys.SUBSCRIBER.PASSWORD_MATCH_ERROR);
      }
    }
  });
  values(dynamicFields)
    .forEach(({ key,
      label,
      validation }) => {
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

const createFieldMap = (fieldsObject, formValues) => {
  let fields = {};
  if (formValues) {
    const fieldKeys = Object.keys(fieldsObject);
    fields = Object.keys(formValues).reduce((prev, key) => {
      const value = formValues[key];
      const fieldKey = fieldKeys.find((field) => prev[field].key === key);

      if (fieldKey && value) {
        return prev.setIn([fieldKey, 'defaultValue'], value);
      }

      return prev;
    }, fieldsObject);
  }

  return fields;
};

export const LoginInfoFormFields = createSelector([
  Fields,
  LoginInfoFormValues
], (fields, formValues) => {
  return createFieldMap(fields, formValues);
});

export const LoginInfoFormFieldsFormatted = createSelector([
  LoginInfoFormFields
], (fields) => {
  return new Immutable(fields ? [
    [fields.current_password],
    [fields.new_password],
    [fields.confirm]
  ] : []);
});

export const ClientValidation = createSelector([
  LoginInfoFormFields
], GenerateClientValidationFunctions);
