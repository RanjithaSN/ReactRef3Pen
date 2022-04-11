import { OfferingContextIntent } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { ClearSavedCart, RetrieveShoppingCartOfferings } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import pathOr from 'ramda/src/pathOr';
import { PersistOfferCart } from '../../cart/cart.actions';
import { CalculateChangeOfServiceOrderQuoteOnCheckout, CalculateQuote } from '../../checkout/checkout.actions';
import { DecisionBeingModified, IsCalculatingDecisionBeingModified, SettingIsolatedRetrieval } from '../../ordering/ordering.actions';
import { AllowanceMarketingTemplate, OfferingContextForDecisions } from '../../ordering/ordering.selectors';
import { AllowanceProduct } from '../../products/products.selectors';
import { SetActiveOfferContext, SetActiveOfferIds, UpdateDecisionGroupForHideNumber, UpdateDecisionGroupForPurchase, UpdateDecisionGroupForSimSwap, UpdateDecisionGroupOption } from '../order.flow.actions';

export const ToggleDecisionCartUpdate = (options) => {
  return async (dispatch) => {
    const isEditMode = true;

    dispatch(DecisionBeingModified(options.optionName, options.action, options.offerName));

    dispatch(SettingIsolatedRetrieval());
    dispatch(IsCalculatingDecisionBeingModified(true));
    await dispatch(UpdateDecisionGroupForPurchase(options, isEditMode));
    await dispatch(CalculateChangeOfServiceOrderQuoteOnCheckout({
      OfferingId: options.offeringId,
      OfferingInstanceId: options.offeringInstanceId
    }));

    dispatch(IsCalculatingDecisionBeingModified(false));
  };
};

export const DecisionCartUpdateForSimSwap = (options) => {
  return async (dispatch) => {
    const isEditMode = true;

    dispatch(DecisionBeingModified(options.optionName, options.action, options.offerName));

    dispatch(SettingIsolatedRetrieval());
    dispatch(IsCalculatingDecisionBeingModified(true));
    await dispatch(UpdateDecisionGroupForSimSwap(options, isEditMode));
    await dispatch(CalculateChangeOfServiceOrderQuoteOnCheckout({
      OfferingId: options.offeringId,
      OfferingInstanceId: options.offeringInstanceId
    }));

    dispatch(IsCalculatingDecisionBeingModified(false));
  };
};

export const DecisionCartUpdateForHideNumber = (options) => {
  return async (dispatch) => {
    const isEditMode = true;

    dispatch(DecisionBeingModified(options.optionName, options.action, options.offerName));

    dispatch(SettingIsolatedRetrieval());
    dispatch(IsCalculatingDecisionBeingModified(true));
    await dispatch(UpdateDecisionGroupForHideNumber(options, isEditMode));
    await dispatch(CalculateChangeOfServiceOrderQuoteOnCheckout({
      OfferingId: options.offeringId,
      OfferingInstanceId: options.offeringInstanceId
    }));

    dispatch(IsCalculatingDecisionBeingModified(false));
  };
};

export const DecisionCartUpdateForAllowance = (optionId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const purchasableContext = AllowanceMarketingTemplate(state);
    const allowanceProduct = AllowanceProduct(state);
    const decisionId = purchasableContext.Options[0].Id;
    await dispatch(ClearSavedCart());
    dispatch(SettingIsolatedRetrieval());
    dispatch(IsCalculatingDecisionBeingModified(true));

    let offeringContext;
    let offeringInstanceId;

    if (allowanceProduct.id) {
      offeringContext = OfferingContextForDecisions(state, allowanceProduct.id);
      offeringInstanceId = allowanceProduct.id;
    } else {
      offeringContext = OfferingContextForDecisions(state, purchasableContext.Id);
      offeringInstanceId = purchasableContext.Id;
    }

    const decisionToUpdate = offeringContext.Context.Decisions.find((item) => {
      return item.Id.substring(2) === decisionId;
    });

    const optionToModify = decisionToUpdate.Options.find((option) => {
      return option.Id === optionId;
    });

    const updatedDecision = {
      decisionId: decisionToUpdate.Id,
      planSwap: false,
      quantity: optionToModify.Quantity + 1,
      optionId: optionToModify.Id
    };

    dispatch(DecisionBeingModified(optionToModify.Name, OfferingContextIntent.ADD));

    await dispatch(SetActiveOfferIds(pathOr(null, ['Context', 'OfferingIds', 0], offeringContext), offeringInstanceId));
    await dispatch(SetActiveOfferContext(offeringContext));
    await dispatch(UpdateDecisionGroupOption(updatedDecision.decisionId, updatedDecision.optionId, updatedDecision.quantity, updatedDecision.planSwap));

    await dispatch(PersistOfferCart());
    await dispatch(RetrieveShoppingCartOfferings());

    await dispatch(CalculateQuote({
      OfferingId: purchasableContext.offeringId,
      OfferingInstanceId: allowanceProduct.offeringId || purchasableContext.offeringId
    }));
    await dispatch(IsCalculatingDecisionBeingModified(false));
  };
};
