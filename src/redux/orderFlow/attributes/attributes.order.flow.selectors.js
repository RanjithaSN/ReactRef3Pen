import { FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX } from '@selfcare/core/constants/subscriber';
import { MSISDNInventoryItems } from '@selfcare/core/redux/searchInventory/search.inventory.selectors';
import format from 'date-fns/format';
import compose from 'ramda/src/compose';
import filter from 'ramda/src/filter';
import groupBy from 'ramda/src/groupBy';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { DECISION_TYPE } from '../../../constants/order.constants';
import { OfferingContextValueDecisions } from '../offeringContext/offering.context.selectors';
import { ActiveOfferId, ActiveOfferInstanceId, BaseOrdering } from '../order.flow.selectors';
import { DISPLAY_ORDER_ADDRESS, DISPLAY_ORDER_FOR_ACTIVATION_DATE, DISPLAY_ORDER_FOR_PORT_IN_DATE, DISPLAY_ORDER_FOR_PORT_IN_INTENT, DISPLAY_ORDER_FOR_PORT_IN_NUMBER, DISPLAY_ORDER_FOR_SIM_SWAP, DISPLAY_ORDER_OSS, DISPLAY_ORDER_SERVICE_ID, DISPLAY_ORDER_UNIT_NUM } from './attributes.order.flow.constants';
import { shouldShowAttribute, sortTransformAnnotate, ensureValidSelectedValues, isRequiredField } from './attributes.order.flow.helper';

const EMPTY_OBJECT = {};
export const Attributes = createSelector(
  BaseOrdering,
  (ordering) => pathOr(EMPTY_OBJECT, ['attributesByDecision'], ordering)
);

export const AttributesPresentAndValid = createSelector(
  BaseOrdering,
  (ordering) => pathOr(EMPTY_OBJECT, ['attributePresentAndValid', 'attributeState'], ordering)
);

export const AllAttribute = createSelector(
  Attributes,
  (attributeState) => {
    const rawAttributeData = pathOr([], ['attributes'], attributeState);
    const allAttributes = {};
    Object.keys(rawAttributeData).forEach((dType) => {
      allAttributes[dType] = {};
      const attributeKeys = Object.keys(rawAttributeData[dType]);
      attributeKeys.forEach((key) => {
        const updatedAttributeData = pathOr(false, ['values', dType, key], attributeState);
        if (rawAttributeData[dType][key].length) {
          allAttributes[dType][key] = sortTransformAnnotate(
            compose(
              groupBy((attribute) => `${attribute.PricingPlanId}-${attribute.InstanceNumber}`),
              filter((attribute) => !attribute.InventoryProviderType)
            )(rawAttributeData[dType][key]), updatedAttributeData, false, []
          );
        }
      });
    });
    return allAttributes;
  }
);

export const PortInNumberInvalid = createSelector(
  Attributes,
  (attributeState) => {
    return pathOr(true, ['portInNumberInvalid'], attributeState);
  }
);

export const OrderIsPortIn = createSelector(
  Attributes,
  (attributeState) => {
    const rawAttributeData = pathOr({}, ['attributes'], attributeState);
    let portInIntentObj;
    Object.keys(rawAttributeData).forEach((dType) => {
      const attributeKeys = Object.keys(rawAttributeData[dType]);
      attributeKeys.forEach((key) => {
        const attributeArray = rawAttributeData[dType][key];
        const portInIntent = attributeArray.find((attr) => attr.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_INTENT);
        if (portInIntent) {
          portInIntentObj = {
            dType,
            key,
            portInIntent
          };
        }
      });
    });
    if (portInIntentObj) {
      const { dType, key, portInIntent } = portInIntentObj;
      const value = attributeState.values[dType][key][portInIntent.Id];
      return value.value !== portInIntent.SelectedValue;
    }
    return false;
  }
);

export const PortInDate = createSelector(
  Attributes,
  (attributeState) => {
    const rawAttributeData = pathOr({}, ['attributes'], attributeState);

    let portInDateObject;
    Object.keys(rawAttributeData).forEach((dType) => {
      const attributeKeys = Object.keys(rawAttributeData[dType]);
      attributeKeys.forEach((key) => {
        const attributeArray = rawAttributeData[dType][key];
        const portInDate = attributeArray.find((attr) => attr.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_DATE);
        if (portInDate) {
          portInDateObject = {
            dType,
            key,
            portInDate
          };
        }
      });
    });

    if (portInDateObject) {
      const { dType, key, portInDate } = portInDateObject;
      const value = attributeState.values[dType][key][portInDate.Id];
      return value ? format(value.value, 'YYYY-MM-DD') : null;
    }
  }
);

export const ActivationDate = createSelector(
  Attributes,
  (attributeState) => {
    const rawAttributeData = pathOr({}, ['attributes'], attributeState);

    let activationDateObject;
    Object.keys(rawAttributeData).forEach((dType) => {
      const attributeKeys = Object.keys(rawAttributeData[dType]);
      attributeKeys.forEach((key) => {
        const attributeArray = rawAttributeData[dType][key];
        const activationDate = attributeArray.find((attr) => attr.DisplayOrder === DISPLAY_ORDER_FOR_ACTIVATION_DATE);
        if (activationDate) {
          activationDateObject = {
            dType,
            key,
            activationDate
          };
        }
      });
    });

    if (activationDateObject) {
      const { dType, key, activationDate } = activationDateObject;
      const value = attributeState.values[dType][key][activationDate.Id];
      return value ? format(value.value, 'YYYY-MM-DD') : null;
    }
  }
);

export const PortInNumberFromAttributes = createSelector(
  Attributes,
  (attributeState) => {
    const rawAttributeData = pathOr({}, ['attributes'], attributeState);
    let portInNumberObj;
    Object.keys(rawAttributeData).forEach((dType) => {
      const attributeKeys = Object.keys(rawAttributeData[dType]);
      attributeKeys.forEach((key) => {
        const attributeArray = rawAttributeData[dType][key];
        const portInNumber = attributeArray.find((attr) => attr.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_NUMBER);
        if (portInNumber) {
          portInNumberObj = {
            portInNumber,
            dType,
            key
          };
        }
      });
    });
    if (portInNumberObj) {
      const { dType, key, portInNumber } = portInNumberObj;
      const existingPortInNumber = attributeState.values[dType][key][portInNumber.Id];
      return {
        id: portInNumber.Id,
        displayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
        optionId: path(['OfferingOptionPriceId'], portInNumber),
        value: existingPortInNumber ? existingPortInNumber.value : null
      };
    }
  }
);

export const OfferingAttributes = createSelector(
  ActiveOfferInstanceId,
  OfferingContextValueDecisions,
  Attributes,
  MSISDNInventoryItems,
  (offerId, attributes, attrValues, msisdnInventoryItems) => {
    if (attributes.length) {
      const filteredAttributes = attributes.filter((attribute) => !attribute.InventoryProviderType && shouldShowAttribute(attribute));
      return sortTransformAnnotate({
        [offerId]: filteredAttributes
      }, pathOr(EMPTY_OBJECT, ['values', DECISION_TYPE.QUANTITY, pathOr(null, [0, 'OfferingOptionPriceId'], attributes)], attrValues), true, msisdnInventoryItems);
    }
    return EMPTY_OBJECT;
  }
);

export const BroadbandAttributes = createSelector(
  OfferingContextValueDecisions,
  (attributes) => ((attributes.length) ? ({
    address: attributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_ADDRESS),
    ossId: attributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_OSS),
    serviceId: attributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_SERVICE_ID),
    unitNum: attributes.find(({ DisplayOrder }) => DisplayOrder === DISPLAY_ORDER_UNIT_NUM)
  }) : EMPTY_OBJECT)
);

export const OfferingAttributesForEdit = createSelector(
  ActiveOfferInstanceId,
  OfferingContextValueDecisions,
  Attributes,
  (offerId, attributes, attrValues) => {
    if (attributes.length) {
      const filteredAttributes = attributes.filter((attribute) => {
        return (!attribute.InventoryProviderType &&
                    (!shouldShowAttribute(attribute) && (attribute.DisplayOrder < DISPLAY_ORDER_FOR_SIM_SWAP)));
      });
      return sortTransformAnnotate({
        [offerId]: filteredAttributes
      }, pathOr(EMPTY_OBJECT, ['values', DECISION_TYPE.QUANTITY, pathOr(null, [0, 'OfferingOptionPriceId'], attributes)], attrValues), true, []);
    }
    return EMPTY_OBJECT;
  }
);
export const OfferingAttributesForSimSwap = createSelector(
  OfferingContextValueDecisions,
  (attributes) => {
    if (attributes.length) {
      return attributes.find((attribute) => (
        (!attribute.InventoryProviderType && attribute.DisplayOrder === DISPLAY_ORDER_FOR_SIM_SWAP)
      ));
    }
    return EMPTY_OBJECT;
  }
);

const EMPTY_FORMATTED_ATTRIBUTES = [];
export const FormattedAttributes = createSelector(
  AllAttribute,
  AttributesPresentAndValid,
  ActiveOfferId,
  MSISDNInventoryItems,
  (allAttributes, presentState, offerId, msisdnInventoryItems) => {
    if (allAttributes) {
      const allAttributesList = Object.keys(allAttributes).reduce((list, decisionType) => {
        return Object.keys(allAttributes[decisionType]).reduce((innerList, optionKey) => {
          const attributeKeys = Object.keys(allAttributes[decisionType][optionKey]);
          if (presentState[decisionType][optionKey].present) {
            return innerList.concat(attributeKeys.reduce((decisionList, attributeKey) => {
              return decisionList.concat(allAttributes[decisionType][optionKey][attributeKey]);
            }, []));
          }
          return innerList;
        }, list);
      }, []);

      return allAttributesList.filter((attribute) => (
        attribute.formValue || attribute.isRequired
      )).map((attribute) => {
        let itemReservation;
        if (attribute.data && attribute.data.InventoryItemReservation) {
          itemReservation = attribute.data.InventoryItemReservation;
          const selectedMsisdn = msisdnInventoryItems.find(({ SerialNumber }) => attribute.formValue === SerialNumber);
          if (selectedMsisdn) {
            itemReservation = {
              ...attribute.data.InventoryItemReservation,
              SerialNumber: selectedMsisdn.SerialNumber,
              InstanceId: selectedMsisdn.InstanceId
            };
          }
        }

        let selectedValue = attribute.formValue;

        if (attribute.data.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_NUMBER) {
          selectedValue = attribute.formValue.replace(FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.replace);
        }

        if (isRequiredField(attribute) && !ensureValidSelectedValues(attribute)) {
          selectedValue = pathOr('', ['possibleValues', 0], attribute) || pathOr('', ['PossibleValues', 0], attribute);
        }

        return {
          formValue: attribute.data.SelectedValue,
          DecisionType: DECISION_TYPE.SERVICE_ATTRIBUTE,
          Id: attribute.id,
          InventoryItemReservation: itemReservation,
          Name: attribute.name,
          OfferingId: offerId,
          DisplayOrder: attribute.data.DisplayOrder,
          PricingPlanId: attribute.pricingPlanId,
          SelectedValue: selectedValue,
          ServiceFeatures: path(['data', 'ServiceFeatures'], attribute),
          ServiceInstanceId: path(['data', 'ServiceInstanceId'], attribute)
        };
      });
    }
    return EMPTY_FORMATTED_ATTRIBUTES;
  }
);
