import AppConfig from 'AppConfig';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import { Ascendon } from '../ascendon/ascendon.selectors';

const Preferences = createSelector([
    Ascendon
], (ascendon) => {
    return pathOr(null, ['preferences'], ascendon);
});

export const SelectedLocale = createSelector([
    Preferences,
], (preferences) => {
    return pathOr(AppConfig.DEFAULT_LOCALE, ['selectedDisplayLanguage'], preferences);
});
