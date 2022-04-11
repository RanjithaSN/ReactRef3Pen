import * as GetHelp from './get.help.selectors';

describe('GetHelp ', () => {
  describe('When HelpOverlaySubpage is used...', () => {
    test('It should return the value of the subpage attribute when one exists', () => {
      expect(GetHelp.HelpOverlaySubpage.resultFunc({
        overlaySubpage: 'artikel'
      })).toEqual('artikel');
    });

    test('It should return null if no value is set', () => {
      expect(GetHelp.HelpOverlaySubpage.resultFunc()).toEqual(null);
    });
  });

  describe('When HelpOverlayPrimaryId is used...', () => {
    test('It should return the value of the primaryId attribute when one exists', () => {
      expect(GetHelp.HelpOverlayPrimaryId.resultFunc({
        overlayPrimaryId: '744'
      })).toEqual('744');
    });

    test('It should return null if no value is set', () => {
      expect(GetHelp.HelpOverlayPrimaryId.resultFunc()).toEqual(null);
    });
  });
});
