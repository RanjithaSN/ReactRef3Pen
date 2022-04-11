
import { ClearConvergentBillerAccounts } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import { RetrieveSubscriberOrProspect } from '../createSubscriber/create.subscriber.actions';
import { RetrieveSubscriberOfferingsOnce, RetrieveOfferingExternalReferenceData } from '../subscriberOfferings/subscriber.offerings.actions';

export const AccountTypes = {
  SetRetrieveSubscriberAndAccountsLoaded: 'SET_RETRIEVE_SUBSCRIBER_AND_ACCOUNTS_LOADED'
};

export const SetRetrieveSubscriberAndAccountsLoaded = (isLoaded) => ({
  type: AccountTypes.SetRetrieveSubscriberAndAccountsLoaded,
  payload: isLoaded
});

export const RetrieveUserAccountInformation = (intBetweenCheckout = false) => {
  return async (dispatch) => {
    if (!intBetweenCheckout) {
      try {
        await dispatch(RetrieveSubscriberOfferingsOnce());
        // eslint-disable-next-line no-empty
      } catch (e) {}
    } else {
      await dispatch(RetrieveOfferingExternalReferenceData());
    }

    // ensure that Subscriber and Account information is loaded.
    await dispatch(SetRetrieveSubscriberAndAccountsLoaded(true));
    // ensure that account will reload on next dashboard page load.
    dispatch(ClearConvergentBillerAccounts());
  };
};

export const RetrieveSubscriberAndAccounts = () => {
  return async (dispatch) => {
    await dispatch(RetrieveSubscriberOrProspect());
  };
};
