import { PAYMENT_INSTRUMENT_TYPES } from '@selfcare/core/constants/payment.instrument.constants';
import { generatePaymentMethodDescriptor, isPaymentMethodExpired } from '../components/paymentInstrument/adyenExternalPaymentMethod/payment.method.helper';
import { generateCreditCardDescriptor, isCreditCardExpired } from '../components/paymentInstrument/creditCard/credit.card.helper';

export const isExpired = (paymentInstrument) => {
  switch (paymentInstrument.Type) {
  case PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD:
    return isCreditCardExpired(paymentInstrument);
  case PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT:
    return isPaymentMethodExpired(paymentInstrument);
  default:
    return false;
  }
};

export const generateDescriptor = (paymentInstrument, types) => {
  switch (paymentInstrument.Type) {
  case PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD:
    return generateCreditCardDescriptor(types, paymentInstrument);
  case PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT:
    return generatePaymentMethodDescriptor(paymentInstrument);
  default:
    return paymentInstrument.Name;
  }
};
