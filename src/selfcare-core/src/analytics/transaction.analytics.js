import pathOr from 'ramda/src/pathOr';
import { log } from '../helpers/log';
import { createProduct, dataLayerPush } from './analytics.helper';

export const getPrice = (item) => {
  const recurringBillingRuleInstances = pathOr([], ['PricingPlan', 'PricingPlanBillerRuleInstances', 'RecurringBillerRuleInstances'], item);
  const discounts = pathOr([], ['Discounts'], item);

  const totalPrice = recurringBillingRuleInstances
    .reduce((ruleInstances, instance) => {
      return ruleInstances.concat(instance.BillerRuleInstanceCharges);
    }, [])
    .reduce((sum, instanceCharge) => {
      return sum + instanceCharge.ChargeAmount;
    }, 0);

  const totalDiscount = recurringBillingRuleInstances
    .reduce((ruleInstances, instance) => {
      return ruleInstances.concat(instance.BillerRuleInstanceDiscounts);
    }, [])
    .map((instanceDiscount) => {
      return discounts.find((discount) => discount.Discount.Id === instanceDiscount.DiscountId);
    })
    .filter((discount) => discount !== null && discount !== undefined)
    .reduce((sum, discount) => {
      return sum + discount.Discount.Amount;
    }, 0);

  return (totalPrice - totalDiscount).toFixed(2);
};

export const transformItemToTransactionProduct = (item) => {
  return {
    id: item.Product.Id,
    name: item.Product.Name,
    price: getPrice(item),
    category: item.Product.LineOfBusinessName,
    quantity: item.Quantity,
    dimension2: item.Product.Status
  };
};

// TODO Fix This: We are not sending consistent information. Other analytics are using the parent DecisionOptions.Id
export const transactionEventFromOrder = (order = {}) => {
  const { Id, Totals = {}, DiscountName, Items = [] } = order;
  const ItemsWithoutDuplicates = Items.reduce((uniqueArr, item) => {
    if (!item.Product || !item.Product.Id) {
      return uniqueArr;
    }
    const existingItemIndex = uniqueArr.findIndex((uniqueItem) => uniqueItem.Product && uniqueItem.Product.Id === item.Product.Id);
    if (existingItemIndex !== -1) {
      const existingItem = uniqueArr[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        Quantity: existingItem.Quantity + 1
      };
      const updatedUniqueArray = [...uniqueArr];
      updatedUniqueArray[existingItemIndex] = updatedItem;
      return updatedUniqueArray;
    }
    return [...uniqueArr, {
      ...item,
      Quantity: 1
    }];
  }, []);

  const analyticItems = ItemsWithoutDuplicates.filter((item) => {
    return !!item;
  }).map(transformItemToTransactionProduct);

  // TODO refactor this to not use the transformItemToTransactionProduct and remove later
  const revenue = (analyticItems.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2);

  return {
    event: 'transaction',
    ecommerce: {
      purchase: {
        actionField: {
          id: Id,
          revenue,
          tax: Totals.TaxAmount,
          coupon: DiscountName
        },
        products: analyticItems
      }
    },
    shippingMethod: 'mail'
  };
};

export const getActionField = (order) => {
  const { Id, Totals = {}, DiscountName, Items = [] } = order;
  const ItemsWithoutDuplicates = Items.reduce((uniqueArr, item) => {
    if (!item.Product || !item.Product.Id) {
      return uniqueArr;
    }
    const existingItemIndex = uniqueArr.findIndex((uniqueItem) => uniqueItem.Product && uniqueItem.Product.Id === item.Product.Id);
    if (existingItemIndex !== -1) {
      const existingItem = uniqueArr[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        Quantity: existingItem.Quantity + 1
      };
      const updatedUniqueArray = [...uniqueArr];
      updatedUniqueArray[existingItemIndex] = updatedItem;
      return updatedUniqueArray;
    }
    return [...uniqueArr, {
      ...item,
      Quantity: 1
    }];
  }, []);

  const analyticItems = ItemsWithoutDuplicates.filter((item) => {
    return !!item;
  }).map(transformItemToTransactionProduct);

  const revenue = (analyticItems.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2);

  return {
    id: Id,
    revenue,
    tax: Totals.TaxAmount,
    coupon: DiscountName
  };
};

/**
 *
 * @param {*} optionsViewData
 *
 * @returns {{
    'event': 'checkout',
    'ecommerce': {
        'checkout': {
            'actionField': {
                'step': '1'
            },
            'products': [{
            'id': ' abc123',
            'name': 'Mobil 3GB',
            'price': '49.00',
            'brand': 'Penny',
            'category': 'Wireless',
            'variant': 'undefined',
            'position': 1,
            'dimension2': 'New'
            'dimension10': '101010101'
    }]
    }
    }
    }} the Analytics Object
    */
const transformOptionsViewDataToAnalyticPayload = (order, optionsViewData, newPortProlong, campaignId) => {
  const payload = [];
  optionsViewData.forEach((element, index) => {
    payload.push(createProduct(element, index, newPortProlong, campaignId));
  });
  // TODO ensure we aggrregate the quantity properly
  const updatedPayload = payload.map((product) => ({
    ...product,
    quantity: 1
  }));
  return {
    event: 'transaction',
    ecommerce: {
      purchase: {
        actionField: getActionField(order),
        products: updatedPayload
      }
    },
    shippingMethod: 'mail'
  };
};

export const transactionAnalytic = (submittedOrder, optionsViewData, newPortProlong) => {
  if (submittedOrder && submittedOrder.Order) {
    const analytic = transformOptionsViewDataToAnalyticPayload(submittedOrder.Order, optionsViewData, newPortProlong);
    log(submittedOrder);
    log('ECOMMERCE: Transaction Event was received pushed to analytics.');
    dataLayerPush(analytic);
    const ecommerceOnly = window.dataLayer.filter((item) => ('ecommerce' in item));
    log('ECOMMERCE SUMMARY: ', JSON.stringify(ecommerceOnly));
    return analytic;
  }
};
