import { GetHelpActionTypes } from './get.help.actions';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = new Immutable({
  overlaySubpage: null,
  overlayPrimaryId: null,
  showInaccountHelpList: false,
  inaccountHelpList: [],
  isLoadingInaccountList: false
});

export default function GetHelpReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GetHelpActionTypes.UPDATE_OVERLAY_STATE:
    return state.merge({
      overlaySubpage: payload.subpage,
      overlayPrimaryId: payload.primaryId
    });
  case GetHelpActionTypes.SET_SHOW_INACCOUNT_HELP_LIST:
    return state.set('showInaccountHelpList', payload);
  case GetHelpActionTypes.GET_ARTICLES.BEGIN:
    return state.set('isLoadingInaccountList', true);
  case GetHelpActionTypes.GET_ARTICLES.SUCCESS: {
    try {
      const list = JSON.parse(payload).hits.hit;

      return state.merge({
        inaccountHelpList: list,
        isLoadingInaccountList: false,
        showInaccountHelpList: list.length > 0
      });
    } catch {
      return state.merge({
        inaccountHelpList: [],
        isLoadingInaccountList: false,
        showInaccountHelpList: false
      });
    }
  }
  default:
    return state;
  }
}
