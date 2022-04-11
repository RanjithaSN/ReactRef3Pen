import pathOr from 'ramda/src/pathOr';

export const Client = (store) => {
  return pathOr(null, ['client'], store);
};
