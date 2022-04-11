import { RetrieveCategories } from '../aws/categories/categories.actions';
import { RetrieveGeneralArticles } from '../aws/generalArticles/general.articles.actions';
import { RetrieveGuides } from '../aws/guides/guides.actions';
import { RetrieveVideos } from '../aws/videos/videos.actions';
import { ShouldShowGetHelpOverlay } from '../site/site.selectors';
import { CreateAsyncFromString } from 'selfcare-core/src/redux/utils/action.creator';
import { inaccountHelpThunkHelper } from 'selfcare-core/src/redux/utils/thunk.helpers';

export const GetHelpActionTypes = {
  UPDATE_OVERLAY_STATE: 'UPDATE_OVERLAY_STATE',
  SET_IS_IN_ACCOUNT_HELP: 'IS_IN_ACCOUNT_HELP',
  SET_SHOW_INACCOUNT_HELP_LIST: 'SET_SHOW_INACCOUNT_HELP_LIST',
  GET_ARTICLES: CreateAsyncFromString('GET_ARTICLES')
};

const UpdateOverlayState = (subpage, primaryId) => {
  return {
    type: GetHelpActionTypes.UPDATE_OVERLAY_STATE,
    payload: {
      subpage,
      primaryId
    }
  };
};

export const ResetOverlayState = () => {
  return {
    type: GetHelpActionTypes.UPDATE_OVERLAY_STATE,
    payload: {
      subpage: null,
      primaryId: null
    }
  };
};

export const NavigateInHelp = ({ push }, url) => (
  async (dispatch, getState) => {
    const isShowingGetHelpOverlay = ShouldShowGetHelpOverlay(getState());
    if (isShowingGetHelpOverlay) {
      const arr = url.split('/').slice(2);
      dispatch(UpdateOverlayState(arr[0], arr[1]));
    } else {
      push(url);
    }
  }
);

export const SetShowInaccountHelpList = (value) => {
  return {
    type: GetHelpActionTypes.SET_SHOW_INACCOUNT_HELP_LIST,
    payload: value
  };
};

export const GetArticles = () => {
  return (dispatch, getState) => {
    const { client: { inAccountHelp: { page1, page2, page3 } }, ascendon: { subscriberApi: { subscriber: { data: { Subscriber: { Id } } } } } } = getState();
    let urlParams = `?page1=${page1}`;

    if (page2 !== '') {
      urlParams += `&page2=${page2}`;
    }
    if (page3 !== '') {
      urlParams += `&page3=${page3}`;
    }

    return inaccountHelpThunkHelper(dispatch, getState(), GetHelpActionTypes.GET_ARTICLES, {
      method: 'get',
      url: `/${Id}${urlParams}`
    });
  };
};

export const RetrieveHelpContent = () => (dispatch) => {
  dispatch(RetrieveCategories());
  dispatch(RetrieveGeneralArticles());
  dispatch(RetrieveGuides());
  dispatch(RetrieveVideos());
};
