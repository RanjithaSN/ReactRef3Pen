import { InternalProduct } from '../../redux/products/products.types';
import { DiscountType } from './constants';

export interface OrCondition {
  type: 'or';
  terms: Condition[];
}

export interface AndCondition {
  type: 'and';
  terms: Condition[];
}

export interface NotCondition {
  type: 'not';
  term: Condition;
}

export interface ProductTerm {
  type: 'product';
  id: string;
}

export type Condition = OrCondition | AndCondition | NotCondition | ProductTerm;

export interface DiscountCondition {
  appliesToProducts: string[];
  discountType: DiscountType;
  condition: Condition;
}

export interface AffectedDiscount {
  products: InternalProduct[];
  discountType: DiscountType;
  removedProduct: InternalProduct;
}
