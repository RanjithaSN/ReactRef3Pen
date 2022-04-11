import { TroubleshooterTypes } from './troubleshooter.actions';
import reducer, { INITIAL_STATE } from './troubleshooter.reducer';

describe('Troubleshooter Reducer ', () => {
  const historyArray = [1, 2, 3, 4];

  describe('When PushToHistory is dispatched', () => {
    test('It should update the history array', () => {
      const response = reducer(INITIAL_STATE, {
        type: TroubleshooterTypes.PushToHistory,
        payload: historyArray
      });

      expect(response.History).toEqual(historyArray);
    });
  });
});
