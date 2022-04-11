/* eslint-disable unused-imports/no-unused-vars */
import {
  BENIFY_DISTRIBUTION_CHANNEL_ID,
  DISTRIBUTION_CHANNEL_ID
} from '@selfcare/core/redux/utils/api.constants';
import * as actions from './settings.actions';

const types = actions.SettingsActionTypes;

jest.mock('../settings/settings.selectors');

describe('SettingsActions', () => {
  const mockState = 'mockState';
  const getState = jest.fn().mockReturnValue(mockState);
  const dispatch = jest.fn();

  const environmentId = '1';
  const systemId = '2';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('UpdateIsBenifyDistributionChannel', () => {
    describe('Set to benify', () => {
      beforeEach(() => {
        actions.UpdateIsBenifyDistributionChannel(true)(dispatch);
      });

      test('It should dispatch UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID.', () => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: types.UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID,
          payload: BENIFY_DISTRIBUTION_CHANNEL_ID
        });
      });
    });

    describe('Set to benify', () => {
      beforeEach(() => {
        actions.UpdateIsBenifyDistributionChannel(false)(dispatch);
      });

      test('It should dispatch UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID.', () => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: types.UPDATE_SELECTED_DISTRIBUTION_CHANNEL_ID,
          payload: DISTRIBUTION_CHANNEL_ID
        });
      });
    });
  });
});
