import * as Site from './site.selectors';

describe('Site Selectors ', () => {
  describe('When DeviceType is used...', () => {
    test('It should return undefined if there is no value set', () => {
      expect(Site.DeviceType.resultFunc({})).toEqual(undefined);
    });

    test('It should return the value of the device type that exist', () => {
      expect(Site.DeviceType.resultFunc({
        deviceType: 'ios'
      })).toEqual('ios');
    });
  });

  describe('When IsRunningIOS is used...', () => {
    test('It should return false if there is no value set or it is not ios/android', () => {
      expect(Site.IsRunningIOS.resultFunc()).toEqual(false);
      expect(Site.IsRunningIOS.resultFunc('web')).toEqual(false);
    });

    test('It should return false if the value is android', () => {
      expect(Site.IsRunningIOS.resultFunc('android')).toEqual(false);
    });

    test('It should true if the value is ios', () => {
      expect(Site.IsRunningIOS.resultFunc('ios')).toEqual(true);
    });
  });

  describe('When IsRunningMobile is used...', () => {
    test('It should return false if there is no value set or it is not ios/android', () => {
      expect(Site.IsRunningMobile.resultFunc()).toEqual(false);
      expect(Site.IsRunningMobile.resultFunc('web')).toEqual(false);
    });

    test('It should true if the value is ios or android', () => {
      expect(Site.IsRunningMobile.resultFunc('ios')).toEqual(true);
      expect(Site.IsRunningMobile.resultFunc('android')).toEqual(true);
    });
  });

  describe('When ShouldShowCookieInfo is used...', () => {
    test('It should return true if there is no value set or it is true', () => {
      expect(Site.ShouldShowCookieInfo.resultFunc()).toEqual(true);
      expect(Site.ShouldShowCookieInfo.resultFunc({
        shouldShowCookieInfo: true
      })).toEqual(true);
    });

    test('It should false if the value is false', () => {
      expect(Site.ShouldShowCookieInfo.resultFunc({
        shouldShowCookieInfo: false
      })).toEqual(false);
    });
  });

  describe('When ShouldShowOTTGuidedExperience is used...', () => {
    test('It should return true if the state for shouldShow is true (or absent) and we are running mobile', () => {
      expect(Site.ShouldShowOTTGuidedExperience.resultFunc({
        shouldShowOTTGuidedExperience: true
      }, true)).toEqual(true);
      expect(Site.ShouldShowOTTGuidedExperience.resultFunc({}, true)).toEqual(true);
    });

    test('It should return false if either are not true', () => {
      expect(Site.ShouldShowOTTGuidedExperience.resultFunc({
        shouldShowOTTGuidedExperience: false
      }, true)).toEqual(false);
      expect(Site.ShouldShowOTTGuidedExperience.resultFunc({
        shouldShowOTTGuidedExperience: true
      }, false)).toEqual(false);
      expect(Site.ShouldShowOTTGuidedExperience.resultFunc({
        shouldShowOTTGuidedExperience: false
      }, false)).toEqual(false);
    });
  });

  describe('When ShouldShowGetHelpOverlay is used...', () => {
    test('It should return false if there is no value set or false', () => {
      expect(Site.ShouldShowGetHelpOverlay.resultFunc()).toEqual(false);
      expect(Site.ShouldShowGetHelpOverlay.resultFunc({
        shouldShowGetHelpOverlay: false
      })).toEqual(false);
    });

    test('It should return true if the value is true', () => {
      expect(Site.ShouldShowGetHelpOverlay.resultFunc({
        shouldShowGetHelpOverlay: true
      })).toEqual(true);
    });
  });
});
