import i18next from 'i18next';
import pathOr from 'ramda/src/pathOr';
import { formatDate } from 'selfcare-ui/src/utilities/localization/datetime';
import LocaleKeys from '../../../locales/keys';
import MasterCardLogo from '../creditCard/logos/mastercard.png';
import VisaLogo from '../creditCard/logos/visa.png';

let webSupported = false;
if (typeof window !== 'undefined' && window.Modernizr) {
  window.Modernizr.on('webp', (supported) => {
    webSupported = supported;
  });
}

const fetchWebpOrNormalImage = (image) => {
  if (webSupported) {
    return `${image}.webp`;
  }
  return image;
};

export const CARD_TYPE = {
  MASTERCARD: 'Mastercard',
  MC: 'MC',
  VISA: 'Visa',
  VISA_1: 'VISA'
};
export const getCardType = (instrument) => {
  if (instrument.Name) {
    const name = instrument.Name.slice(0, instrument.Name.indexOf('-'));
    switch (name.trim().toLocaleUpperCase()) {
    case CARD_TYPE.MC: return CARD_TYPE.MASTERCARD;
    case CARD_TYPE.VISA_1: return CARD_TYPE.VISA;
    default: return '';
    }
  }
};
export const getExpirationDate = (paymentInstrument) => {
  const expirationDate = new Date();
  // We set this to be the last millisecond the card is valid
  expirationDate.setFullYear(Number.parseInt(pathOr(0, ['ExternalBill', 'ExpirationYear'], paymentInstrument), 10), 10);
  // JavaScript dates have months 0 based...so this is the month AFTER the card expires.
  expirationDate.setMonth(Number.parseInt(pathOr(0, ['ExternalBill', 'ExpirationMonth'], paymentInstrument), 10));
  // 0 sets the date equal to the last day of the previous month
  expirationDate.setDate(0);
  expirationDate.setHours(23);
  expirationDate.setMinutes(59, 59, 999);
  // reset the month to the actual expiration month
  expirationDate.setMonth(Number.parseInt(pathOr(0, ['ExternalBill', 'ExpirationMonth'], paymentInstrument), 10) - 1);

  return expirationDate;
};

export const isPaymentMethodExpired = (paymentInstrument) => {
  const expirationDate = getExpirationDate(paymentInstrument);
  return (expirationDate.valueOf() < (new Date().valueOf()));
};

export const generatePaymentMethodDescriptor = (paymentInstrument) => {
  if (!paymentInstrument.Name) {
    const AccountNumber = pathOr('', ['ExternalBill', 'AccountNumber'], paymentInstrument);
    const lastFour = AccountNumber.substring(AccountNumber.length - 4);
    return i18next.t(LocaleKeys.PAYMENT_INSTRUMENT.CREDIT_CARD_DESCRIPTOR, {
      lastFour
    });
  }
  if (getCardType(paymentInstrument) === CARD_TYPE.MASTERCARD) {
    const lastnums = paymentInstrument.Name.substring(paymentInstrument.Name.length - 4);
    return i18next.t(LocaleKeys.PAYMENT_INSTRUMENT.CREDIT_CARD_DESCRIPTOR, {
      name: CARD_TYPE.MASTERCARD,
      lastFour: lastnums
    });
  }
  if (getCardType(paymentInstrument) === CARD_TYPE.VISA) {
    const lastnums = paymentInstrument.Name.substring(paymentInstrument.Name.length - 4);
    return i18next.t(LocaleKeys.PAYMENT_INSTRUMENT.CREDIT_CARD_DESCRIPTOR, {
      name: CARD_TYPE.VISA,
      lastFour: lastnums
    });
  }
  return paymentInstrument.Name;
};

export const formatDateAndMonth = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

export const generatePaymentMethodExpiration = (paymentInstrument, locale) => {
  const expirationDate = getExpirationDate(paymentInstrument);

  if (isPaymentMethodExpired(paymentInstrument)) {
    return i18next.t(LocaleKeys.PAYMENT_INSTRUMENT.EXPIRED_ON_TEMPLATE, {
      day: formatDateAndMonth(expirationDate.getDate()),
      month: formatDateAndMonth(expirationDate.getMonth() + 1),
      year: expirationDate.getFullYear().toString().substr(-2)
    });
  }
  return i18next.t(LocaleKeys.PAYMENT_INSTRUMENT.EXPIRES_ON_TEMPLATE, {
    date: formatDate(expirationDate, locale)
  });
};

export const getPaymentCardLogo = (instrument) => {
  const type = getCardType(instrument);
  switch (type) {
  case CARD_TYPE.MASTERCARD: return fetchWebpOrNormalImage(MasterCardLogo);
  case CARD_TYPE.VISA: return fetchWebpOrNormalImage(VisaLogo);
  default: return '';
  }
};
