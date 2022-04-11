import Immutable from 'seamless-immutable';

const CREDIT_CARD = 0;
export const EXTERNAL_PAYMENT = 4;
const PAYPAL = 5;
const BRAINTREE = 17;

export const PAYMENT_INSTRUMENT_TYPES = new Immutable({
  CREDIT_CARD,
  EXTERNAL_PAYMENT
});

export const EXTERNAL_ACCOUNT_TYPES = new Immutable({
  PAYPAL,
  BRAINTREE
});
