import { createSelector } from 'reselect';
import pathOr from 'ramda/src/pathOr';
import { SubscriberApi } from '../ascendon/ascendon.selectors';
import { PaymentInstrumentIsLoading } from '../paymentInstrument/payment.instrument.selectors';

const Base = createSelector([
  SubscriberApi
], (subscriberApi) => {
  return pathOr(null, ['wallet'], subscriberApi);
});

export const Wallet = createSelector([
  Base
], (base) => {
  return pathOr(null, ['data'], base);
});
export const WalletIsLoading = createSelector([
  Base,
  PaymentInstrumentIsLoading
], (base, paymentInstrumentIsLoading) => {
  return paymentInstrumentIsLoading || pathOr(false, ['isLoading'], base);
});

export const WalletIsLoaded = createSelector([
  Wallet,
  WalletIsLoading
], (data, isLoading) => {
  return data !== null && !isLoading;
});
