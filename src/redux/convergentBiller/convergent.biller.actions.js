import { IsDbss } from '@selfcare/core/redux/configuration/configuration.selectors';
import { RetrieveConvergentBillerSummary } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import { CreateAsyncFromString } from '@selfcare/core/redux/utils/action.creator';
import { CurrentAccountIsManaged, CurrentManagedAccountObject } from '../account/account.selectors';
import { RetrieveSubscriberOfferingsOnce } from '../subscriberOfferings/subscriber.offerings.actions';

export const ConvergentBillerActionTypes = {
  RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS: CreateAsyncFromString('RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS')
};

export const RetrieveConvergentBillerSummaryDbss = (subscriberId) => {
  return async (dispatch, getState) => {
    const store = getState();

    if (IsDbss(store)) {
      let checkSubscriber = subscriberId;
      let type;
      if (!subscriberId && CurrentAccountIsManaged(store)) {
        checkSubscriber = CurrentManagedAccountObject(store).subscriberId;
      }
      if (checkSubscriber) {
        type = ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS;
      }
      await dispatch(RetrieveConvergentBillerSummary(checkSubscriber, type));
    }
  };
};

export const LeaveOrderConfirmationPage = (history, path) => {
  return async (dispatch) => {
    try {
      await dispatch(RetrieveSubscriberOfferingsOnce(true));
      // eslint-disable-next-line no-empty
    } catch (e) {}

    if (path) {
      history.push(path);
    }
  };
};
