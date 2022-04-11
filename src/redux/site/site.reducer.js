import * as LocalStorageHelper from '@selfcare/core/helpers/storage/local.storage';
import { DEVICE_TYPE, SHOULD_SHOW_OTT_GUIDED_EXPERIENCE } from '@selfcare/core/redux/utils/api.constants';
import Immutable from 'seamless-immutable';
import isNil from 'ramda/src/isNil';
import { SiteTypes } from './site.actions';

export const INITIAL_STATE = new Immutable({
  currentPage: null,
  deviceType: LocalStorageHelper.read(DEVICE_TYPE),
  localeReady: true,
  shouldShowCookieInfo: false,
  shouldShowOTTGuidedExperience: LocalStorageHelper.read(SHOULD_SHOW_OTT_GUIDED_EXPERIENCE),
  shouldShowGetHelpOverlay: false,
  shouldScroll: false,
  scrollPosition: 0
});

export default function SiteReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case SiteTypes.UpdateCurrentPage:
    return state.set('currentPage', payload);
  case SiteTypes.UpdateLocaleReady:
    return state.set('localeReady', payload);
  case SiteTypes.UpdateShouldShowCookieInfo:
    return state.set('shouldShowCookieInfo', payload);
  case SiteTypes.UpdateShouldShowOTTGuidedExperience:
    return state.set('shouldShowOTTGuidedExperience', payload);
  case SiteTypes.UpdateShouldShowGetHelpOverlay:
    return state.set('shouldShowGetHelpOverlay', payload);
  case SiteTypes.SetScroll: {
    if (!isNil(payload)) {
      return state.merge({
        shouldScroll: true,
        scrollPosition: payload
      });
    }

    return state.merge({
      shouldScroll: false,
      scrollPosition: 0
    });
  }
  default:
    return state;
  }
}
