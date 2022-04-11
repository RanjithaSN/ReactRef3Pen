import * as Inventory from './search.inventory.selectors';


describe('SearchInventory ', () => {
  describe('MSISDNInventoryItems', () => {
    test('It should return an empty list if undefined.', () => {
      expect(Inventory.MSISDNInventoryItems.resultFunc([])).toEqual([]);
    });

    test('It should return the list of MSISDN InventoryItems when populated.', () => {
      const items = {
        MSISDN: [{
          one: 1
        }, {
          two: 2
        }]
      };
      expect(Inventory.MSISDNInventoryItems.resultFunc(items)).toEqual(items.MSISDN);
    });
  });

  describe('IsLoadingInventoryItems', () => {
    test('It should return false if passed false/not there.', () => {
      expect(Inventory.IsLoadingInventoryItems.resultFunc({})).toBe(false);
    });

    test('It should return the value of isLoading.', () => {
      expect(Inventory.IsLoadingInventoryItems.resultFunc({
        isLoading: true
      })).toBe(true);
    });
  });
});
