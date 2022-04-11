import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { OrderingTypes as OfferingContext } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { OrderingTypes } from './ordering.actions';
import reducer, { INITIAL_STATE } from './ordering.reducer';

describe('Available Decisions Reducer', () => {
  const requestObject = {
    offeringInstanceId: 123
  };

  test('When RETRIEVE_OFFERING_CONTEXT.BEGIN is dispatched the loading state should be updated', () => {
    const state = reducer(
      INITIAL_STATE,
      {
        type: OfferingContext.RETRIEVE_OFFERING_CONTEXT.BEGIN,
        requestObject
      }
    );

    expect(state.data.statusesByInstanceId).toEqual({
      123: 'LOADING'
    });
  });

  test('When RETRIEVE_OFFERING_CONTEXT.SUCCESS is dispatched the loading state should be updated', () => {
    const payload = {
      Id: 32,
      Context: {
        Decisions: [{
          Id: 1,
          PageId: '123',
          Options: [{
            Id: 1,
            Quantity: 0
          }, {
            Id: 2,
            Quantity: 0
          }, {
            Id: 3,
            Quantity: 0
          }]
        }],
        Pages: [{
          Id: '123',
          Name: 'Primary Package'
        }]
      }
    };

    const state = reducer(
      INITIAL_STATE,
      {
        type: OfferingContext.RETRIEVE_OFFERING_CONTEXT.SUCCESS,
        payload,
        requestObject
      }
    );

    expect(state.data.statusesByInstanceId).toEqual({
      123: 'LOADED'
    });

    expect(state.data.dataByInstanceId).toEqual({
      123: {
        Context: {
          Decisions: [{
            Id: 1,
            PageId: '123',
            Options: [{
              Id: 1,
              Quantity: 0
            }, {
              Id: 2,
              Quantity: 0
            }, {
              Id: 3,
              Quantity: 0
            }]
          }],
          Pages: [{
            Id: '123',
            Name: 'Primary Package'
          }]
        },
        Id: 32
      }
    });
  });

  test('sets decision being modified', () => {
    const payload = [{
      name: 'Name',
      action: 'Add'
    }];

    const response = reducer(INITIAL_STATE, {
      type: OrderingTypes.DECISION_BEING_MODIFIED,
      payload
    });

    expect(response.data.decisionBeingModified).toEqual(payload);
  });

  test('sets is calculating decision being modified', () => {
    const response = reducer(INITIAL_STATE, {
      type: OrderingTypes.CALCULATING_DECISION_BEING_MODIFIED,
      payload: true
    });

    expect(response.data.isCalculatingDecisionBeingModified).toBe(true);
  });

  test('sets isolated retrieval', () => {
    const response = reducer(INITIAL_STATE, {
      type: OrderingTypes.SETTING_ISOLATED_RETRIEVAL,
      payload: true
    });

    expect(response.data.isolatedRetrieval).toBe(true);
  });

  test('when FaultTypes.API_FAULT is dispatched', () => {
    const state = reducer(INITIAL_STATE, {
      type: FaultTypes.API_FAULT,
      requestObject,
      payload: {
        trigger: OfferingContext.RETRIEVE_OFFERING_CONTEXT.BEGIN
      }
    });

    expect(state.data.statusesByInstanceId).toEqual({
      123: 'UNLOADED'
    });
  });

  test('When CLEAR_MODIFIED_DECISION_DATA is dispatched it should return to initial state', () => {
    const state = reducer(
      INITIAL_STATE.setIn(['data', 'decisionBeingModified'], {
        id: 1
      }),
      {
        type: OrderingTypes.CLEAR_MODIFIED_DECISION_DATA
      }
    );

    expect(state).toEqual(INITIAL_STATE);
  });
});
