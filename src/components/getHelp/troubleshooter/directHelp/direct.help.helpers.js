export const AUTHENTICATED_SECTIONS = ['other', 'technical', 'payment'];
export const UNAUTHENTICATED_SECTIONS = ['revoked'];
export const DEFAULT_LP_SECTION = 'other';

export const initializeDirectHelp = (hist, section) => {
  window.zE.activate({
    hideOnClose: true
  });
  window.zE('webWidget', 'chat:addTags', [section]);
  window.__prefillZenDesk();
};

export const buildHistoryNodeFromKeyValue = (keyString, valueString) => {
  return {
    type: 'error',
    error: {
      contextId: keyString,
      code: valueString
    }
  };
};
