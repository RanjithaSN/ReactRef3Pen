import pathOr from 'ramda/src/pathOr';

export const RequestCache = (store) => {
  return pathOr(null, ['cdnRequestCache'], store);
};
