  import { ProductTerm, OrCondition, AndCondition, NotCondition, Condition } from './types';

export const idsToProducts = (productIds: string[]): ProductTerm[] => {
  return productIds.map((id) => ({
    type: 'product',
    id: id
  }));
};

export const Any = (terms: Condition[]): OrCondition => ({
  type: 'or',
  terms
});

export const All = (terms: Condition[]): AndCondition => ({
  type: 'and',
  terms
});

export const Not = (term: Condition): NotCondition => ({
  type: 'not',
  term
});

export const ValidateList = (idList: string[], condition: Condition): boolean => {
  switch (condition.type) {
  case 'or':
    return condition.terms.map((term) => ValidateList(idList, term)).includes(true);
  case 'and':
    return condition.terms.map((term) => ValidateList(idList, term)).every((b) => b);
  case 'not':
    return !ValidateList(idList, condition.term);
  case 'product':
    return idList.includes(condition.id);
  default:
    throw new Error('ValidateList: Reached invalid case `default`.');
  }
};

