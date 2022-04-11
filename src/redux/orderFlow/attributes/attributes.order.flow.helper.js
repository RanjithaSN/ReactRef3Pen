import { t } from 'i18next';
import compose from 'ramda/src/compose';
import pathOr from 'ramda/src/pathOr';
import prop from 'ramda/src/prop';
import sortBy from 'ramda/src/sortBy';
import LocaleKeys from '../../../locales/keys';
import {
  DISPLAY_ORDER_FOR_ACTIVATION_DATE,
  DISPLAY_ORDER_FOR_PORT_IN_DATE, DISPLAY_ORDER_FOR_PORT_IN_INTENT,
  REQUIRED_FIELDS,
  DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
  DISPLAY_ORDER_FOR_TELEPHONE_NUMBER
} from './attributes.order.flow.constants';

export const getAttibuteRSVP = ({ InventoryItemReservation, InventoryTypeId, SelectedValue }, msisdnInventoryItems) => {
  return (InventoryItemReservation || (InventoryTypeId && SelectedValue)) ? {
    inventoryTypeId: pathOr(InventoryTypeId, ['InventoryTypeId'], InventoryItemReservation),
    options: [{
      SerialNumber: pathOr(SelectedValue, ['SerialNumber'], InventoryItemReservation)
    }].concat(msisdnInventoryItems.map((msisdn) => {
      return {
        SerialNumber: msisdn.SerialNumber
      };
    }))
  } : null;
};

export const sortTransformAnnotate = (attributesObj, valuesObj, addNoSelectionValue, msisdnInventoryItems) => {
  const rtnObj = {};
  const keys = Object.keys(attributesObj);
  keys.forEach((key) => {
    const attributeObj = attributesObj[key];
    rtnObj[key] = transformedAttributeGroups(
      compose(
        sortBy(prop('DisplayOrder')),
        sortBy(prop('ServiceDisplayOrder'))
      )(attributeObj),
      valuesObj, addNoSelectionValue, msisdnInventoryItems
    );
  });
  return rtnObj;
};

const getValue = (attribute, valuesObj) => {
  let formValue;
  if (valuesObj[attribute.Id]) {
    formValue = valuesObj[attribute.Id].value;
  } else if (attribute.InventoryItemReservation) {
    formValue = attribute.InventoryItemReservation.SerialNumber;
  } else if (attribute.SelectedValue) {
    formValue = attribute.SelectedValue;
  }
  return formValue;
};

export const shouldShowAttribute = (attribute) => {
  const allowList = [DISPLAY_ORDER_FOR_PORT_IN_INTENT, DISPLAY_ORDER_FOR_PORT_IN_NUMBER, DISPLAY_ORDER_FOR_TELEPHONE_NUMBER,
    DISPLAY_ORDER_FOR_ACTIVATION_DATE, DISPLAY_ORDER_FOR_PORT_IN_DATE];
  return allowList.includes(attribute.DisplayOrder);
};

/**
 * Handle when descriptions have a Pipe separating a title | description in the Description Field.
 * @param {} descriptionWithPossibleTitlePrefix
 */
const handleDescriptionAndTitle = (descriptionWithPossibleTitlePrefix) => {
  if (descriptionWithPossibleTitlePrefix) {
    const arr = String(descriptionWithPossibleTitlePrefix).split('|');
    if (arr.length > 1) {
      return {
        description: arr[1].toString().trim(),
        title: arr[0].toString().trim()
      };
    }
    return {
      description: descriptionWithPossibleTitlePrefix,
      title: null
    };
  }
  return {
    description: null,
    title: null
  };
};

export const isRequiredField = (attribute) => REQUIRED_FIELDS.includes(attribute.name);
export const ensureValidSelectedValues = (attr) => attr.possibleValues.includes(attr.formValue);

const TRUE_FALSE_POSSIBLE_VALUES = ['TRUE', 'FALSE'];

function transformedAttributeGroups(attributesObj, valuesObj, addNoSelectionValue, msisdnInventoryItems,) {
  const rtnObj = [];

  const portInIntent = attributesObj.find((attr) => attr.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_INTENT);
  const isPortInSelected = portInIntent && getValue(portInIntent, valuesObj) !== portInIntent.SelectedValue;

  attributesObj.forEach((attribute, index) => {
    let includeAttribute = true;
    const isDependent = Boolean(attribute.DependentServiceAttributeId);
    let formValue = getValue(attribute, valuesObj);

    const selectedValue = attribute.SelectedValue && attribute.InventoryItemReservation ? attribute.SelectedValue : null;
    const inventoryItemReservation = getAttibuteRSVP(attribute, msisdnInventoryItems);
    const isRadio = Boolean(inventoryItemReservation);
    const isSelect = Boolean(!selectedValue && attribute.PossibleValues && attribute.PossibleValues.length > 0);
    const isDate = Boolean(attribute.DisplayOrder === DISPLAY_ORDER_FOR_ACTIVATION_DATE || attribute.DisplayOrder === DISPLAY_ORDER_FOR_PORT_IN_DATE);
    const possibleValues = attribute.PossibleValues.asMutable();
    if (!attribute.IsRequired && possibleValues && possibleValues.length && addNoSelectionValue) {
      if (!(possibleValues.length === 2 && TRUE_FALSE_POSSIBLE_VALUES.includes(possibleValues[0].toUpperCase()) &&
                TRUE_FALSE_POSSIBLE_VALUES.includes(possibleValues[1].toUpperCase()))) {
        possibleValues.unshift(t(LocaleKeys.OFFER_ATTRIBUTES.NO_SELECTION));
        if (!formValue && (isRadio || isSelect)) {
          formValue = t(LocaleKeys.OFFER_ATTRIBUTES.NO_SELECTION);
        }
      }
    }

    let dependentValues;
    if (isDependent) {
      const dependsUpon = rtnObj.find((attr) => attr.id === attribute.DependentServiceAttributeId);
      includeAttribute = isPortInSelected || (dependsUpon && dependsUpon.formValue &&
                (!attribute.DependentValues ||
                    (attribute.DependentValues && dependsUpon.formValue && attribute.DependentValues.indexOf(dependsUpon.formValue) !== -1)));
    }
    if (includeAttribute) {
      const descriptionTitleObject = handleDescriptionAndTitle(attribute.Description);
      rtnObj.push({
        id: attribute.Id,
        dependentServiceAttributeId: attribute.DependentServiceAttributeId,
        dependentValues,
        description: descriptionTitleObject.description,
        formValue: formValue === undefined ? '' : formValue,
        instanceNumber: attribute.InstanceNumber,
        inventoryItemReservation,
        isRadio,
        isRequired: attribute.IsRequired,
        isSelect,
        isDate,
        name: attribute.Name,
        possibleValues,
        pricingPlanId: attribute.PricingPlanId,
        pricingPlanName: attribute.PricingPlanName,
        regularExpression: attribute.RegularExpression,
        showDivider: Boolean(!isDependent && index),
        title: descriptionTitleObject.title,
        data: attribute
      });
    }
  });
  return rtnObj;
}
