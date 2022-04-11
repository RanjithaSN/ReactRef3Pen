import Immutable from 'seamless-immutable';
import * as selectors from './physical.inventory.selectors';

const decisionId = '123||0||123';
const attribute = {
  id: '123',
  value: 'Gold'
};

const decision = {
  Id: decisionId,
  InventoryType: {
    Id: '123',
    InventoryTypeAttributes: Immutable([{
      Id: attribute.id,
      PossibleValues: [attribute.value]
    }]),
    InventoryTypeMakes: [{
      Id: '123',
      InventoryTypeModels: [{
        Id: '123'
      }]
    }]
  }
};
const completedDecision = {
  makeId: '123',
  modelId: '123',
  storeId: '888',
  inventoryTypeId: '123',
  attributes: {
    [attribute.id]: attribute.value
  }
};

describe('PhysicalInventory', () => {
  describe('PhysicalInventoryDecisions', () => {
    test('It should return physical inventory decisions from the ROC', () => {
      const context = {
        Context: {
          PhysicalInventoryDecisions: [decision]
        }
      };
      const result = selectors.PhysicalInventoryDecisions.resultFunc(context);
      expect(result).toEqual([decision]);
    });
  });

  describe('CompletedPhysicalInventoryDecisions', () => {
    test('It should return a formatted decision list', () => {
      const formattedDecisions = [{
        Id: decisionId,
        DecisionType: 4,
        PhysicalInventoryCompletedDecision: {
          Quantity: 1,
          MakeId: completedDecision.makeId,
          ModelId: completedDecision.modelId,
          StoreId: completedDecision.storeId,
          InventoryTypeId: completedDecision.inventoryTypeId,
          InventoryAttributes: [{
            AttributeId: attribute.id,
            AttributeValue: attribute.value
          }]
        }
      }];
      const result = selectors.CompletedPhysicalInventoryDecisions.resultFunc({
        [decisionId]: completedDecision
      });
      expect(result).toEqual(formattedDecisions);
    });
  });
});
