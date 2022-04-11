import { FeasibilityAttributeData } from '@selfcare/core/redux/feasibility/feasibility.selectors';
import path from 'ramda/src/path';
import { DECISION_TYPE } from '../../../constants/order.constants';
import { BroadbandAttributes } from './attributes.order.flow.selectors';

export const AttributesOrderFlowTypes = {
  UPDATE_ATTRIBUTE_PRESENT: 'UPDATE_ATTRIBUTE_PRESENT',
  UPDATE_ATTRIBUTE_VALUE: 'UPDATE_ATTRIBUTE_VALUE',
  UPDATE_OFFER_ATTRIBUTE_VALUE: 'UPDATE_OFFER_ATTRIBUTE_VALUE'
};

export const UpdateAttributeValue = (decisionType, optionId, attributeId, value, isRequired, attributeDisplayOrder) => ({
  type: AttributesOrderFlowTypes.UPDATE_ATTRIBUTE_VALUE,
  payload: {
    decisionType,
    optionId,
    attributeId,
    value,
    isRequired,
    attributeDisplayOrder
  }
});

export const SetBroadbandAttributes = (attributeValues) => {
  return (dispatch, getState) => {
    const broadbandAttributes = BroadbandAttributes(getState());
    const feasibilityValues = attributeValues || FeasibilityAttributeData(getState());
    const attributes = Object.keys(broadbandAttributes);

    return attributes.forEach((attribute) => {
      dispatch(UpdateAttributeValue(DECISION_TYPE.QUANTITY,
        path([attribute, 'OfferingOptionPriceId'], broadbandAttributes),
        path([attribute, 'Id'], broadbandAttributes),
        path([attribute], feasibilityValues),
        path([attribute, 'isRequired'], broadbandAttributes)));
    });
  };
};
