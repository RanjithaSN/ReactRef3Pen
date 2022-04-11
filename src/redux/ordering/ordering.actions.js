import { OfferingExternalReferenceData } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { RetrieveNewOfferingContext, RetrievePurchasedOfferingContext } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { AllExternalDisplayNames } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import { SubscriberOfferings } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.selectors';
import path from 'ramda/src/path';
import API_FAULT_CODES from 'selfcare-core/src/constants/api.fault.codes';
import { AllowanceProduct } from '../products/products.selectors';
import { AllowanceMarketingTemplate } from './ordering.selectors';

export const OrderingTypes = {
  DECISION_BEING_MODIFIED: 'DECISION_BEING_MODIFIED',
  CALCULATING_DECISION_BEING_MODIFIED: 'CALCULATING_DECISION_BEING_MODIFIED',
  CLEAR_MODIFIED_DECISION_DATA: 'CLEAR_MODIFIED_DECISION_DATA',
  SETTING_ISOLATED_RETRIEVAL: 'SETTING_ISOLATED_RETRIEVAL',
  SET_IS_IN_BUNDLE_ORDER_FLOW: 'SET_IS_IN_BUNDLE_ORDER_FLOW',
  SET_IS_EXISTING_USER: 'SET_IS_EXISTING_USER',
  RETRIEVE_DECISIONS_FOR_OFFER_SAGA: 'RETRIEVE_DECISIONS_FOR_OFFER_SAGA'
};

export const DecisionBeingModified = (name, action, offerName) => ({
  type: OrderingTypes.DECISION_BEING_MODIFIED,
  payload: {
    name,
    action,
    offerName
  }
});

export const IsCalculatingDecisionBeingModified = (flag) => ({
  type: OrderingTypes.CALCULATING_DECISION_BEING_MODIFIED,
  payload: flag
});

export const RetrieveNonPurchasedDecisionsForSubscriber = () => {
  return async (dispatch, getState) => {
    const allowanceMarketingTemplate = AllowanceMarketingTemplate(getState());
    const subscriberAllowanceProduct = AllowanceProduct(getState());

    if (!subscriberAllowanceProduct.offeringInstanceId && allowanceMarketingTemplate) {
      await dispatch(RetrieveNewOfferingContext(allowanceMarketingTemplate.Id, allowanceMarketingTemplate.Id));
    }
  };
};

export const SettingIsolatedRetrieval = () => ({
  type: OrderingTypes.SETTING_ISOLATED_RETRIEVAL
});

export const RetrieveAvailableDecisionsForSubscriber = (offer) => {
  return async (dispatch, getState) => {
    const externalRef = OfferingExternalReferenceData(getState());
    const offerings = SubscriberOfferings(getState());
    const offersToGetRocFor = offerings.filter((offering) => {
      return offering.OfferingDetail.Status !== OFFERING_OVERALL_STATUS.ORDER_PENDING && offering.OfferingDetail.Status !== OFFERING_OVERALL_STATUS.REMOVED;
    });
    dispatch(RetrieveNonPurchasedDecisionsForSubscriber());

    if (offer) {
      const instanceId = offer.offeringInstanceId || offer.OfferingInstanceId;
      const offerToUse = offerings.find((offering) => {
        return offering.OfferingDetail.OfferingInstanceId === instanceId;
      });

      if (offerToUse && offerToUse.OfferingDetail.Status !== OFFERING_OVERALL_STATUS.ORDER_PENDING && offerToUse.OfferingDetail.Status !== OFFERING_OVERALL_STATUS.REMOVED) {
        dispatch(SettingIsolatedRetrieval());
        await dispatch(RetrievePurchasedOfferingContext(offer.OfferingId, offer.OfferingInstanceId));
      }
    } else {
      const options = {};

      await Promise.all(offersToGetRocFor.map(({ OfferingDetail }) => {
        // Passing non-purchased offering id to avoid pending offering failure since this is used for display purpose only
        dispatch(RetrievePurchasedOfferingContext(OfferingDetail.OfferingId, OfferingDetail.OfferingInstanceId, options)).catch((fault) => {
          if (fault && fault.Code === API_FAULT_CODES.PENDING_ACTIVATION) {
            dispatch(RetrievePurchasedOfferingContext(OfferingDetail.OfferingId, OfferingDetail.OfferingId));
          }
        });
      }));

      const mobilePendingProduct = offerings.find((Offering) => {
        if (Offering.OfferingDetail.Status === OFFERING_OVERALL_STATUS.ORDER_PENDING) {
          return Offering.OfferingDetail.OfferingId === path([AllExternalDisplayNames.MOBILE, 'offerId'], externalRef) ||
                        Offering.OfferingDetail.OfferingId === path([AllExternalDisplayNames.STUDENT_MOBILE, 'offerId'], externalRef) ||
                        Offering.OfferingDetail.OfferingId === path([AllExternalDisplayNames.CAMPAIGN_MOBILE, 'offerId'], externalRef);
        }
        return null;
      });

      const coaxPendingProduct = offerings.find((Offering) => {
        if (Offering.OfferingDetail.Status === OFFERING_OVERALL_STATUS.ORDER_PENDING) {
          return Offering.OfferingDetail.OfferingId === path([AllExternalDisplayNames.BROADBAND, 'offerId'], externalRef) ||
                        Offering.OfferingDetail.OfferingId === path([AllExternalDisplayNames.STUDENT_BROADBAND, 'offerId'], externalRef) ||
                        Offering.OfferingDetail.OfferingId === path([AllExternalDisplayNames.CAMPAIGN_BROADBAND, 'offerId'], externalRef);
        }
        return null;
      });

      const benifyPendingProduct = offerings.find((Offering) => {
        if (Offering.OfferingDetail.Status === OFFERING_OVERALL_STATUS.ORDER_PENDING) {
          return Offering.OfferingDetail.OfferingId === path([AllExternalDisplayNames.BENIFY, 'offerId'], externalRef);
        }
        return null;
      });

      // Run Benify Retrieve First otherwise feasibilityOptions will be empty
      if (benifyPendingProduct) {
        await dispatch(RetrievePurchasedOfferingContext(benifyPendingProduct.OfferingDetail.OfferingId, benifyPendingProduct.OfferingDetail.OfferingId, options));
      }

      if (mobilePendingProduct) {
        await dispatch(RetrievePurchasedOfferingContext(mobilePendingProduct.OfferingDetail.OfferingId, mobilePendingProduct.OfferingDetail.OfferingId, options));
      }

      if (coaxPendingProduct) {
        await dispatch(RetrievePurchasedOfferingContext(coaxPendingProduct.OfferingDetail.OfferingId, coaxPendingProduct.OfferingDetail.OfferingId));
      }
    }
  };
};

export const RetrieveDecisionsForOffers = (offersToFetch) => {
  return async (dispatch, getState) => {
    const externalRef = OfferingExternalReferenceData(getState());

    await Promise.all(Object.values(offersToFetch).map((name) => {
      const offerId = path([name, 'offerId'], externalRef);
      return dispatch(RetrieveNewOfferingContext(offerId, offerId));
    }));
  };
};

export const RetrieveDecisionsForOffersSagaAction = (offersToFetch, fetchOfferOptions) => {
  return {
    type: OrderingTypes.RETRIEVE_DECISIONS_FOR_OFFER_SAGA,
    offersToFetch,
    fetchOfferOptions
  };
};

export const ClearOrderingData = () => ({
  type: OrderingTypes.CLEAR_MODIFIED_DECISION_DATA
});

export const SetIsInBundleOrderFlow = (isBundle) => ({
  type: OrderingTypes.SET_IS_IN_BUNDLE_ORDER_FLOW,
  payload: isBundle
});

export const SetIsExistingUser = (isExistingUser) => ({
  type: OrderingTypes.SET_IS_EXISTING_USER,
  payload: isExistingUser
});
