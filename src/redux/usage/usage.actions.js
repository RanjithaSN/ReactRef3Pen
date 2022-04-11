import { IsDbss } from '@selfcare/core/redux/configuration/configuration.selectors';
import { RetrieveConvergentBillerAccountUsageDetails } from '@selfcare/core/redux/convergentBillerAccountUsageDetails/convergent.biller.account.usage.details.actions';
import { CurrentAccountIsManaged, CurrentManagedAccountObject } from '../account/account.selectors';

export const RetrieveConvergentBillerAccountUsageDetailsDbss = (serviceId, startDate, endDate) => {
  return async (dispatch, getState) => {
    const store = getState();

    if (IsDbss(store)) {
      let subscriberId;
      if (CurrentAccountIsManaged(store)) {
        const sub = CurrentManagedAccountObject(store);
        subscriberId = sub.subscriberId;
      }
      await dispatch(RetrieveConvergentBillerAccountUsageDetails(subscriberId, serviceId, startDate, endDate));
    }
  };
};
