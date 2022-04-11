import { OrderingTypes } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { SavedCartTypes } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import { t } from 'i18next';
import groupBy from 'ramda/src/groupBy';
import pathOr from 'ramda/src/pathOr';
import prop from 'ramda/src/prop';
import uniq from 'ramda/src/uniq';
import Immutable from 'seamless-immutable';
import { DECISION_TYPE } from '../../../constants/order.constants';
import { LOCAL_SWEDISH_MOBILE_REGEX } from '../../../constants/validation.constants';
import LocaleKeys from '../../../locales/keys';
import { AttributesOrderFlowTypes } from './attributes.order.flow.action';
import { DISPLAY_ORDER_FOR_PORT_IN_NUMBER } from './attributes.order.flow.constants';

const EMPTY_DG_OPT_ID = undefined;
const DECISION_TYPES = [DECISION_TYPE.DECISION_GROUP, DECISION_TYPE.QUANTITY];
const formatAttributes = (valueDecisions) => {
  const decisionGroups = groupBy(prop('DecisionGroupOptionId'))(valueDecisions);
  let quantityGroups;

  if (decisionGroups[EMPTY_DG_OPT_ID]) {
    quantityGroups = groupBy(prop('OfferingOptionPriceId'))(decisionGroups[EMPTY_DG_OPT_ID]);
    delete decisionGroups[EMPTY_DG_OPT_ID];
  }

  return {
    [DECISION_TYPE.DECISION_GROUP]: decisionGroups,
    [DECISION_TYPE.QUANTITY]: quantityGroups
  };
};

const attributesByDecisionInitial = Immutable({});
export const attributesByDecision = (state = attributesByDecisionInitial, { payload = {}, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
    return attributesByDecisionInitial;
  case OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS: {
    const attributeGroups = formatAttributes(payload.Context.ValueDecisions);
    let newState = state;

    DECISION_TYPES.forEach((decisionType) => {
      const decisionKeys = Object.keys(pathOr({}, [decisionType], attributeGroups));

      newState = newState.merge(decisionKeys.reduce((acc, key) => {
        const attributes = pathOr({}, [decisionType, key], attributeGroups);
        const values = attributes.reduce((result, { Id, SelectedValue }) => {
          if (SelectedValue) {
            return result.setIn([Id, 'value'], SelectedValue);
          }

          return result;
        }, Immutable({}));
        return acc
          .setIn(['attributes', decisionType, key], attributes)
          .setIn(['values', decisionType, key], values);
      }, newState), {
        deep: true
      });
    });

    return newState;
  }
  case AttributesOrderFlowTypes.UPDATE_ATTRIBUTE_VALUE: {
    let { value } = payload;

    if ((!payload.isRequired && value === t(LocaleKeys.OFFER_ATTRIBUTES.NO_SELECTION)) || value === '') {
      value = undefined;
    }

    let portInNumberInvalid = state.portInNumberInvalid;
    if (payload.attributeDisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_NUMBER) {
      const mobileRegex = new RegExp(LOCAL_SWEDISH_MOBILE_REGEX.pattern, LOCAL_SWEDISH_MOBILE_REGEX.flag);
      portInNumberInvalid = !(mobileRegex.test(value));
    }

    return state
      .setIn(['values', payload.decisionType, payload.optionId, payload.attributeId, 'value'], value)
      .set('portInNumberInvalid', portInNumberInvalid);
  }
  default:
    return state;
  }
};

const attributeDecisionInfoInitial = null;
export const attributeDecisionInfo = (state = attributeDecisionInfoInitial, { type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
  case OrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS:
  case SavedCartTypes.SAVE_OFFERING_CART.SUCCESS:
    return attributeDecisionInfoInitial;
  default:
    return state;
  }
};

const attributePresentAndValidInitial = Immutable({});
export const attributePresentAndValid = (state = attributePresentAndValidInitial, { payload = null, type }) => {
  switch (type) {
  case SavedCartTypes.CLEAR_SAVED_CART.SUCCESS:
    return attributePresentAndValidInitial;
  case OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS: {
    const attributeGroups = formatAttributes(payload.Context.ValueDecisions);
    let newState = state;

    DECISION_TYPES.forEach((decisionType) => {
      const decisionKeys = uniq([
        ...Object.keys(pathOr({}, [decisionType], attributeGroups)),
        ...Object.keys(pathOr({}, ['attributeState', decisionType], newState))
      ]);
      decisionKeys.forEach((key) => {
        newState = newState.setIn(['attributeState', decisionType, key, 'present'], Boolean(pathOr(false, [decisionType, key], attributeGroups)));

        if (pathOr(false, ['attributeState', decisionType, key, 'updating'], newState)) {
          newState = newState.setIn(['attributeState', decisionType, key, 'valid'], false);
        }
      });
    });
    return newState;
  }
  default:
    return state;
  }
};
