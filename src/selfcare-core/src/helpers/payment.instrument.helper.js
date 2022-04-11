import { PAYMENT_INSTRUMENT_TYPES } from '../constants/payment.instrument.constants';

// TODO: Duplicate helper in selfcare-ui, unfortunately we cannot cross repo boundaries. Get rid of when mono repo
export const getExpirationDate = (paymentInstrument) => {
  const expirationDate = new Date();
  // We set this to be the last millisecond the card is valid
  expirationDate.setFullYear(Number.parseInt(paymentInstrument.CreditCard.ExpirationYear, 10), 10);
  // JavaScript dates have months 0 based...so this is the month AFTER the card expires.
  expirationDate.setMonth(Number.parseInt(paymentInstrument.CreditCard.ExpirationMonth, 10));
  // 0 sets the date equal to the last day of the previous month
  expirationDate.setDate(0);
  expirationDate.setHours(23);
  expirationDate.setMinutes(59, 59, 999);
  // reset the month to the actual expiration month
  expirationDate.setMonth(Number.parseInt(paymentInstrument.CreditCard.ExpirationMonth, 10) - 1);

  return expirationDate;
};

// TODO: Duplicate helper in selfcare-ui, unfortunately we cannot cross repo boundaries. Get rid of when mono repo
export const isCreditCardExpired = (paymentInstrument) => {
  const expirationDate = getExpirationDate(paymentInstrument);
  return (expirationDate.valueOf() < (new Date().valueOf()));
};

export const isPaymentMethodExpired = (paymentInstrument) => {
  switch (paymentInstrument.Type) {
  case PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD:
    return isCreditCardExpired(paymentInstrument);
  case PAYMENT_INSTRUMENT_TYPES.E_CHECK:
  default:
    return false;
  }
};
