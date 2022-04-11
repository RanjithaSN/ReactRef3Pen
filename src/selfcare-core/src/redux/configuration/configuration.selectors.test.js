import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './configuration.reducer';
import * as Configuration from './configuration.selectors';

const initializedStore = new Immutable({
  ascendon: {
    configuration: INITIAL_STATE
  }
});

describe('Configuration Selectors', () => {
  describe('When the Configuration is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'configuration', 'data'], DATA);
      expect(Configuration.Configuration(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Configuration.Configuration()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(Configuration.Configuration.resultFunc({})).toBeNull();
    });
  });

  describe('When the Environments is used...', () => {
    test('It should return the array of environments when it exists.', () => {
      const ENVIRONMENTS = ['qa1', 'qa2'];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'configuration', 'data', 'environments'], ENVIRONMENTS);
      expect(Configuration.Environments(CUSTOM_STATE)).toEqual(ENVIRONMENTS);
    });

    test('It should return an empty array when there is no environment data.', () => {
      expect(Configuration.Environments.resultFunc(null)).toEqual([]);
    });
  });

  describe('When the Locales is used...', () => {
    test('It should return the array of locales when it exists.', () => {
      const LOCALES = ['en-US', 'fr-CA'];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'configuration', 'data', 'locales'], LOCALES);
      expect(Configuration.Locales(CUSTOM_STATE)).toEqual(LOCALES);
    });

    test('It should return an empty array when there is no locale data.', () => {
      expect(Configuration.Locales.resultFunc(null)).toEqual([]);
    });
  });

  describe('When the BusinessUnits is used...', () => {
    test('It should return the array of BUs when it exists.', () => {
      const businessUnits = [{
        id: '1',
        name: 'test'
      }];
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'configuration', 'data', 'businessUnits'], businessUnits);
      expect(Configuration.BusinessUnits(CUSTOM_STATE)).toEqual(businessUnits);
    });

    test('It should return an empty array when there is no environment data.', () => {
      expect(Configuration.BusinessUnits.resultFunc(null)).toEqual([]);
    });
  });

  describe('When the AllowSystemIdChange is used...', () => {
    test('it should return false when the data does not exist in the store', () => {
      expect(Configuration.AllowSystemIdChange.resultFunc(null)).toBe(false);
    });
    test('it should return the value on the allowSystemIdChange property from the config', () => {
      const CUSTOM_STATE = INITIAL_STATE.setIn(['ascendon', 'configuration', 'data', 'allowSystemIdChange'], true);
      expect(Configuration.AllowSystemIdChange(CUSTOM_STATE)).toBe(true);
    });
  });

  describe('When the IsDbss is used...', () => {
    test('it should return true when the data does not exist in the store', () => {
      expect(Configuration.IsDbss.resultFunc(null)).toBe(true);
    });
    test('it should always return true beacuase it is Penny App ', () => {
      const CUSTOM_STATE = INITIAL_STATE.setIn(['ascendon', 'metadata', 'codes'], {
        isLoading: true,
        368: {
          isLoaded: true,
          items: []
        }
      });
      expect(Configuration.IsDbss(CUSTOM_STATE)).toBe(true);
    });
  });
});
