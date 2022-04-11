export const SCROLL_ELEMENT_ID = 'scrollable-element';

export const getSiteScrollPosition = () => {
  return document.getElementById(SCROLL_ELEMENT_ID).scrollTop;
};

export const setSiteScrollPosition = (value) => {
  document.getElementById(SCROLL_ELEMENT_ID).scrollTop = value;
};
