import { t } from 'i18next';
import isEmpty from 'ramda/src/isEmpty';
import pick from 'ramda/src/pick';
import LocaleKeys from '../locales/keys';

export const SUBMIT_ATTEMPTED = 'SUBMIT_ATTEMPTED';

export const digitsRegex = /^[0-9]+$/;

export const requiredError = (labelKey) => {
  return t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
    field: t(labelKey)
  });
};

export const minLengthError = (labelKey, min) => {
  return t(LocaleKeys.VALIDATION.MIN_LENGTH_TEMPLATE, {
    field: t(labelKey),
    min
  });
};

export const maxLengthError = (labelKey, max) => {
  return t(LocaleKeys.VALIDATION.MAX_LENGTH_TEMPLATE, {
    field: t(labelKey),
    max
  });
};

export const numbersOnlyError = (labelKey) => {
  return t(LocaleKeys.VALIDATION.NUMBERS_ONLY, {
    field: t(labelKey)
  });
};

export const checkForDisplayedErrors = (errors, touched) => {
  return Boolean(Object
    .keys(errors)
    .filter((key) => touched[key])
    .map((key) => errors[key])
    .length);
};

export const showFormError = ({ errors, status }) => {
  if (status === SUBMIT_ATTEMPTED) {
    return !isEmpty(errors);
  }
  return false;
};

export const filterVisibleErrors = ({ errors, status, touched }) => {
  if (status === SUBMIT_ATTEMPTED) {
    return errors;
  }
  return pick(
    Object.keys(errors).filter((key) => touched[key]),
    errors
  );
};

export const patternExists = (value, pattern, flag) => {
  const exp = new RegExp(pattern, flag);
  return exp.test(value);
};
