import { IsDbss } from '@selfcare/core/redux/configuration/configuration.selectors';
import { RetrieveConvergentBillerSummary } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import { IsConvergentBillerSummaryLoading } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.selectors';
import { FetchOfferExternalIdMetaData } from '@selfcare/core/redux/metadata/offerings/offerings.actions';
import { AllExternalDisplayNames } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { SearchSubscriberInventory } from '@selfcare/core/redux/subscriberInventory/subscriber.inventory.actions';
import { SubscriberInventoryIsLoaded, SubscriberInventoryIsLoading } from '@selfcare/core/redux/subscriberInventory/subscriber.inventory.selectors';
import { RetrieveSubscriberOfferings } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.actions';
import { SubscriberOfferingsIsLoaded, SubscriberOfferingsIsLoading } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.selectors';
import { ManagedAccountSubscriberId } from '../account/account.selectors';
import { RetrieveAvailableDecisionsForSubscriber } from '../ordering/ordering.actions';
import { RetrieveSingleProductForEachBroadbandOffering } from '../products/serviceFeatures/product.service.feature.actions';

export const RefreshSubscriberOfferings = (offer) => (
  async (dispatch, getState) => {
    const store = getState();

    if (!SubscriberOfferingsIsLoading(store)) {
      await dispatch(RetrieveSubscriberOfferings(ManagedAccountSubscriberId(store)));

      if (IsDbss(store) && !IsConvergentBillerSummaryLoading(store)) {
        await dispatch(RetrieveConvergentBillerSummary());
      }
    }

    if (!SubscriberInventoryIsLoading(store) && !offer) {
      await dispatch(SearchSubscriberInventory(ManagedAccountSubscriberId(store)));
    }

    const offering = offer ? {
      OfferingInstanceId: offer.OfferingInstanceId || offer.offeringInstanceId,
      OfferingId: offer.OfferingId || offer.offeringId
    } : null;

    await dispatch(RetrieveAvailableDecisionsForSubscriber(offering));
  }
);

export const SearchSubscriberInventoryOnce = () => (
  async (dispatch, getState) => {
    const store = getState();

    if (!SubscriberInventoryIsLoading(store) &&
            !SubscriberInventoryIsLoaded(store)) {
      await dispatch(SearchSubscriberInventory());
    }
  }
);

export const RetrieveSubscriberOfferingsOnce = (forceReload = false) => (
  async (dispatch, getState) => {
    const store = getState();

    if (forceReload || (!SubscriberOfferingsIsLoading(store) &&
            !SubscriberOfferingsIsLoaded(store))) {
      await dispatch(RetrieveSubscriberOfferings());
      await dispatch(FetchOfferExternalIdMetaData(AllExternalDisplayNames));
      await dispatch(RetrieveAvailableDecisionsForSubscriber());
      await dispatch(RetrieveSingleProductForEachBroadbandOffering());
      await dispatch(SearchSubscriberInventoryOnce());
    }
  }
);

export const RetrieveOfferingExternalReferenceData = () => (
  async (dispatch) => {
    await dispatch(FetchOfferExternalIdMetaData(AllExternalDisplayNames));
  }
);
