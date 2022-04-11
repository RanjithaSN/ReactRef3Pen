import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';
import LOADING_STATUS from '../../../constants/loading.status';
import { Metadata } from '../../ascendon/ascendon.selectors';

export const Base = createSelector(
  Metadata,
  (base) => pathOr(null, ['products'], base)
);

export const ProductId = (state, productId) => productId;

export const ProductStatus = createSelector(
  Base,
  ProductId,
  (products, id) => pathOr(LOADING_STATUS.UNLOADED, [id, 'status'], products)
);

export const Product = createSelector(
  Base,
  ProductId,
  (products, id) => pathOr(null, [id, 'product'], products)
);
