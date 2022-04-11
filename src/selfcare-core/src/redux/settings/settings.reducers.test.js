import { SettingsActionTypes } from './settings.actions';
import reducer, { INITIAL_STATE } from './settings.reducer';

describe('Settings Reducer', () => {
  describe('When SettingsActionTypes.SAVE_SELECTED_ENVIRONMENT is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const payload = 'qa1';
      const response = reducer(INITIAL_STATE, {
        type: SettingsActionTypes.SAVE_SELECTED_ENVIRONMENT,
        payload
      });

      expect(response.selectedEnvironment).toBe(payload);
    });
  });

  describe('When SettingsActionTypes.SAVE_SELECTED_SYSTEM_ID is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const payload = '12345';
      const response = reducer(INITIAL_STATE, {
        type: SettingsActionTypes.SAVE_SELECTED_SYSTEM_ID,
        payload
      });
      expect(response.selectedSystemId).toBe(payload);
    });
  });

  describe('When SettingsActionTypes.UPDATE_PORT_IN_FDA_DAYS is dispatched...', () => {
    test('It should return the new right to return days.', () => {
      const payload = 12345;
      const response = reducer(INITIAL_STATE, {
        type: SettingsActionTypes.UPDATE_PORT_IN_FDA_DAYS,
        payload
      });
      expect(response.portInFDADays).toBe(payload);
    });
  });

  describe('When SettingsActionTypes.UPDATE_RIGHT_TO_RETURN_DAYS is dispatched...', () => {
    test('It should return the new right to return days.', () => {
      const payload = 12345;
      const response = reducer(INITIAL_STATE, {
        type: SettingsActionTypes.UPDATE_RIGHT_TO_RETURN_DAYS,
        payload
      });
      expect(response.rightToReturnDays).toBe(payload);
    });
  });

  describe('When any other action is dispatched...', () => {
    test('It should return the state passed to the reducer.', () => {
      const response = reducer(INITIAL_STATE, {
        type: 'some other type'
      });

      expect(response).toBe(INITIAL_STATE);
    });
  });

  describe('When SettingsActionTypes.SHOW_DEVICE_OFFERS is dispatched...', () => {
    test('With a payload of true, it should return true.', () => {
      const payload = true;
      const response = reducer(INITIAL_STATE, {
        type: SettingsActionTypes.UPDATE_SHOW_DEVICE_OFFERS,
        payload
      });

      expect(response.showDeviceOffers).toBe(payload);
    });
  });

  describe('When SettingsActionTypes.UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID is dispatched...', () => {
    test('With a payload of 612be200-4692-4a16-a313-48681134de2f, it should set selectedDistributionChannel to 612be200-4692-4a16-a313-48681134de2f.', () => {
      const payload = '612be200-4692-4a16-a313-48681134de2f';
      const response = reducer(INITIAL_STATE, {
        type: SettingsActionTypes.UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID,
        payload
      });

      expect(response.selectedDistributionChannel).toBe(payload);
    });
  });
});
