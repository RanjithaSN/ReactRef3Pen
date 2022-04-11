import i18next from 'i18next';
import LocaleKeys from '../../../locales/keys';
import AmexLogo from './logos/amex.png';
import CartaSiLogo from './logos/carta.si.png';
import CarteBleueLogo from './logos/carte.bleue.png';
import DankortLogo from './logos/dankort.png';
import DeltaLogo from './logos/delta.png';
import DinersClubLogo from './logos/diners.club.png';
import DiscoverLogo from './logos/discover.png';
import GeMoneyLogo from './logos/ge.money.png';
import JcbLogo from './logos/jcb.png';
import LaserLogo from './logos/laser.png';
import MaestroLogo from './logos/maestro.png';
import MasterCardLogo from './logos/mastercard.png';
import SoloLogo from './logos/solo.png';
import UatpLogo from './logos/uatp.png';
import VisaElectronLogo from './logos/visa.electron.png';
import VisaLogo from './logos/visa.png';

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

export const getCreditCardLogo = (type) => {
  switch (type) {
  case 1:
  case 21: return fetchWebpOrNormalImage(VisaLogo);
  case 2:
  case 19:
  case 22: return fetchWebpOrNormalImage(MasterCardLogo);
  case 3: return fetchWebpOrNormalImage(AmexLogo);
  case 4: return fetchWebpOrNormalImage(DiscoverLogo);
  case 5: return fetchWebpOrNormalImage(JcbLogo);
  case 6: return fetchWebpOrNormalImage(DinersClubLogo);
  case 7:
  case 8: return fetchWebpOrNormalImage(MaestroLogo);
  case 9: return fetchWebpOrNormalImage(SoloLogo);
  case 10: return fetchWebpOrNormalImage(CarteBleueLogo);
  case 13: return fetchWebpOrNormalImage(GeMoneyLogo);
  case 14: return fetchWebpOrNormalImage(DeltaLogo);
  case 15: return fetchWebpOrNormalImage(VisaElectronLogo);
  case 16: return fetchWebpOrNormalImage(DankortLogo);
  case 17: return fetchWebpOrNormalImage(LaserLogo);
  case 18: return fetchWebpOrNormalImage(CartaSiLogo);
  case 20: return fetchWebpOrNormalImage(UatpLogo);
  default:
    return '';
  }
};

// todo: deprecate along with PaymentInstrument
export const generateCreditCardDescriptorWithExpiration = (paymentInstrument) => {
  return i18next.t(LocaleKeys.PAYMENT_INSTRUMENT.CREDIT_CARD_DESCRIPTOR_WITH_EXPIRATION, {
    name: paymentInstrument.Name,
    month: paymentInstrument.CreditCard.ExpirationMonth,
    year: paymentInstrument.CreditCard.ExpirationYear.slice(-2)
  });
};

// todo: deprecate along with PaymentInstrument
export const generateExpiredCreditCardDescriptor = (paymentInstrument) => {
  return i18next.t(LocaleKeys.PAYMENT_INSTRUMENT.EXPIRED_CREDIT_CARD_DESCRIPTOR, {
    name: paymentInstrument.Name
  });
};

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

export const isCreditCardExpired = (paymentInstrument) => {
  const expirationDate = getExpirationDate(paymentInstrument);
  return (expirationDate.valueOf() < (new Date().valueOf()));
};

export const generateCreditCardDescriptor = (creditCardTypes, paymentInstrument) => {
  if (!paymentInstrument.Name) {
    const { AccountNumber, Type } = paymentInstrument.CreditCard;
    const creditCardType = creditCardTypes.find(({ Value }) => Value === Number(Type));
    const lastFour = AccountNumber.substring(AccountNumber.length - 4);
    return i18next.t(LocaleKeys.PAYMENT_INSTRUMENT.CREDIT_CARD_DESCRIPTOR, {
      name: creditCardType ? creditCardType.Name : '',
      lastFour
    });
  }

  return paymentInstrument.Name;
};

export const generateCreditCardExpiration = (paymentInstrument) => {
  const expirationDate = getExpirationDate(paymentInstrument);
  const expirationTemplate = isCreditCardExpired(paymentInstrument) ?
    LocaleKeys.PAYMENT_INSTRUMENT.EXPIRED_ON_TEMPLATE :
    LocaleKeys.PAYMENT_INSTRUMENT.EXPIRES_ON_TEMPLATE;
  return i18next.t(expirationTemplate, {
    month: i18next.t(LocaleKeys.DATE.MONTHS_ABBREVIATED[expirationDate.getMonth() + 1]),
    year: expirationDate.getFullYear()
  });
};
