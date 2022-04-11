import { OrderingTypes } from '../offeringContext/offering.context.actions';
import reducer, { INITIAL_STATE } from './physical.inventory.reducer';

describe('Inventory Reducer', () => {
  [
    OrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS,
    OrderingTypes.UPDATE_OFFERING_CONTEXT.SUCCESS,
    OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS
  ].forEach((type) => {
    describe(type, () => {
      let result;
      const availability = {
        Available: true
      };
      beforeEach(() => {
        const state = INITIAL_STATE
          .setIn(['availability', 123], availability)
          .setIn(['availability', 456], availability);
        result = reducer(state, {
          type,
          payload: {
            Context: {
              PhysicalInventoryDecisions: [{
                Id: '123'
              }]
            }
          }
        });
      });

      test('It should not modify availability data for decisions in list', () => {
        expect(result.availability[123]).toEqual(availability);
      });

      test('It should remove availability data for decision not in list', () => {
        expect(result.availability[456]).toBeNull();
      });
    });
  });
});
