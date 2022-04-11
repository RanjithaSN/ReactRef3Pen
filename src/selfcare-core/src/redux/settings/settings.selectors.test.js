import { DISTRIBUTION_CHANNEL_ID } from '@selfcare/core/redux/utils/api.constants';
import AppConfig from 'AppConfig';
import Immutable from 'seamless-immutable';
import { OFFER_TYPES } from '../searchOffers/search.offers.constants';
import { INITIAL_STATE } from './settings.reducer';
import * as Settings from './settings.selectors';

const initializedStore = new Immutable({
  ascendon: {
    settings: INITIAL_STATE
  }
});

afterEach(() => {
  AppConfig.ENVIRONMENT_NAME = undefined;
});

describe('Settings Selectors', () => {
  describe('When the Base is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      const DATA = {
        id: 1
      };
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'settings'], DATA);
      expect(Settings.Base(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Settings.Base()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(Settings.Base.resultFunc({})).toBeNull();
    });
  });

  describe('When the RightToReturnDays is used...', () => {
    test('It should return 14 for all values', () => {
      AppConfig.ENVIRONMENT_NAME = 'blah';
      expect(Settings.RightToReturnDays({
        rightToReturnDays: 50
      })).toEqual(14);
      expect(Settings.RightToReturnDays({
        rightToReturnDays: 30
      })).toEqual(14);
    });

    test('It should always return 14 for prd and stg', () => {
      AppConfig.ENVIRONMENT_NAME = 'prd3';
      expect(Settings.RightToReturnDays({
        rightToReturnDays: 50
      })).toEqual(14);
      AppConfig.ENVIRONMENT_NAME = 'stg3';
      expect(Settings.RightToReturnDays({
        rightToReturnDays: 30
      })).toEqual(14);
    });

    test('It should return 14 for undefined and null', () => {
      expect(Settings.RightToReturnDays(undefined)).toEqual(14);
      expect(Settings.RightToReturnDays(null)).toEqual(14);
    });
  });

  describe('When the SelectedSystemId is used...', () => {
    test('It should return the value of the selectedSystemId attribute when one exists.', () => {
      const DATA = '40ae44f2-3185-486e-9c62-b2629728afd0';
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'settings', 'selectedSystemId'], DATA);
      expect(Settings.SelectedSystemId(CUSTOM_STATE)).toEqual(DATA);
    });

  });

  describe('When the Show Device Offers checkbox is clicked...', () => {
    test('It should return true if the box is checked.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'settings', 'showDeviceOffers'], true);
      expect(Settings.ShowingDeviceOffers(CUSTOM_STATE)).toEqual(true);
    });

    test('It should return false if the box is unchecked.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'settings', 'showDeviceOffers'], false);
      expect(Settings.ShowingDeviceOffers(CUSTOM_STATE)).toEqual(false);
    });
  });

  describe('In the search offers page...', () => {
    test('It should return OFFER_TYPES.DEVICE if Phones tab is selected.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'settings', 'selectedOfferType'], OFFER_TYPES.DEVICE);
      expect(Settings.SelectedOfferType(CUSTOM_STATE)).toEqual(OFFER_TYPES.DEVICE);
    });

    test('It should return 0 if the Plans tab is selected.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'settings', 'selectedOfferType'], OFFER_TYPES.STANDARD);
      expect(Settings.SelectedOfferType(CUSTOM_STATE)).toEqual(OFFER_TYPES.STANDARD);
    });
  });

  xdescribe('When the MetadataApiUrl is used...', () => {
    test('It should return a properly formatted metadata url when a selected environment exists.', () => {
      expect(Settings.MetadataApiUrl()).toEqual(AppConfig.METADATA_URL);
      expect(Settings.MetadataApiUrl.resultFunc('local')).toEqual('https://metadata.cdtv.lab');
      expect(Settings.MetadataApiUrl.resultFunc('sls1')).toEqual('https://metadata.sls1.cdops.net');
      expect(Settings.MetadataApiUrl.resultFunc('prd1')).toEqual('https://metadata.prd1.contentdirect.tv');
    });

    test('It should return an empty string if there is not a selected environment.', () => {
      expect(Settings.MetadataApiUrl.resultFunc(null)).toEqual('');
    });
  });

  xdescribe('When the ServiceApiUrl is used...', () => {
    test('It should return a properly formatted api url when a selected environment exists.', () => {
      expect(Settings.ServiceApiUrl.resultFunc('qa4')).toEqual('https://qa4.services.ascendon.tv');
      expect(Settings.ServiceApiUrl.resultFunc('local')).toEqual('https://services.cdtv.lab');
      expect(Settings.ServiceApiUrl.resultFunc('sls1')).toEqual('https://services.sls1.cdops.net');
      expect(Settings.ServiceApiUrl.resultFunc('prd1')).toEqual('https://services.prd1.contentdirect.tv');
    });

    test('It should return an empty string if there is not a selected environment.', () => {
      expect(Settings.ServiceApiUrl.resultFunc(null)).toEqual('');
    });
  });

  xdescribe('When the SelectedBusinessUnit is used...', () => {
    test('It should return null when there is not a selected system id.', () => {
      expect(Settings.SelectedBusinessUnit.resultFunc(null, [])).toBeNull();
    });

    test('It should return null when there is no matching business unit code for the selected system id.', () => {
      expect(Settings.SelectedBusinessUnit.resultFunc('123', [{
        id: '234',
        name: 'My Business Unit'
      }])).toBeNull();
    });

    test('It should return the business unit with the matching system id to the selected system id when one exists.', () => {
      const businessUnit = {
        id: '123',
        name: 'My Business Unit'
      };
      expect(Settings.SelectedBusinessUnit.resultFunc('123', [businessUnit])).toEqual(businessUnit);
    });
  });

  describe('When the SelectedDistributionChannel is used...', () => {
    test('It should return the value of the selectedDistributionChannel attribute when one exists.', () => {
      const DATA = '612be200-4692-4a16-a313-48681134de2f';
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'settings', 'selectedDistributionChannel'], DATA);
      expect(Settings.SelectedDistributionChannel(CUSTOM_STATE)).toEqual(DATA);
    });

    test('It should return the default channel if there is no selectedDistributionChannel data.', () => {
      expect(Settings.SelectedDistributionChannel.resultFunc(null)()).toEqual(DISTRIBUTION_CHANNEL_ID);
    });
  });
});
