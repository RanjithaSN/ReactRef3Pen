import { INITIAL_STATE } from './troubleshooter.reducer';
import * as Troubleshooter from './troubleshooter.selectors';

describe('Troubleshooter Selectors ', () => {
  const historyArray = [1, 2, 3, 4];
  const selectedFlow = 'ModemNotDelivered.Id';
  const store = INITIAL_STATE
    .setIn(['History'], historyArray)
    .setIn(['SelectedTroubleshooterId'], selectedFlow);

  describe('When GetHistory is used...', () => {
    test('It should return an empty array if there is no flow', () => {
      expect(Troubleshooter.GetHistory.resultFunc(INITIAL_STATE)).toEqual([]);
    });

    test('It should return the history array if there is data', () => {
      expect(Troubleshooter.GetHistory.resultFunc(store)).toEqual(historyArray);
    });
  });
});
