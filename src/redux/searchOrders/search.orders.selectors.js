import { SearchOrders } from '@selfcare/core/redux/searchOrders/search.orders.selectors';
import { createSelector } from 'reselect';
import { SelectedProduct } from '../products/products.selectors';

const ORDER_STATUS = {
  PENDING: 0,
  OPEN: 1,
  COMPLETED: 2,
  CANCELED: 3
};

const ORDER_TYPE = {
  CHANGE_OF_SERVICE: 8
};

export const OpenChangeOfServiceOrderExists = createSelector([
  SearchOrders,
  SelectedProduct
], (orders, selectedProduct) => {
  const filteredOrders = orders.filter((order) => order.OrderStatus === ORDER_STATUS.OPEN &&
        order.Type === ORDER_TYPE.CHANGE_OF_SERVICE &&
        order.OrderItems.some((orderItem) => orderItem.OfferingInstanceId === selectedProduct.offeringInstanceId));
  return filteredOrders.length > 0;
});
