import AppConfig from 'AppConfig';
import { EXTERNAL_PAYMENT, PAYMENT_INSTRUMENT_TYPES } from '@selfcare/core/constants/payment.instrument.constants';
import { DefaultBillingAddress, SubscriberAddresses } from '@selfcare/core/redux/address/address.selectors';
import { SupportedCreditCardTypes } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { SubscriberFullName } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import omit from 'ramda/src/omit';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { PaymentMethodFormSchema } from '../../components/paymentInstrument/adyenExternalPaymentMethod/payment.method.form.schema';
import { generateCreditCardDescriptor } from '../../components/paymentInstrument/creditCard/credit.card.helper';
import { CreditCardFormSchema } from '../../components/paymentInstrument/creditCardForm/credit.card.form.schema';
import { Client } from '../client.selectors';
import { Current3DS1MDValue, Current3DS1PaResValue, Current3DS1PaymentDataValue, ThreeDS1RedirectUrl } from '../threeDS/threeDS.selectors';

export const Base = createSelector([
  Client
], (client) => {
  return path(['paymentInstrumentForm'], client);
});

export const BillingAddressValues = createSelector([
  Base
], (base) => {
  return path(['billingAddressValues'], base);
});

export const UseExistingBillingAddress = createSelector([
  Base
], (base) => {
  return pathOr(false, ['useExistingBillingAddress'], base);
});

export const PaymentInstrumentDefault = createSelector([
  Base
], (base) => {
  return pathOr(false, ['default'], base);
});

export const PaymentInstrumentSavePayment = createSelector([
  Base
], (base) => {
  return pathOr(false, ['savePayment'], base);
});

export const SelectedBillingAddressId = createSelector([
  Base,
  UseExistingBillingAddress
], (base, useExistingBillingAddress) => {
  return useExistingBillingAddress ? path(['selectedBillingAddressId'], base) : null;
});

export const PaymentInstrumentType = createSelector([
  Base
], (base) => {
  return path(['paymentInstrumentType'], base);
});

export const PaymentInstrumentEditMode = createSelector([
  Base
], (base) => {
  return pathOr(false, ['editMode'], base);
});

export const ValidationSchema = createSelector([
  PaymentInstrumentType,
  UseExistingBillingAddress,
  PaymentInstrumentEditMode
], (paymentInstrumentType, useExistingBillingAddress, editMode) => {
  let baseSchema;
  switch (paymentInstrumentType) {
  case PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD:
    baseSchema = CreditCardFormSchema(editMode);
    break;
  case PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT:
    baseSchema = PaymentMethodFormSchema();
    break;
  default:
    baseSchema = CreditCardFormSchema(editMode);
  }

  if (useExistingBillingAddress || paymentInstrumentType === PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT) {
    return baseSchema;
  }
  return {
    ...baseSchema
  };
});

export const PaymentInstrumentValues = createSelector([
  Base
], (base) => {
  return path(['paymentInstrumentValues'], base);
});

export const EncryptedPaymentInstrument = createSelector([
  PaymentInstrumentDefault,
  PaymentInstrumentValues,
  DefaultBillingAddress,
  SubscriberFullName
], (
  paymentInstrumentDefault,
  paymentInstrumentValues,
  selectedBillingAddress,
  subscriberFullName
) => {
  return {
    Default: paymentInstrumentDefault,
    ExternalBill: {
      AccountNumber: new Date().getTime(),
      NameOnAccount: subscriberFullName,
      Type: AppConfig.ADYEN_PAYMENT_INSTRUMENT_BILL_TYPE,
      ExternalBillData: JSON.stringify({
        ...paymentInstrumentValues,
        storeDetails: true
      })
    },
    BillingAddressId: selectedBillingAddress.id,
    Name: `${Date.now()}`,
    Type: EXTERNAL_PAYMENT
  };
});

export const ThreeDSPaymentInstrument = createSelector([
  PaymentInstrumentDefault,
  PaymentInstrumentValues,
  DefaultBillingAddress,
  ThreeDS1RedirectUrl
], (
  paymentInstrumentDefault,
  paymentInstrumentValues,
  selectedBillingAddress,
  threeDS1RedirectUrl
) => {
  return {
    ThreeDSDetail: {
      MerchantData: JSON.stringify({
        ...paymentInstrumentValues,
        storeDetails: true
      }),
      ThreeDSRedirectUriReference: threeDS1RedirectUrl
    },
    PaymentInstrument: {
      BillingAddressId: selectedBillingAddress ? selectedBillingAddress.id : null,
      ExternalBill: {
        AccountNumber: new Date().getTime(),
        Type: AppConfig.ADYEN_PAYMENT_INSTRUMENT_BILL_TYPE
      },
      Type: EXTERNAL_PAYMENT,
      Name: `${Date.now()}`,
      Default: paymentInstrumentDefault
    }
  };
});

export const ThreeDSPaymentInstrumentFinalRequest = createSelector([
  PaymentInstrumentDefault,
  PaymentInstrumentValues,
  DefaultBillingAddress,
  Current3DS1MDValue,
  Current3DS1PaResValue,
  Current3DS1PaymentDataValue
], (
  paymentInstrumentDefault,
  paymentInstrumentValues,
  selectedBillingAddress,
  currentMDValue,
  currentPaResValue,
  currentPDValue
) => {
  const valuesAsString = JSON.stringify({
    MD: currentMDValue,
    PaRes: currentPaResValue
  });
  const paymentAuthenticationResult = valuesAsString.replace(/"/g, '\'');
  return {
    ThreeDSDetail: {
      MerchantData: currentPDValue,
      PaymentAuthenticationResult: paymentAuthenticationResult
    },
    PaymentInstrument: {
      BillingAddressId: selectedBillingAddress ? selectedBillingAddress.id : null,
      ExternalBill: {
        AccountNumber: new Date().getTime(),
        Type: AppConfig.ADYEN_PAYMENT_INSTRUMENT_BILL_TYPE
      },
      Type: EXTERNAL_PAYMENT,
      Name: `${Date.now()}`,
      Default: paymentInstrumentDefault
    }
  };
});

export const SubmittablePaymentInstrument = createSelector([
  PaymentInstrumentDefault,
  PaymentInstrumentType,
  PaymentInstrumentValues,
  BillingAddressValues,
  SupportedCreditCardTypes,
  UseExistingBillingAddress,
  SelectedBillingAddressId,
  PaymentInstrumentSavePayment,
  SubscriberAddresses
], (
  paymentInstrumentDefault,
  paymentInstrumentType,
  paymentInstrumentValues,
  billingAddressValues,
  creditCardTypes,
  useExistingBillingAddress,
  selectedBillingAddressId,
  savePayment,
  addresses
) => {
  let BillingAddress;
  let BillingAddressId;
  if (useExistingBillingAddress) {
    BillingAddressId = selectedBillingAddressId;
  } else {
    BillingAddress = {
      Id: billingAddressValues.Id,
      Name: billingAddressValues.addressLine1,
      LineOne: billingAddressValues.addressLine1,
      LineTwo: billingAddressValues.addressLine2,
      Country: billingAddressValues.country,
      City: billingAddressValues.city,
      State: billingAddressValues.region || billingAddressValues.state,
      PostalCode: billingAddressValues.postal_code || billingAddressValues.postalCode
    };
  }

  if (addresses.length > 0 && useExistingBillingAddress) {
    const selectedAddress = addresses.find((address) => address.Id === selectedBillingAddressId);
    BillingAddress = selectedAddress;
  }

  switch (paymentInstrumentType) {
  case PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD:
    return {
      Id: pathOr(null, ['Id'], paymentInstrumentValues),
      Type: paymentInstrumentType,
      Name: generateCreditCardDescriptor(creditCardTypes, {
        CreditCard: paymentInstrumentValues
      }),
      CreditCard: {
        ...paymentInstrumentValues,
        Type: paymentInstrumentValues.Type ? parseInt(paymentInstrumentValues.Type, 10) : paymentInstrumentValues.Type
      },
      Default: paymentInstrumentDefault,
      BillingAddress,
      BillingAddressId,
      SavePayment: savePayment
    };
  case PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT:
    return {
      ExternalBill: {
        ...omit(['Default'], paymentInstrumentValues)
      },
      Default: paymentInstrumentDefault
    };
  default:
    return null;
  }
});
