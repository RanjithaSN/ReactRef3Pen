import { RetrieveAddresses } from '@selfcare/core/redux/address/address.actions';
import { AreAddressesLoaded, AreAddressesLoading } from '@selfcare/core/redux/address/address.selectors';
import { UserIsAvailable } from '../orderFlow/subscriberInformation/subscriber.information.selectors';

export const RetrieveAddressesOnce = () => {
  return async (dispatch, getState) => {
    const store = getState();
    if (UserIsAvailable(store) && !AreAddressesLoaded(store) && !AreAddressesLoading(store)) {
      await dispatch(RetrieveAddresses());
    }
  };
};
