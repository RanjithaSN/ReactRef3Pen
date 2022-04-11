import { t } from 'i18next';
import isFuture from 'date-fns/is_future';
import endOfMonth from 'date-fns/end_of_month';
import string from 'yup/lib/string';
import LocaleKeys from '../../../locales/keys';
import {
  digitsRegex,
  requiredError,
  minLengthError,
  maxLengthError,
  numbersOnlyError
} from '../../../helpers/validation.helpers';

import './credit.card.form.scss';

const FormKeys = LocaleKeys.PAYMENT_INSTRUMENT.FORM;

function validateExpiration(expirationMonth) {
  const expirationYear = this.parent.ExpirationYear;
  if (!expirationMonth || !expirationYear) {
    return true;
  }
  const month = Number(expirationMonth) - 1;
  const date = endOfMonth(new Date(expirationYear, month));
  return isFuture(date);
}

export const CreditCardFormValues = {
  NameOnCard: '',
  AccountNumber: '',
  Cvv: '',
  ExpirationMonth: '',
  ExpirationYear: '',
  Type: ''
};

export const CreditCardFormSchema = (editMode) => {
  const schema = {
    NameOnCard: string()
      .required(requiredError(FormKeys.NAME_ON_CARD))
      .max(40, maxLengthError(FormKeys.NAME_ON_CARD, 40)),
    Cvv: string()
      .required(requiredError(FormKeys.CVV))
      .max(15, maxLengthError(FormKeys.CVV, 15))
      .matches(digitsRegex, numbersOnlyError(FormKeys.CVV)),
    ExpirationMonth: string()
      .nullable()
      .required(requiredError(FormKeys.EXPIRATION_MONTH))
      .test(
        'validate-expiration',
        t(FormKeys.EXPIRATION_FUTURE_ERROR),
        validateExpiration
      ),
    ExpirationYear: string()
      .nullable()
      .required(requiredError(FormKeys.EXPIRATION_YEAR))
  };
  if (editMode) {
    return schema;
  }
  return {
    ...schema,
    AccountNumber: string()
      .required(requiredError(FormKeys.CARD_NUMBER))
      .min(10, minLengthError(FormKeys.CARD_NUMBER, 10))
      .max(30, maxLengthError(FormKeys.CARD_NUMBER, 30))
      .matches(digitsRegex, numbersOnlyError(FormKeys.CARD_NUMBER)),
    Type: string()
      .required(requiredError(FormKeys.CARD_TYPE))
  };
};
