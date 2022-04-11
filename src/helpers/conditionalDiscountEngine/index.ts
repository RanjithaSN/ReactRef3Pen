import LocaleKeys from '../../locales/keys';
import { addMonths, displayDate } from '../../selfcare-core/src/helpers/date.helper';
import {formatCurrency} from 'selfcare-ui/src/utilities/localization/currency';
import { discountConditionTable } from './condition.table';
import { DiscountCondition, AffectedDiscount } from './types';
import { InternalProduct } from '../../redux/products/products.types';
import { ValidateList } from './conditions';

const getApplicableDiscounts = (productNames: string[]): DiscountCondition[] => {
  return productNames.flatMap((pn) => discountConditionTable.filter((c) => c.appliesToProducts.includes(pn)));
};

const getValidDiscounts = (productNames: string[], discounts: DiscountCondition[]): DiscountCondition[] => {
  const validDiscounts = discounts.filter((discount) => ValidateList(productNames, discount.condition));
  return validDiscounts;
};

const mapDiscountsToProducts = (discounts: DiscountCondition[], products: InternalProduct[], selectedProduct: Product): AffectedDiscount[] => {
  const mapped = discounts.map((d) => ({
    discountType: d.discountType,
    products: products.filter((p) =>
      d.appliesToProducts.includes(p.externalDisplayName)),
    removedProduct: selectedProduct
  }));
  return mapped;
};


export const simulateProductRemoval = (allProducts: InternalProduct[], product: InternalProduct): AffectedDiscount[] => {
  const productNames = allProducts.map((p) => p.externalDisplayName);
  const productsAfterRemoval = productNames.filter((n) => n !== product.externalDisplayName);
  const applicableDiscounts = getApplicableDiscounts(productNames);

  const validDiscountsOriginal = getValidDiscounts(productNames, applicableDiscounts);
  const validDiscountsAfterRemoval = getValidDiscounts(productsAfterRemoval, applicableDiscounts);

  const affectedDiscounts = validDiscountsOriginal.filter((x) => validDiscountsAfterRemoval.indexOf(x) < 0);
  const mappedAffectedDiscounts = mapDiscountsToProducts(affectedDiscounts, allProducts, product);
  return mappedAffectedDiscounts;
};

interface Translation {
  t: I18nTranslation,
  locale: string
};
const getPlay1yTrialRemovalNoticeKey = (affectedDiscount: AffectedDiscount, translation: Translation): [string, {originalPrice: number, endDate: Date}] => {
  const playProduct = affectedDiscount.products[0];
  const originalPrice = playProduct.campaign.amount;
  const playProductRenewalDate = new Date(playProduct.billing.nextChargeDate);
  const removedProductRenewalDate = new Date(affectedDiscount.removedProduct.billing.nextChargeDate);

  let playDiscountEndDate = playProductRenewalDate;
  if (playProductRenewalDate < removedProductRenewalDate) {
    playDiscountEndDate = addMonths(playProductRenewalDate, 1);
  }

  return [LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT_DISCOUNTS_AFFECTED.PENNY_PLAY_1YEAR_ACTIVE, {
    originalPrice: formatCurrency(originalPrice, playProduct.currencyCode, translation.locale),
    endDate: displayDate(playDiscountEndDate, translation.t)
  }];
};

const toTranslationKey = (affectedDiscount: AffectedDiscount, translation: Translation): [string, any] | undefined => {
  switch (affectedDiscount.discountType) {
  case 'play-1y-trial':
    return getPlay1yTrialRemovalNoticeKey(affectedDiscount, translation);
  case 'play-1y-trial-inactive':
    return [LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT_DISCOUNTS_AFFECTED.PENNY_PLAY_1YEAR_INACTIVE, {}];
  case 'double-data':
    return [LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT_DISCOUNTS_AFFECTED.DOUBLE_DATA, {}];
  default:
    return undefined;
  };
};

export const RemovedDiscountsToTranslationKeys = (affectedDiscounts: AffectedDiscount[], t: I18nTranslation): [string, any][] => {
  const keys = affectedDiscounts.map((p) => toTranslationKey(p, t)).filter((x) => !!x);
  return keys;
};


export const simulateProductAddition = (allProducts: InternalProduct, product: InternalProduct) => {
  throw new Error('simulateProductAddition not implemented');
};
