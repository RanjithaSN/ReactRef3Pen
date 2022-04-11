
import { InAccountHelpTypes } from './in.accounthelp.actions';
import Immutable from 'seamless-immutable';

export const INITIAL_STATE = new Immutable({
  page1: '',
  page2: '',
  page3: '',
  data: {},
  results: [],
  isLoadingResults: false,
  helpArticle: null
});

export default function inAccountHelp(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case InAccountHelpTypes.SetInAccountHelpPages:
    return state.merge(payload);
  case InAccountHelpTypes.SetData:
    return state.set('data', payload);
  case InAccountHelpTypes.SetContextPageData:
    return state.set(`page${payload.pageNumber}`, payload.pageInfo);
  case InAccountHelpTypes.ResetPageData:
    return state.set(`page${payload}`, '');
  case InAccountHelpTypes.SetHelpResults:
    return state.set('results', payload);
  case InAccountHelpTypes.SetIsLoadingResults:
    return state.set('isLoadingResults', payload);
  case InAccountHelpTypes.SetHelpArticle:
    return state.set('helpArticle', payload);
  default:
    return state;
  }
}
