import { NonProspectIsLoggedIn, ProspectData, ProspectIsAvailable, ProspectUpdateError, UserIsAvailable } from './subscriber.information.selectors';

describe('Subscriber Information', () => {
  describe('ProspectData', () => {
    test('returns null when not configured', () => {
      expect(ProspectData({})).toEqual(null);
    });

    test('returns subscriberData when prospect has been added to state', () => {
      const subscriberData = {
        some: 'data'
      };
      expect(ProspectData.resultFunc({
        prospect: subscriberData
      })).toEqual(subscriberData);
    });
  });

  describe('ProspectIsAvailable', () => {
    test('returns false when prospect not configured', () => {
      expect(ProspectIsAvailable({})).toEqual(false);
    });

    test('returns true when prospect has been added to state', () => {
      const subscriberData = {
        some: 'data'
      };
      expect(ProspectIsAvailable.resultFunc({
        prospect: subscriberData
      })).toEqual(true);
    });
  });

  describe('UserIsAvailable', () => {
    test('returns false when no prospect or subscriber is present', () => {
      expect(UserIsAvailable({})).toEqual(false);
    });
    test('returns true when no prospect is present, but a subscriber is present', () => {
      expect(UserIsAvailable.resultFunc(false, true)).toEqual(true);
    });
    test('returns true when no subscriber is present, but a prospect is present', () => {
      expect(UserIsAvailable.resultFunc(true, false)).toEqual(true);
    });
  });

  describe('ProspectUpdateError', () => {
    test('returns null when no error', () => {
      expect(ProspectUpdateError({})).toEqual(null);
    });
    test('returns the error when one is stored in state', () => {
      const ERROR = 'holy heck error hoy';
      expect(ProspectUpdateError.resultFunc({
        updateError: ERROR
      })).toEqual(ERROR);
    });
  });

  describe('NonProspectIsLoggedIn', () => {
    test('It returns true if session is valid and user is not a prospect.', () => {
      expect(NonProspectIsLoggedIn.resultFunc(false, '1')).toEqual(true);
      expect(NonProspectIsLoggedIn.resultFunc(false, null)).toEqual(false);
      expect(NonProspectIsLoggedIn.resultFunc(true, '1')).toEqual(false);
    });
  });
});
