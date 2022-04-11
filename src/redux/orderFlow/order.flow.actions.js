import { DISPLAY_ORDER_ADDRESS, DISPLAY_ORDER_COS_PAYLOAD_ENABLER, DISPLAY_ORDER_FOR_ACTIVATION_DATE, DISPLAY_ORDER_FOR_PORT_IN_DATE, DISPLAY_ORDER_FOR_PORT_IN_INTENT, DISPLAY_ORDER_OSS, DISPLAY_ORDER_SERVICE_ID, DISPLAY_ORDER_UNIT_NUM } from './attributes/attributes.order.flow.constants';
import { FormattedAttributes, OfferingAttributes } from './attributes/attributes.order.flow.selectors';
import { OfferingIdsNeedingAttributeSelection } from './offeringContext/offering.context.selectors';
import { ActiveOfferId, ActiveOfferInstanceId, CompletedDecisions, SavedCompletedDecisionsForActiveOffer, SubscriberHasCurrentOffer, OfferStateByInstanceId } from './order.flow.selectors';
import { OFFER_STATE } from './order.flow.constants';
import { CompletedPhysicalInventoryDecisions } from './physicalInventory/physical.inventory.selectors';
import { CreateProspect } from './subscriberInformation/subscriber.information.actions';
import { UserIsAvailable } from './subscriberInformation/subscriber.information.selectors';
import { DECISION_TYPE } from '../../constants/order.constants';
import { ClearApiFault } from 'selfcare-core/src/redux/fault/fault.actions';
import { SetFeasibilityServiceId } from 'selfcare-core/src/redux/feasibility/feasibility.actions';
import { RetrieveCodes } from 'selfcare-core/src/redux/metadata/codes/codes.actions';
import { CODES } from 'selfcare-core/src/redux/metadata/codes/codes.constants';
import { RetrieveNewOfferingAttributes, RetrieveNewOfferingContext, RetrievePurchasedOfferingAttributes, UpdateNewOfferingContext, UpdatePurchasedOfferingContext } from 'selfcare-core/src/redux/offeringContext/offering.context.actions';
import { OfferingContextsByInstanceId, getPennyPlayOffering, getPennyPlayOfferingCart } from 'selfcare-core/src/redux/offeringContext/offering.context.selectors';
import { SaveOfferingCart } from 'selfcare-core/src/redux/savedCart/saved.cart.actions';
import { SearchMSISDNInventory } from 'selfcare-core/src/redux/searchInventory/search.inventory.actions';
import { SubscriberIsLoaded } from 'selfcare-core/src/redux/subscriber/subscriber.selectors';
import { getCheckoutNavItem, getConfigureOfferNavItem, getSubscriberInformationNavItem } from '../../navigation/sitemap.selectors';
import { PersistOfferCart } from '../cart/cart.actions';
import { IsCalculatingDecisionBeingModified } from '../ordering/ordering.actions';
import { BenifyMarketingTemplates, CurrentOfferIsMobile, MobileMarketingTemplates, OfferingContextForDecisions } from '../ordering/ordering.selectors';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';

export const OrderFlowTypes = {
  CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT: 'CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT',
  NAVIGATE_TO_DECISION_PAGE: 'NAVIGATE_TO_DECISION_PAGE',
  SAVE_COMPLETED_DECISIONS: 'SAVE_COMPLETED_DECISIONS',
  SET_ACTIVE_OFFER_CONTEXT: 'SET_ACTIVE_OFFER_CONTEXT',
  SET_ACTIVE_OFFER_IDS: 'SET_ACTIVE_OFFER_IDS',
  SET_DECISION_GROUP_OPTION_SELECTION: 'SET_DECISION_GROUP_OPTION_SELECTION',
  SET_OFFER_AS_CONFIGURED: 'SET_OFFER_AS_CONFIGURED',
  TOGGLE_DECISION_GROUP_OPTION_SELECTION: 'TOGGLE_DECISION_GROUP_OPTION_SELECTION',
  UPDATE_DECISION_GROUP_QUANTITY: 'UPDATE_DECISION_GROUP_QUANTITY',
  UPDATE_OPTION_ITEM_QUANTITY: 'UPDATE_OPTION_ITEM_QUANTITY',
  UPDATE_QUANTITY_DECISION: 'UPDATE_QUANTITY_DECISION'
};

export const SetActiveOfferIds = (offerId, offerInstanceId) => ({
  type: OrderFlowTypes.SET_ACTIVE_OFFER_IDS,
  payload: {
    offerId,
    offerInstanceId
  }
});

export const SetActiveOfferContext = (offerContext) => ({
  type: OrderFlowTypes.SET_ACTIVE_OFFER_CONTEXT,
  payload: offerContext
});

export const ClearActiveOfferIdAndContext = (offerInstanceId) => ({
  type: OrderFlowTypes.CLEAR_ACTIVE_OFFER_ID_AND_CONTEXT,
  payload: {
    offerInstanceId
  }
});

const SetOfferAsConfigured = (payload) => ({
  type: OrderFlowTypes.SET_OFFER_AS_CONFIGURED,
  payload
});

export const UpdateCart = (attributes = [], mobileSmsAndVoiceDecisionIds = []) => {
  return async (dispatch, getState) => {
    const state = getState();
    const activeOfferId = ActiveOfferId(state);
    const activeOfferInstanceId = ActiveOfferInstanceId(state);
    const savedDecisions = SavedCompletedDecisionsForActiveOffer(state);
    const decisions = CompletedDecisions(state);
    const formattedAttributes = FormattedAttributes(state);
    if (decisions.length && !formattedAttributes.length) {
      dispatch({
        type: OrderFlowTypes.SAVE_COMPLETED_DECISIONS,
        payload: {
          offerInstanceId: activeOfferInstanceId,
          completedDecisions: decisions
        }
      });
    }

    const portInIntent = formattedAttributes.find((formattedAttribute) => formattedAttribute.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_INTENT);
    const portInDate = formattedAttributes.find((formattedAttribute) => formattedAttribute.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_DATE);
    const activationDateIndex = formattedAttributes.findIndex((formattedAttribute) => formattedAttribute.DisplayOrder === DISPLAY_ORDER_FOR_ACTIVATION_DATE);
    const futureActivationIntent = formattedAttributes.find((formattedAttribute) => formattedAttribute.DisplayOrder === DISPLAY_ORDER_FOR_ACTIVATION_DATE);

    // If porting in a number, set activation date to the port in date
    if ((portInIntent && portInIntent.formValue !== portInIntent.SelectedValue)) {
      const { SelectedValue } = portInDate;
      formattedAttributes[activationDateIndex] = {
        ...formattedAttributes[activationDateIndex],
        SelectedValue
      };
    } else if (futureActivationIntent) {
      formattedAttributes[activationDateIndex] = {
        ...formattedAttributes[activationDateIndex],
        'SelectedValue': futureActivationIntent.SelectedValue
      };
    }

    const remappedFormattedDesicions = formattedAttributes.map((formattedAttribute) => ({
      DecisionType: formattedAttribute.DecisionType,
      Id: formattedAttribute.Id,
      InventoryItemReservation: formattedAttribute.InventoryItemReservation,
      Name: formattedAttribute.Name,
      OfferingId: formattedAttribute.OfferingId,
      PricingPlanId: formattedAttribute.PricingPlanId,
      SelectedValue: formattedAttribute.SelectedValue,
      ServiceFeatures: formattedAttribute.ServiceFeatures,
      ServiceInstanceId: formattedAttribute.ServiceInstanceId
    }));

    let completedDecisions = decisions;
    if (remappedFormattedDesicions.length && savedDecisions) {
      completedDecisions = savedDecisions.concat(remappedFormattedDesicions); // order flow in the attributes steps
    } else if (attributes.length) {
      completedDecisions = decisions.concat(attributes); // normal
    } else if (remappedFormattedDesicions.length) {
      completedDecisions = decisions.concat(remappedFormattedDesicions); // SIM SWAP
    }
    completedDecisions = completedDecisions.map((completedDecision) => {
      if (mobileSmsAndVoiceDecisionIds.includes(completedDecision.Id)) {
        return {
          ...completedDecision,
          Quantity: 1
        };
      }
      return completedDecision;
    });

    if (SubscriberHasCurrentOffer(state)) {
      await dispatch(UpdatePurchasedOfferingContext(activeOfferId, activeOfferInstanceId, completedDecisions));
    } else {
      await dispatch(UpdateNewOfferingContext(activeOfferId, activeOfferInstanceId, completedDecisions));
    }
  };
};

export const ToggleDecisionGroupOption = (decisionId, optionId) => {
  return async (dispatch) => {
    dispatch({
      type: OrderFlowTypes.TOGGLE_DECISION_GROUP_OPTION_SELECTION,
      payload: {
        decisionId,
        optionId
      }
    });

    return dispatch(UpdateCart());
  };
};

export const UpdateDecisionGroupOption = (decisionId, optionId, quantity) => {
  return async (dispatch) => {
    dispatch({
      type: OrderFlowTypes.UPDATE_DECISION_GROUP_QUANTITY,
      payload: {
        decisionId,
        optionId,
        quantity
      }
    });

    await dispatch(UpdateCart());
  };
};

export const RetrieveOfferingAttributes = (fromSavedCart = false, useSavedDecisions = false) => {
  return async (dispatch, getState) => {
    const state = getState();
    const activeOfferId = ActiveOfferId(state);
    const activeOfferInstanceId = ActiveOfferInstanceId(state);

    if (SubscriberHasCurrentOffer(state)) {
      await dispatch(
        RetrievePurchasedOfferingAttributes(
          activeOfferId,
          activeOfferInstanceId,
          CompletedDecisions(state).concat(CompletedPhysicalInventoryDecisions(state)),
          fromSavedCart
        )
      );
    } else {
      const decisions = useSavedDecisions ? SavedCompletedDecisionsForActiveOffer(state) : CompletedDecisions(state).concat(CompletedPhysicalInventoryDecisions(state));
      await dispatch(
        RetrieveNewOfferingAttributes(
          activeOfferId,
          activeOfferInstanceId,
          decisions,
          fromSavedCart
        )
      );
    }
  };
};

export const UpdateDecisionGroupForPurchase = (options, editMode = false) => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch(ClearApiFault());
    await dispatch(IsCalculatingDecisionBeingModified(true));
    await dispatch(SetActiveOfferIds(options.offeringId, options.offeringInstanceId));
    await dispatch(SetActiveOfferContext(OfferingContextForDecisions(state, options.offeringInstanceId)));

    await dispatch(ToggleDecisionGroupOption(options.decisionId, options.optionId));

    if (options.isDeselect) {
      await dispatch(ClearActiveOfferIdAndContext(options.offeringInstanceId));
    }

    if (options.serviceId) {
      await dispatch(SetFeasibilityServiceId(options.serviceId));
    }

    if (!editMode) {
      await dispatch(IsCalculatingDecisionBeingModified(false));
    }

    if (options.isDeselect) {
      const offeringIds = Object.keys(OfferStateByInstanceId(state) || {});

      if (offeringIds.length > 1) {
        //check if any other offer is there for re-selecting activeOfferId for further process
        const activeOffers = offeringIds.filter((activeOfferId) => {
          return activeOfferId !== options.offeringId && OfferStateByInstanceId(state)[activeOfferId] === OFFER_STATE.ACTIVE;
        });
        if (activeOffers.length) {
          await dispatch(SetActiveOfferIds(activeOffers[0], activeOffers[0]));
          await dispatch(SetActiveOfferContext(OfferingContextForDecisions(state, activeOffers[0])));
        }
      }
    }
  };
};

export const UpdateDecisionGroupForSimSwap = (options, editMode = false) => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch(ClearApiFault());
    await dispatch(IsCalculatingDecisionBeingModified(true));
    await dispatch(SetActiveOfferIds(options.offeringId, options.offeringInstanceId));
    await dispatch(SetActiveOfferContext(OfferingContextForDecisions(state, options.offeringInstanceId)));

    await dispatch(UpdateDecisionGroupOption(options.decisionId, options.optionId));

    if (options.isDeselect) {
      await dispatch(ClearActiveOfferIdAndContext(options.offeringInstanceId));
    }

    if (options.serviceId) {
      dispatch(SetFeasibilityServiceId(options.serviceId));
    }

    if (!editMode) {
      await dispatch(IsCalculatingDecisionBeingModified(false));
    }
  };
};

export const UpdateDecisionGroupForHideNumber = (options, editMode = false) => {
  return async (dispatch, getState) => {
    const state = getState();

    dispatch(ClearApiFault());
    await dispatch(IsCalculatingDecisionBeingModified(true));
    await dispatch(SetActiveOfferIds(options.offeringId, options.offeringInstanceId));
    await dispatch(SetActiveOfferContext(OfferingContextForDecisions(state, options.offeringInstanceId)));

    await dispatch(UpdateDecisionGroupOption(options.decisionId, options.optionId));

    if (options.isDeselect) {
      await dispatch(ClearActiveOfferIdAndContext(options.offeringInstanceId));
    }

    if (options.serviceId) {
      dispatch(SetFeasibilityServiceId(options.serviceId));
    }

    if (!editMode) {
      await dispatch(IsCalculatingDecisionBeingModified(false));
    }
  };
};

export const UpdateAttributesForPurchase = (options) => {
  return async (dispatch, getState) => {
    const data = OfferingContextsByInstanceId(getState());
    const valueAttributes = pathOr([], [options.offeringInstanceId, 'Context', 'ValueDecisions'], data);
    let attributes;
    if (valueAttributes.length) {
      let broadbandAttributes = {
        address: valueAttributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_ADDRESS),
        cosPayloadEnabler: valueAttributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_COS_PAYLOAD_ENABLER)
      };
      if (options.isBroadband) {
        broadbandAttributes = {
          ...broadbandAttributes,
          ossId: valueAttributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_OSS),
          serviceId: valueAttributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_SERVICE_ID),
          unitNum: valueAttributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_UNIT_NUM)
        };
      }
      attributes = Object.keys(broadbandAttributes).map((attribute) => {
        const value = options[attribute] || path([attribute, 'SelectedValue'], broadbandAttributes);
        return {
          Id: broadbandAttributes[attribute].Id,
          Name: broadbandAttributes[attribute].Name,
          DecisionType: DECISION_TYPE.SERVICE_ATTRIBUTE,
          SelectedValue: attribute === 'cosPayloadEnabler' ? Date.now() : value,
          OfferingId: options.offeringId,
          ServiceInstanceId: broadbandAttributes[attribute].ServiceInstanceId
        };
      });
    }
    await dispatch(UpdateCart(attributes, options.smsAndVoiceIds));
  };
};

const NavigateToCustomerInfoOrCheckout = (push) => (
  async (dispatch, getState) => {
    const state = getState();
    if (!SubscriberIsLoaded(state)) { // All ids configured, go to the next page
      push(getSubscriberInformationNavItem().url);
    } else {
      push(getCheckoutNavItem().url);
    }
  }
);

export const CheckForAttributes = (push) => (
  async (dispatch, getState) => {
    await dispatch(RetrieveOfferingAttributes(false, true));
    if (CurrentOfferIsMobile(getState())) {
      dispatch(RetrieveCodes(CODES.InventoryStore));
      await dispatch(SearchMSISDNInventory());
    }

    const offerKeys = Object.keys(OfferingAttributes(getState()));
    if (offerKeys.length > 0) {
      push(`${getConfigureOfferNavItem().url}/${ActiveOfferInstanceId(getState())}`);
    } else {
      await dispatch(UpdateCart());
      return dispatch(NavigateToCustomerInfoOrCheckout(push));
    }
  }
);

export const NavigateFromAttributes = ({ push }) => (
  async (dispatch, getState) => {
    const instanceId = ActiveOfferInstanceId(getState());
    await dispatch(SetOfferAsConfigured({
      offerInstanceId: instanceId
    }));

    await dispatch(UpdateCart());
    await dispatch(PersistOfferCart());

    // See if we need to configure more attributes
    const idsToConfigure = OfferingIdsNeedingAttributeSelection(getState());
    if (idsToConfigure.length > 0) {
      // We got more offers to configure, redirect back to the attributes page
      const nextId = idsToConfigure[0];
      await dispatch(SetActiveOfferIds(nextId, nextId));
      await dispatch(SetActiveOfferContext(OfferingContextForDecisions(getState(), nextId)));
      await dispatch(RetrieveOfferingAttributes(false, true));
      if (CurrentOfferIsMobile(getState())) {
        dispatch(RetrieveCodes(CODES.InventoryStore));
        await dispatch(SearchMSISDNInventory());
      }
      push(`${getConfigureOfferNavItem().url}/${ActiveOfferInstanceId(getState())}`);
    } else {
      return dispatch(NavigateToCustomerInfoOrCheckout(push));
    }
  }
);

export const UpdateForDefaultBenifyPurchase = (push) => {
  return async (dispatch, getState) => {
    const mobileProduct = BenifyMarketingTemplates(getState());
    const primaryDecisionId = pathOr('_', ['PrimaryDecisions', 'Id'], mobileProduct).split('_')[1];
    const decisionOption = pathOr([], ['Options'], mobileProduct).find(({ Id }) => (Id === primaryDecisionId));
    const defaultOption = pathOr([], ['OptionPrices'], decisionOption).find(({ IsDefault }) => IsDefault);

    await dispatch(UpdateDecisionGroupForPurchase({
      offeringId: path(['Id'], mobileProduct),
      offeringInstanceId: path(['Id'], mobileProduct),
      decisionId: path(['PrimaryDecisions', 'Id'], mobileProduct),
      optionId: path(['Id'], defaultOption)
    }));

    await dispatch(CheckForAttributes(push));
  };
};

export const UpdateForDefaultMobilePurchase = (push) => {
  return async (dispatch, getState) => {
    const mobileProduct = MobileMarketingTemplates(getState());
    const primaryDecisionId = pathOr('_', ['PrimaryDecisions', 'Id'], mobileProduct).split('_')[1];
    const decisionOption = pathOr([], ['Options'], mobileProduct).find(({ Id }) => (Id === primaryDecisionId));
    const defaultOption = pathOr([], ['OptionPrices'], decisionOption).find(({ IsDefault }) => IsDefault);

    await dispatch(UpdateDecisionGroupForPurchase({
      offeringId: path(['Id'], mobileProduct),
      offeringInstanceId: path(['Id'], mobileProduct),
      decisionId: path(['PrimaryDecisions', 'Id'], mobileProduct),
      optionId: path(['Id'], defaultOption)
    }));

    await dispatch(CheckForAttributes(push));
  };
};

export const CreateCartForPlayPurchase = (push) => {
  return async (dispatch, getState) => {
    const pennyPlayOffering = getPennyPlayOffering(getState());
    await dispatch(RetrieveNewOfferingContext(pennyPlayOffering.Id, pennyPlayOffering.Id, {}));
    const cart = getPennyPlayOfferingCart(getState(), pennyPlayOffering.Id);
    const haveUser = UserIsAvailable(getState());
    if (!haveUser) {
      await dispatch(CreateProspect());
    }
    await dispatch(SaveOfferingCart(cart));
    await dispatch(NavigateToCustomerInfoOrCheckout(push));
  };
};
