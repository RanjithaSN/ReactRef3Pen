import { OrderingTypes } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { SavedCartTypes } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import reducer, { INITIAL_STATE } from './physical.inventory.reducer';

describe('PhysicalInventory Reducer', () => {
  const makeId = '456';
  const modelId = '789';

  [
    OrderingTypes.UPDATE_OFFERING_CONTEXT.SUCCESS,
    OrderingTypes.RETRIEVE_ATTRIBUTES.SUCCESS
  ].forEach((type) => {
    describe(type, () => {
      let result;
      const selections = {
        makeId,
        modelId,
        inventoryTypeId: '123'
      };

      describe('And both decisions have the same inventoryTypeId', () => {
        beforeEach(() => {
          const state = INITIAL_STATE
            .set(123, selections)
            .set(456, selections);
          result = reducer(state, {
            type,
            payload: {
              Context: {
                PhysicalInventoryDecisions: [{
                  Id: '123',
                  InventoryType: {
                    Id: '123'
                  }
                }]
              }
            }
          });
        });

        test('It should not modify availability data for decisions with same inventoryTypeId in list', () => {
          expect(result[123]).toEqual(selections);
          expect(result[456]).toEqual(selections);
        });
      });

      describe('And both decisions do not have the same inventoryTypeId', () => {
        beforeEach(() => {
          const state = INITIAL_STATE
            .set(123, selections)
            .set(456, {
              ...selections,
              inventoryTypeId: '1'
            });
          result = reducer(state, {
            type,
            payload: {
              Context: {
                PhysicalInventoryDecisions: [{
                  Id: '123',
                  InventoryType: {
                    Id: '123'
                  }
                }]
              }
            }
          });
        });

        test('It should not modify availability data for decisions in list', () => {
          expect(result[123]).toEqual(selections);
        });

        test('It should remove availability data for decision not in list', () => {
          expect(result[456]).toBeUndefined();
        });
      });
    });
  });

  [
    OrderingTypes.RETRIEVE_OFFERING_CONTEXT.SUCCESS,
    SavedCartTypes.SAVE_OFFERING_CART.SUCCESS
  ].forEach((type) => {
    describe(type, () => {
      test('It should reset to INITIAL_STATE', () => {
        const state = INITIAL_STATE.set(123, {
          makeId,
          modelId
        });
        const result = reducer(state, {
          type
        });
        expect(result).toBe(INITIAL_STATE);
      });
    });
  });
});
