import { t } from 'i18next';
import isFuture from 'date-fns/is_future';
import endOfMonth from 'date-fns/end_of_month';
import string from 'yup/lib/string';
import LocaleKeys from '../../../locales/keys';
import { requiredError } from '../../../helpers/validation.helpers';

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

export const PaymentMethodFormValues = {
  ExpirationMonth: '',
  ExpirationYear: ''
};

export const PaymentMethodFormSchema = () => {
  return {
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
};
