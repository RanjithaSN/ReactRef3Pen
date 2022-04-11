import compose from 'ramda/src/compose';
import pathOr from 'ramda/src/pathOr';
import prop from 'ramda/src/prop';
import sortBy from 'ramda/src/sortBy';
import toLower from 'ramda/src/toLower';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { PAYMENT_INSTRUMENT_TYPES } from '../../constants/payment.instrument.constants';
import { SubscriberApi } from '../ascendon/ascendon.selectors';
import { CODES } from '../metadata/codes/codes.constants';
import { CodeItems } from '../metadata/codes/codes.selectors';

export const EMPTY_ARRAY = new Immutable([]);
export const EMPTY_OBJECT = new Immutable({});

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['paymentInstrument'], subscriberApi);
});

export const PaymentInstruments = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});

export const DefaultPaymentInstrument = createSelector([
  PaymentInstruments
], (paymentInstruments) => {
  if (!paymentInstruments) {
    return null;
  }
  const defaultPaymentInstrumentId = Object.keys(paymentInstruments).find((id) => {
    return paymentInstruments[id].Default;
  });
  return paymentInstruments[defaultPaymentInstrumentId];
});

export const IsCreatingPaymentInstrument = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isCreating'], base);
});

export const PaymentInstrumentIsLoading = createSelector([
  Base,
  IsCreatingPaymentInstrument
], (base, isCreating) => {
  return pathOr(false, ['isLoading'], base) || isCreating;
});

export const PaymentInstrumentsList = createSelector([
  PaymentInstruments
], (paymentInstrumentsObj) => {
  const sortByNameCaseInsensitive = sortBy(compose(toLower, prop('Name')));
  return paymentInstrumentsObj ? sortByNameCaseInsensitive(Object.values(paymentInstrumentsObj)) : EMPTY_ARRAY;
});

export const PaymentInstrumentIsUpdating = createSelector([
  Base
], (base) => {
  return pathOr(false, ['isUpdating'], base);
});

const coerce = (values, key, typeObject) => {
  return values.map((value) => ({
    ...value,
    [key]: typeObject(value[key])
  }));
};

export const SupportedCreditCardTypes = createSelector([
  CodeItems(CODES.CreditCardType)
], (types) => {
  return coerce(types, 'Value', Number);
});

export const SupportedPaymentInstruments = createSelector([
  PaymentInstrumentsList
], (instruments) => {
  const types = Object.values(PAYMENT_INSTRUMENT_TYPES);
  return instruments.filter(({ Type }) => types.includes(Type));
});

export const ExistingSupportedPaymentInstruments = createSelector([
  SupportedPaymentInstruments
], (instruments) => {
  return instruments.filter((instrument) => {
    return typeof instrument.Id !== 'string';
  });
});
