import Immutable from 'seamless-immutable';
import LOADING_STATUS from '../../../constants/loading.status';
import { INITIAL_STATE } from './codes.reducer';
import * as Codes from './codes.selectors';

const initStore = new Immutable({}).setIn(['ascendon', 'metadata', 'codes'], INITIAL_STATE);
const populatedStore = initStore.setIn(['ascendon', 'metadata', 'codes'], {
  375: {
    status: LOADING_STATUS.LOADED,
    items: [
      {
        Name: 'Rossignol Sly',
        Value: '1'
      },
      {
        Name: 'Arbor Coda',
        Value: '2',
        Global: true
      }
    ]
  }
});

const externalReferenceObject = {
  362: {
    status: 'LOADED',
    items: [
      {
        Value: '123456700',
        Name: 'DisplayName',
        Description: 'DisplayName',
        AdditionalProperties: {
          ExternalReferenceId: '1234567'
        }
      }
    ]
  }
};

const valueFor362 = '1234567';


const codePath = ['ascendon', 'metadata', 'codes', 375];

describe('Codes ', () => {
  describe('When the IsLoading is used...', () => {
    test('It should return true when a code has status of loading', () => {
      const store = populatedStore.setIn([...codePath, 'status'], LOADING_STATUS.LOADING);
      expect(Codes.IsLoading(store)).toBe(true);
    });
    test('It should return false when no codes have status of loading', () => {
      expect(Codes.IsLoading(populatedStore)).toBe(false);
    });
  });

  describe('When the CodeStatus is used...', () => {
    test('It should return code status', () => {
      const store = populatedStore.setIn([...codePath, 'status'], LOADING_STATUS.UNLOADED);
      expect(Codes.CodeStatus([...codePath, 'status'], store)).toBe(LOADING_STATUS.UNLOADED);
    });
  });

  describe('When the CodeLoaded is used...', () => {
    test('It should return false if the code does not exist in the store', () => {
      expect(Codes.CodeLoaded(375, initStore)).toBe(false);
    });
    test('It should return false if the code has non-loaded status', () => {
      const store = populatedStore.setIn([...codePath, 'status'], LOADING_STATUS.LOADING);
      expect(Codes.CodeLoaded(375, store)).toBe(false);
    });
    test('It should return true when code has status of loaded', () => {
      expect(Codes.CodeLoaded(375, populatedStore)).toBe(true);
    });
  });

  describe('When the CodeType is used with item for code...', () => {
    test('It should return the items.', () => {
      const items = populatedStore.ascendon.metadata.codes[375].items;
      expect(Codes.CodeItems(375, populatedStore)).toEqual(items);
    });
    test('It should return an empty array when the code item doesn\'t exist', () => {
      expect(Codes.CodeItems(1, populatedStore)).toEqual([]);
    });
  });

  describe('When the Code is used...', () => {
    test('It should return the object representing the state of the code', () => {
      expect(Codes.Code(375, populatedStore)).toBe(populatedStore.ascendon.metadata.codes[375]);
    });
    test('It should be null if the code does not exist in the store', () => {
      expect(Codes.Code(1, populatedStore)).toBeNull();
    });
  });

  describe('When the ExternalReferenceId is used...', () => {
    test('It should return null when there is no code', () => {
      expect(Codes.ExternalReferenceId()).toEqual(null);
    });

    test('It should return ID of the externalReferenceID object to query', () => {
      expect(Codes.ExternalReferenceId.resultFunc(externalReferenceObject)).toEqual(valueFor362);
    });
  });

  describe('When the SpecificOrGlobalCode is used...', () => {
    test('It should return the specific (non-global) code', () => {
      expect(Codes.SpecificOrGlobalCode(375, populatedStore).Value).toEqual('1');
    });
    test('It should still return something if there is only a Global', () => {
      const TEST_SPEC = populatedStore.setIn(['ascendon', 'metadata', 'codes', 375, 'items', 0, 'Global'], true);
      expect(Codes.SpecificOrGlobalCode(375, TEST_SPEC)).not.toBeNull();
    });
    test('It should return null if the code is not loaded', () => {
      const TEST_SPEC = populatedStore.setIn(['ascendon', 'metadata', 'codes', 375, 'status'], LOADING_STATUS.LOADING);
      expect(Codes.SpecificOrGlobalCode(375, TEST_SPEC)).toBeNull();
    });
  });

  describe('When the SelectOptionsForCodeValues is used...', () => {
    test('It should return the items as options for select.', () => {
      const testOption1 = populatedStore.ascendon.metadata.codes[375].items[0];
      const testOption2 = populatedStore.ascendon.metadata.codes[375].items[1];
      const options = Codes.SelectOptionsForCodeValues(375, populatedStore);
      expect(options.length).toEqual(2);
      expect(options[0].label).toEqual(testOption1.Name);
      expect(options[0].value).toEqual(testOption1.Value);
      expect(options[1].label).toEqual(testOption2.Name);
      expect(options[1].value).toEqual(testOption2.Value);
    });
  });

  describe('When UnitsOfMeasurement is used ...', () => {
    const measurmentCodes = [
      {
        Value: '4',
        Name: 'Bytes'
      }, {
        Value: '5',
        Name: 'Kilobytes'
      }, {
        Value: '6',
        Name: 'Megabytes'
      }, {
        Value: '7',
        Name: 'Gigabytes'
      }
    ];

    const measurementsObject = {
      4: {
        Name: 'Bytes',
        Conversion: 1024 * 1024 * 1024
      },
      5: {
        Name: 'Kilobytes',
        Conversion: 1024 * 1024
      },
      6: {
        Name: 'Megabytes',
        Conversion: 1024
      },
      7: {
        Name: 'Gigabytes',
        Conversion: 1
      }
    };
    test('It should return an empty object if there are no measurement codes', () => {
      expect(Codes.UnitsOfMeasure.resultFunc([])).toEqual({});
    });
    test('It should return an object with the values as keys', () => {
      expect(Codes.UnitsOfMeasure.resultFunc(measurmentCodes)).toEqual(measurementsObject);
    });
  });
});
