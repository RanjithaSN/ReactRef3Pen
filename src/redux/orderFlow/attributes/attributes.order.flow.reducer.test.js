import { OrderingTypes as CoreOrderingTypes } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import i18next from 'i18next';
import groupBy from 'ramda/src/groupBy';
import prop from 'ramda/src/prop';
import Immutable from 'seamless-immutable';
import { DECISION_TYPE } from '../../../constants/order.constants';
import { AttributesOrderFlowTypes } from './attributes.order.flow.action';
import { DISPLAY_ORDER_FOR_PORT_IN_NUMBER } from './attributes.order.flow.constants';
import { attributeDecisionInfo, attributePresentAndValid, attributesByDecision } from './attributes.order.flow.reducer';

const noop = {
  type: 'some random action'
};

const DECISION_GROUPS = [{
  name: 'one',
  number: 8
}, {
  name: 'two',
  number: 4
}];

const getPayload = () => {
  const attributes = [];
  DECISION_GROUPS.forEach((obj, index) => {
    for (let i = 0; i < obj.number; i += 1) {
      attributes.push({
        DecisionGroupOptionId: obj.name,
        id: `${i}--${index}`,
        formValue: `${i}--${index}`
      });
    }
  });

  return {
    Context: {
      ValueDecisions: attributes
    }
  };
};

describe('Order flow Attributes Reducer', () => {
  describe('No action', () => {
    test('does not respond to foreign events', () => {
      expect(attributesByDecision(null, noop)).toBeNull();
    });

    test('returns a default state when state is initially undefined', () => {
      expect(attributesByDecision(undefined, noop)).toEqual(Immutable({}));
    });
  });

  describe('CoreOrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS action', () => {
    test('sets attributes into the empty inital state', () => {
      const payload = getPayload();
      const store = attributesByDecision(Immutable(), {
        payload,
        type: CoreOrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS
      });
      const sortedAttributes = {
        [DECISION_TYPE.DECISION_GROUP]: groupBy(prop('DecisionGroupOptionId'))(payload.Context.ValueDecisions)
      };

      expect(store.attributes).toMatchObject(sortedAttributes);
    });

    test('sets attributes state into the empty inital state', () => {
      const payload = getPayload();
      const store = attributePresentAndValid(Immutable(), {
        payload,
        type: CoreOrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS
      });

      expect(store.attributeState).toEqual({
        [DECISION_TYPE.DECISION_GROUP]: {
          one: {
            present: true
          },
          two: {
            present: true
          }
        }
      });
    });

    test('sets attributes into a populated state', () => {
      const initalPayload = getPayload();
      const initalAttributesState = groupBy(prop('DecisionGroupOptionId'))(initalPayload.Context.ValueDecisions);
      const payload = getPayload();
      const sortedAttributes = {
        [DECISION_TYPE.DECISION_GROUP]: groupBy(prop('DecisionGroupOptionId'))(payload.Context.ValueDecisions)
      };

      const store = attributesByDecision(Immutable({
        attributesByDecision: initalAttributesState
      }), {
        payload,
        type: CoreOrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS
      });

      expect(store.attributes).toMatchObject(sortedAttributes);
    });

    test('sets attributes state into a populated state', () => {
      const payload = getPayload();
      const state = {
        [DECISION_TYPE.DECISION_GROUP]: {
          one: {
            present: true,
            valid: true
          },
          two: {
            present: true,
            valid: true,
            updating: true
          }
        }
      };
      const store = attributePresentAndValid(Immutable({
        attributeState: state
      }), {
        payload,
        type: CoreOrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS
      });

      state[DECISION_TYPE.DECISION_GROUP].two.valid = false;
      expect(store.attributeState).toEqual(state);
    });
  });

  describe('AttributesOrderFlowTypes.UPDATE_ATTRIBUTE_VALUE action', () => {
    const decisionType = DECISION_TYPE.DECISION_GROUP;
    test('sets attributes into the populated state', () => {
      const initalPayload = getPayload();
      const initalAttributesState = {
        [decisionType]: groupBy(prop('DecisionGroupOptionId'))(initalPayload.Context.ValueDecisions)
      };

      const selectedGroup = DECISION_GROUPS[1].name;
      const selectedIndex = Math.floor(Math.random() * DECISION_GROUPS[1].number);
      const selectedId = initalAttributesState[decisionType][selectedGroup][selectedIndex].Id;
      const updatedValue = '123-654';

      const store = attributesByDecision(Immutable({
        attributesByDecision: initalAttributesState
      }), {
        payload: {
          attributeId: selectedId,
          decisionType,
          optionId: selectedGroup,
          value: updatedValue
        },
        type: AttributesOrderFlowTypes.UPDATE_ATTRIBUTE_VALUE
      });

      expect(store.values[decisionType][selectedGroup][selectedId].value).toEqual(updatedValue);
    });
    test('unsets attributes with NO_SELECTION_STRING into the populated state', () => {
      const initalPayload = getPayload();
      const initalAttributesState = {
        [decisionType]: groupBy(prop('DecisionGroupOptionId'))(initalPayload.Context.ValueDecisions)
      };

      const selectedGroup = DECISION_GROUPS[1].name;
      const selectedIndex = Math.floor(Math.random() * DECISION_GROUPS[1].number);
      const selectedId = initalAttributesState[decisionType][selectedGroup][selectedIndex].Id;
      const updatedValue = i18next.mockReturn;

      const store = attributesByDecision(Immutable({
        attributesByDecision: initalAttributesState
      }), {
        payload: {
          attributeId: selectedId,
          decisionType,
          optionId: selectedGroup,
          value: updatedValue
        },
        type: AttributesOrderFlowTypes.UPDATE_ATTRIBUTE_VALUE
      });

      expect(store.values[decisionType][selectedGroup][selectedId].value).toEqual(undefined);
    });
    test('sets portInNumberInvalid to true when an invalid number format is provided', () => {
      const initialPayload = getPayload();
      const initalAttributesState = {
        [decisionType]: groupBy(prop('DecisionGroupOptionId'))(initialPayload.Context.ValueDecisions)
      };

      const selectedGroup = DECISION_GROUPS[1].name;
      const selectedIndex = Math.floor(Math.random() * DECISION_GROUPS[1].number);
      const selectedId = initalAttributesState[decisionType][selectedGroup][selectedIndex].Id;
      const invalidNumberFormat = '12345';

      const store = attributesByDecision(Immutable({
        attributesByDecision: initalAttributesState,
        portInNumberInvalid: undefined
      }), {
        payload: {
          attributeDisplayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
          attributeId: selectedId,
          decisionType,
          optionId: selectedGroup,
          value: invalidNumberFormat
        },
        type: AttributesOrderFlowTypes.UPDATE_ATTRIBUTE_VALUE
      });

      expect(store.portInNumberInvalid).toBeTruthy();
    });
    test('sets portInNumberInvalid to false when a valid number format is provided', () => {
      const initialPayload = getPayload();
      const initalAttributesState = {
        [decisionType]: groupBy(prop('DecisionGroupOptionId'))(initialPayload.Context.ValueDecisions)
      };

      const selectedGroup = DECISION_GROUPS[1].name;
      const selectedIndex = Math.floor(Math.random() * DECISION_GROUPS[1].number);
      const selectedId = initalAttributesState[decisionType][selectedGroup][selectedIndex].Id;
      const validNumberFormat = '0712345678';

      const store = attributesByDecision(Immutable({
        attributesByDecision: initalAttributesState,
        portInNumberInvalid: undefined
      }), {
        payload: {
          attributeDisplayOrder: DISPLAY_ORDER_FOR_PORT_IN_NUMBER,
          attributeId: selectedId,
          decisionType,
          optionId: selectedGroup,
          value: validNumberFormat
        },
        type: AttributesOrderFlowTypes.UPDATE_ATTRIBUTE_VALUE
      });
      expect(store.portInNumberInvalid).toBeFalsy();
    });
  });

  describe('CoreOrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS action', () => {
    test('resets attribute state', () => {
      const initalPayload = getPayload();
      const initalAttributesState = {
        [DECISION_TYPE.DECISION_GROUP]: groupBy(prop('DecisionGroupOptionId'))(initalPayload.Context.ValueDecisions)
      };

      const store = attributesByDecision(Immutable({
        attributesByDecision: initalAttributesState
      }), {
        payload: {},
        type: CoreOrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS
      });

      expect(store.values).toEqual(undefined);
    });
  });

  describe('CoreOrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS action', () => {
    test('resets attribute state', () => {
      const newPayload = {
        decisionType: DECISION_TYPE.QUANTITY,
        optionId: '123_NEW'
      };
      expect(attributeDecisionInfo(newPayload, {
        type: CoreOrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS,
        payload: newPayload
      })).toBeNull();
    });
  });

  describe('CoreOrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS action', () => {
    test('resets attribute state', () => {
      const store = attributePresentAndValid(Immutable({
        attributeState: {
          [DECISION_TYPE.QUANTITY]: {
            one: {
              present: true,
              valid: true
            },
            two: {
              present: true,
              valid: true,
              updating: true
            }
          }
        }
      }), {
        payload: {},
        type: CoreOrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS
      });

      expect(store.values).toEqual(undefined);
    });
  });
});
