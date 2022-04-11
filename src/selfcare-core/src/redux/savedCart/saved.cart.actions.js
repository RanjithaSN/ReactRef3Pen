import pathOr from 'ramda/src/pathOr';
import { CreateAsyncFromString } from '../utils/action.creator';
import { apiThunkHelper } from '../utils/thunk.helpers';

export const SavedCartTypes = {
  SAVE_OFFERING_CART: CreateAsyncFromString('SAVE_OFFERING_CART'),
  SAVE_PRODUCT_CART: CreateAsyncFromString('SAVE_PRODUCT_CART'),
  RETRIEVE_SAVED_CART: CreateAsyncFromString('RETRIEVE_SAVED_CART'),
  RETRIEVE_SAVED_OFFERING_CART: CreateAsyncFromString('RETRIEVE_SAVED_OFFERING_CART'),
  CLEAR_SAVED_CART: CreateAsyncFromString('CLEAR_SAVED_CART')
};

export const SaveOfferingCart = (cart, append) => (
  async (dispatch, getState) => {
    const hasBulkItems = cart.Items.some(({ ShoppingCartBulkItemDetails }) => (
      Boolean(pathOr(null, ['0'], ShoppingCartBulkItemDetails))
    ));

    const data = {
      CombineProducts: false,
      AppendToCart: !hasBulkItems && append,
      ShoppingCart: cart,
      PersistCart: true
    };

    return apiThunkHelper(dispatch, getState(), SavedCartTypes.SAVE_OFFERING_CART, {
      method: 'post',
      url: 'Subscriber/UpdateShoppingCart',
      data
    });
  }
);

export const SaveProductCart = (items) => (
  async (dispatch, getState) => {
    const data = {
      CombineProducts: true,
      PersistCart: false,
      ShoppingCart: {
        Items: items
      }
    };

    return apiThunkHelper(dispatch, getState(), SavedCartTypes.SAVE_PRODUCT_CART, {
      method: 'post',
      url: 'Subscriber/UpdateShoppingCart',
      data
    }, data);
  }
);

export const RetrieveSavedCart = () => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SavedCartTypes.RETRIEVE_SAVED_CART, {
      method: 'post',
      url: 'Subscriber/RetrieveShoppingCart'
    });
  };
};

export const RetrieveShoppingCartOfferings = () => {
  return (dispatch, getState) => {
    return apiThunkHelper(dispatch, getState(), SavedCartTypes.RETRIEVE_SAVED_OFFERING_CART, {
      method: 'post',
      url: 'Subscriber/RetrieveShoppingCartOfferings'
    });
  };
};

export const ClearSavedCart = () => {
  return async (dispatch, getState) => {
    const state = getState();

    return apiThunkHelper(dispatch, state, SavedCartTypes.CLEAR_SAVED_CART, {
      method: 'post',
      url: 'Subscriber/UpdateShoppingCart',
      data: {
        ShoppingCart: {}
      }
    });
  };
};
