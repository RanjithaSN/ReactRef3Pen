import path from 'ramda/src/path';
import { IsDbss } from '../configuration/configuration.selectors';
import { OfferingExternalReferenceData } from '../metadata/offerings/offerings.selectors';
import { BenifyDistributionChannel, DistributionChannel } from '../settings/settings.selectors';
import { CreateAsyncFromString } from '../utils/action.creator';
import * as ApiConstants from '../utils/api.constants';
import { apiThunkHelper } from '../utils/thunk.helpers';
import { AllExternalDisplayNames, OfferingContextIntent } from './offering.context.constants';

export const OrderingTypes = {
  RETRIEVE_OFFERING_CONTEXT: CreateAsyncFromString('RETRIEVE_OFFERING_CONTEXT'),
  RETRIEVE_OFFERING_CONTEXT_MODIFY: CreateAsyncFromString('RETRIEVE_OFFERING_CONTEXT_MODIFY'),
  RETRIEVE_ATTRIBUTES: CreateAsyncFromString('RETRIEVE_ATTRIBUTES'),
  UPDATE_OFFERING_CONTEXT: CreateAsyncFromString('UPDATE_OFFERING_CONTEXT')
};

const getOfferBasedHeaders = (state, offerId) => {
  const externalRef = OfferingExternalReferenceData(state);
  const benify = offerId === path([AllExternalDisplayNames.BENIFY, 'offerId'], externalRef);
  const headers = {
    [ApiConstants.DISTRIBUTION_CHANNEL_ID_HEADER]: !benify ? DistributionChannel(): BenifyDistributionChannel()
  };

  return headers;
};

export const RetrieveOfferingContext = (
  offeringId,
  offeringInstanceId,
  options,
  actions = OrderingTypes.RETRIEVE_OFFERING_CONTEXT
) => {
  return (dispatch, getState) => {
    const { intent, useSavedCart } = options;
    const state = getState();
    const isDbss = IsDbss(state);

    return apiThunkHelper(dispatch, state, actions, {
      method: 'post',
      url: 'Subscriber/RetrieveOfferingContext',
      data: {
        AdditionalShoppingCartUpdate: !isDbss,
        Offerings: [{
          Action: intent,
          OfferingId: offeringId,
          OfferingInstanceId: offeringInstanceId
        }],
        TransitionOutcomes: null,
        UseSavedShoppingCart: useSavedCart
      },
      headers: getOfferBasedHeaders(state, offeringId)
    }, {
      offeringInstanceId
    });
  };
};

export const RetrieveOfferingContextForModify = (
  offeringId,
  offeringInstanceId,
  completedDecisions,
  options,
  actions = OrderingTypes.RETRIEVE_OFFERING_CONTEXT_MODIFY
) => {
  return (dispatch, getState) => {
    const { intent, useSavedCart } = options;
    const state = getState();
    const isDbss = IsDbss(state);

    return apiThunkHelper(dispatch, getState(), actions, {
      method: 'post',
      url: 'Subscriber/RetrieveOfferingContext',
      data: {
        AdditionalShoppingCartUpdate: !isDbss,
        Offerings: [{
          Action: intent,
          OfferingId: offeringId,
          OfferingInstanceId: offeringInstanceId
        }],
        CompletedDecisionsList: completedDecisions,
        TransitionOutcomes: null,
        UseSavedShoppingCart: useSavedCart
      },
      headers: getOfferBasedHeaders(state, offeringId)
    }, {
      offeringInstanceId
    });
  };
};


export const UpdateOfferingContext = (
  offeringId,
  offeringInstanceId,
  completedDecisions,
  options
) => {
  return (dispatch, getState) => {
    const { intent, retrieveServiceAttributes } = options;
    const state = getState();
    const isDbss = IsDbss(state);

    const data = {
      AdditionalShoppingCartUpdate: !isDbss,
      Offerings: [{
        Action: intent,
        OfferingId: offeringId,
        OfferingInstanceId: offeringInstanceId
      }],
      CompletedDecisionsList: completedDecisions,
      RetrieveServiceAttributes: retrieveServiceAttributes || false,
      TransitionOutcomes: null
    };

    const params = {
      method: 'post',
      url: 'Subscriber/RetrieveOfferingContext',
      data,
      headers: getOfferBasedHeaders(state, offeringId)
    };

    return apiThunkHelper(dispatch, getState(), OrderingTypes.UPDATE_OFFERING_CONTEXT, params, {
      offeringInstanceId
    });
  };
};

export const RetrieveOfferingAttributes = (
  offeringId,
  offeringInstanceId,
  completedDecisions,
  options = {}
) => {
  return (dispatch, getState) => {
    const { intent, useSavedCart } = options;
    const isDbss = IsDbss(getState());

    return apiThunkHelper(dispatch, getState(), OrderingTypes.RETRIEVE_ATTRIBUTES, {
      method: 'post',
      url: 'Subscriber/RetrieveOfferingContext',
      data: {
        AdditionalShoppingCartUpdate: !isDbss,
        Offerings: [{
          Action: intent,
          OfferingId: offeringId,
          OfferingInstanceId: offeringInstanceId
        }],
        CompletedDecisionsList: useSavedCart ? [] : completedDecisions,
        RetrieveServiceAttributes: true,
        RetrievePhysicalInventoryDecisions: true,
        UseSavedShoppingCart: useSavedCart
      }
    }, {
      offeringInstanceId
    });
  };
};

export const RetrieveNewOfferingContext = (
  offeringId,
  offeringInstanceId,
  options
) => (
  (dispatch) => (
    dispatch(RetrieveOfferingContext(offeringId, offeringInstanceId, {
      intent: OfferingContextIntent.ADD,
      ...options
    }))
  )
);

export const RetrievePurchasedOfferingContext = (
  offeringId,
  offeringInstanceId,
  options
) => (
  (dispatch) => (
    dispatch(RetrieveOfferingContext(offeringId, offeringInstanceId, {
      intent: OfferingContextIntent.MODIFY,
      ...options
    }))
  )
);

export const RetrievePurchasedOfferingContextForModify = (
  offeringId,
  offeringInstanceId,
  options
) => (
  (dispatch) => (
    dispatch(RetrieveOfferingContextForModify(offeringId, offeringInstanceId, [], {
      intent: OfferingContextIntent.MODIFY,
      ...options
    }))
  )
);

export const UpdateNewOfferingContext = (
  offeringId,
  offeringInstanceId,
  completedDecisions
) => (
  (dispatch) => (
    dispatch(UpdateOfferingContext(offeringId, offeringInstanceId, completedDecisions, {
      intent: OfferingContextIntent.ADD,
      retrieveServiceAttributes: true
    }))
  )
);

export const UpdatePurchasedOfferingContext = (
  offeringId,
  offeringInstanceId,
  completedDecisions
) => (
  (dispatch) => (
    dispatch(UpdateOfferingContext(offeringId, offeringInstanceId, completedDecisions, {
      intent: OfferingContextIntent.MODIFY,
      retrieveServiceAttributes: true
    }))
  )
);

export const RetrieveNewOfferingAttributes = (
  offeringId,
  offeringInstanceId,
  completedDecisions,
  useSavedCart
) => (
  (dispatch) => (
    dispatch(RetrieveOfferingAttributes(offeringId, offeringInstanceId, completedDecisions, {
      intent: OfferingContextIntent.ADD,
      useSavedCart
    }))
  )
);

export const RetrievePurchasedOfferingAttributes = (
  offeringId,
  offeringInstanceId,
  completedDecisions,
  useSavedCart
) => (
  (dispatch) => (
    dispatch(RetrieveOfferingAttributes(offeringId, offeringInstanceId, completedDecisions, {
      intent: OfferingContextIntent.MODIFY,
      useSavedCart
    }))
  )
);
