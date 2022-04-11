import { SupportedPaymentInstruments } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { createSelector } from 'reselect';

export const DefaultPaymentInstrument = createSelector(
  SupportedPaymentInstruments,
  (instruments) => {
    const defaultInstrument = instruments.find(({ Default }) => Default);

    if (defaultInstrument) {
      return defaultInstrument;
    }

    return null;
  }
);
