import Immutable from 'seamless-immutable';
import * as Version from './version.selectors';

const initializedStore = new Immutable({});

const VERSIONINFO = {
  ID: 1,
  post_title: 'Versions',
  guid: 'https://csg-penny-dev.aviture-sandbox.com/',
  post_type: 'landing_page',
  post_uri: '/20',
  post_categories: [],
  custom_fields: {
    forced_version_number: '12345',
    ios_link: 'link to apple',
    android_link: 'link to google',
    benify_enabled: true
  }
};

const mappedCustomFields = {
  forcedVersionNumber: '12345',
  appStoreLink: 'link to apple',
  playStoreLink: 'link to google',
  benifyEnabled: true
};

describe('Version ', () => {
  describe('When the VersionInformation selector is used...', () => {
    test('It should return the version object.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'version', 'versionInfo'], VERSIONINFO);
      expect(Version.VersionInformation(CUSTOM_STATE)).toEqual(mappedCustomFields);
    });
    test('It should return null when no landingPage object exists.', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'version', 'versionInfo', 'custom_fields'], null);
      expect(Version.VersionInformation(CUSTOM_STATE)).toEqual(null);
    });
  });
});
