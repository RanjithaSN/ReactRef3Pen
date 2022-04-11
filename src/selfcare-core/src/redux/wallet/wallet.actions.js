import { ACCESSED_SUBSCRIBER_ID_HEADER } from '../../constants/subscriber';
import { RetrieveCodes } from '../metadata/codes/codes.actions';
import { CODES } from '../metadata/codes/codes.constants';
import { CodeLoaded } from '../metadata/codes/codes.selectors';
import { RetrievePaymentInstrument } from '../paymentInstrument/payment.instrument.actions';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const WalletTypes = {
  RetrieveWallet: CreateAsyncFromString('RETRIEVE_WALLET')
};

export const RetrieveWallet = (subscriberId) => {
  return async (dispatch, getState) => {
    const headers = {};
    if (subscriberId) {
      headers[ACCESSED_SUBSCRIBER_ID_HEADER] = subscriberId;
    }
    const wallet = await apiThunkHelper(dispatch, getState(), WalletTypes.RetrieveWallet, {
      method: 'post',
      url: 'subscriber/RetrieveWallet',
      headers
    });

    if (wallet.PaymentInstruments) {
      const codesMap = {
        [CODES.PaymentInstrumentType]: true
      };

      const promises = [];

      wallet.PaymentInstruments.forEach((paymentInstrument) => {
        if (paymentInstrument.CreditCard) {
          codesMap[CODES.CreditCardType] = true;
        } else if (paymentInstrument.BraintreeMethod) {
          codesMap[CODES.BraintreeSubType] = true;
        } else if (paymentInstrument.DirectDebit) {
          codesMap[CODES.DirectDebitSubType] = true;
        } else if (paymentInstrument.ExternalBill) {
          codesMap[CODES.Currency] = true;
          codesMap[CODES.ExternalBillType] = true;
        } else if (paymentInstrument.ExternalGiftCard) {
          codesMap[CODES.Currency] = true;
          codesMap[CODES.ExternalGiftCardType] = true;
        } else if (paymentInstrument.GiftCard) {
          codesMap[CODES.Currency] = true;
          codesMap[CODES.GiftCardType] = true;
        } else if (paymentInstrument.StoredValueAccount) {
          codesMap[CODES.BrandableCurrencyType] = true;
          codesMap[CODES.Currency] = true;
        } else if (paymentInstrument.XboxAccount) {
          codesMap[CODES.XBoxAccountType] = true;
        }

        promises.push(dispatch(RetrievePaymentInstrument(paymentInstrument.Id, subscriberId)));
      });

      Object.keys(codesMap).forEach((key) => {
        if (!CodeLoaded(key, getState())) {
          promises.push(dispatch(RetrieveCodes(key)));
        }
      });

      await Promise.all(promises);
    }

    return wallet;
  };
};
