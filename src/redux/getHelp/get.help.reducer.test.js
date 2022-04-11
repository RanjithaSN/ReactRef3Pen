import { GetHelpActionTypes } from './get.help.actions';
import reducer, { INITIAL_STATE } from './get.help.reducer';

describe('Get Help Reducer', () => {
  describe('When GetHelpActionTypes.UpdateOverlayState is dispatched...', () => {
    const payload = {
      subpage: 'artikel',
      primaryId: '744'
    };

    test('It should set the subpage and primaryId according to the payload', () => {
      const response = reducer(INITIAL_STATE, {
        type: GetHelpActionTypes.UPDATE_OVERLAY_STATE,
        payload
      });
      expect(response.overlaySubpage).toEqual('artikel');
      expect(response.overlayPrimaryId).toEqual('744');
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
});
