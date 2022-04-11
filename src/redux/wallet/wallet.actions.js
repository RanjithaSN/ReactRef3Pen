import { SubscriberIsLoaded } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { RetrieveWallet } from '@selfcare/core/redux/wallet/wallet.actions';
import { WalletIsLoaded, WalletIsLoading } from '@selfcare/core/redux/wallet/wallet.selectors';

export const RetrieveWalletOnce = () => {
  return async (dispatch, getState) => {
    const store = getState();

    if (
      SubscriberIsLoaded(store) &&
            !WalletIsLoaded(store) &&
            !WalletIsLoading(store)
    ) {
      await dispatch(RetrieveWallet());
    }
  };
};
