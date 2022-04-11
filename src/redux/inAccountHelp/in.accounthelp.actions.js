
export const InAccountHelpTypes = {
  ResetPageData: 'RESET_PAGE_DATA',
  SetContextPageData: 'SET_CONTEXT_PAGE_DATA',
  SetData: 'SET_DATA',
  SetHelpResults: 'SET_HELP_RESULTS',
  SetInAccountHelpPages: 'SET_IN_ACCOUNT_HELP_PAGES',
  SetIsLoadingResults: 'SET_IS_LOADING_RESULTS',
  SetHelpArticle: 'SET_HELP_ARTICLE'
};

export const SetInAccountHelpPages = (pages) => ({
  type: InAccountHelpTypes.SetInAccountHelpPages,
  payload: pages
});

export const SetContextPageData = (pageInfo) => ({
  type: InAccountHelpTypes.SetContextPageData,
  payload: pageInfo
});

export const ResetPageData = (pageNumber) => ({
  type: InAccountHelpTypes.ResetPageData,
  payload: pageNumber
});

export const SetData = (data) => ({
  type: InAccountHelpTypes.SetData,
  payload: data
});

export const SetHelpResults = (data) => ({
  type: InAccountHelpTypes.SetHelpResults,
  payload: data
});

export const SetIsLoadingResults = (value) => ({
  type: InAccountHelpTypes.SetIsLoadingResults,
  payload: value
});
