import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { Client } from '../../client.selectors';

const EMPTY_OBJECT = Immutable({});

const Base = createSelector([
  Client
], (client) => {
  return pathOr(EMPTY_OBJECT, ['version'], client);
});

export const VersionInformation = createSelector([
  Base
], (version) => {
  const archivedVersionInfo = pathOr(null, ['versionInfo', 'custom_fields'], version);
  if (!archivedVersionInfo) {
    return null;
  }

  return {
    forcedVersionNumber: pathOr('', ['forced_version_number'], archivedVersionInfo),
    appStoreLink: pathOr('', ['ios_link'], archivedVersionInfo),
    playStoreLink: pathOr('', ['android_link'], archivedVersionInfo),
    benifyEnabled: pathOr('', ['benify_enabled'], archivedVersionInfo)
  };
});
