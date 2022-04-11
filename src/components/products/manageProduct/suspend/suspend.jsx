import LocaleKeys from '../../../../locales/keys';
import { getProductsNavItem } from '../../../../navigation/sitemap.selectors';
import { navigateToProducts } from '../manage.product.helper';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import { withRouter } from 'react-router';
import { withI18n } from 'react-i18next';
import React, { useEffect, useMemo } from 'react';
import path from 'ramda/src/path';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import { simulateProductRemoval, RemovedDiscountsToTranslationKeys } from '../../../../helpers/conditionalDiscountEngine/index';
import { VirtualInactivePennyPlayObject } from '../../../../helpers/conditionalDiscountEngine/constants';
import '../manage.product.scss';

const Suspend = ({ apiFault,
  history,
  isHandlingProductAction,
  openChangeOfServiceOrderExists,
  paymentFailure,
  pauseProduct,
  pauseProductAfterPaymentFail,
  refreshOffers,
  searchOrders,
  searchSupportRequest,
  selectedProduct,
  allProducts,
  hasPennyPlayOffer,
  selectedLocale,
  t }) => {
  useEffect(() => {
    const caseId = path(['caseId'], paymentFailure);
    if (!caseId && selectedProduct.offeringId) {
      if (openChangeOfServiceOrderExists) {
        history.replace(
          `${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}`
        );
        history.push(
          `${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(
            LocaleKeys.ROUTES.MANAGE
          )}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.CURRENTLY_PENDING)}`
        );
      } else if (!selectedProduct.canOptOutOnRenew) {
        history.replace(
          `${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}`
        );
        history.push(
          `${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(
            LocaleKeys.ROUTES.MANAGE
          )}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.RESTORE)}`
        );
      } else if (!selectedProduct.hasFirstUsage) {
        history.replace(
          `${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}`
        );
        history.push(
          `${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(
            LocaleKeys.ROUTES.MANAGE
          )}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.CHANGE)}`
        );
      }
    }
  }, [
    history,
    openChangeOfServiceOrderExists,
    paymentFailure,
    selectedProduct.canOptOutOnRenew,
    selectedProduct.hasFirstUsage,
    selectedProduct.offeringId,
    selectedProduct.offeringInstanceId,
    t
  ]);

  useEffect(() => {
    searchOrders();
  }, [searchOrders]);

  const productsForDiscountEngine = useMemo(() =>
    hasPennyPlayOffer ? allProducts : [...allProducts, VirtualInactivePennyPlayObject],
  [hasPennyPlayOffer, allProducts]);

  const discountsToBeRemoved = useMemo(() => simulateProductRemoval(productsForDiscountEngine, selectedProduct), [productsForDiscountEngine, selectedProduct]);
  const discountTranslationKeys = useMemo(() => RemovedDiscountsToTranslationKeys(discountsToBeRemoved, {
    t,
    locale: selectedLocale
  }), [discountsToBeRemoved, selectedLocale, t]);

  const handleOptOfProduct = async () => {
    if (selectedProduct.canOptOutOnRenew) {
      const caseId = path(['caseId'], paymentFailure);
      if (caseId) {
        await pauseProductAfterPaymentFail(caseId);
      } else {
        await pauseProduct(selectedProduct);
      }
      searchSupportRequest();
      navigateToProducts(history);
      refreshOffers(selectedProduct);
    }
  };

  return (
    <div className="c-manage-product c-loading-indicator-containment">
      <LoadingIndicator isLoading={isHandlingProductAction} />
      <Heading category="brand" tone="quiet">
        {t(LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT)}
      </Heading>
      <Paragraph
        style={{
          whiteSpace: 'pre-line'
        }}
        className="c-manage-product__description"
      >
        {t(LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT_DESCRIPTION)}
      </Paragraph>
      {apiFault && <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />}
      <Paragraph
        style={{
          whiteSpace: 'pre-line'
        }}
        className="c-manage-product__description"
      >
        {t(LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT_END, {
          endDate: selectedProduct.billing.nextChargeDate
        })}
        {' '}
        {discountTranslationKeys.map(([key, args]) => t(key, {
          ...args
        })).join(' ')}
      </Paragraph>
      <div>
        <FilledButton className="c-manage-product__primary-action c-button-double" onClick={handleOptOfProduct}>
          {t(LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT)}
        </FilledButton>
        <OutlineButton
          className="c-manage-product__secondary-action c-button-double"
          onClick={() => navigateToProducts(history)}
        >
          {t(LocaleKeys.CANCEL)}
        </OutlineButton>
      </div>
    </div>
  );
};

Suspend.displayName = 'Suspend';
Suspend.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag for when a product action is being utilized and the loading indicator should be triggered. */
  isHandlingProductAction: PropTypes.bool.isRequired,
  /** Flag used to display a confirmation message when the user cannot perform any change of service */
  openChangeOfServiceOrderExists: PropTypes.bool,
  /** Returns the case object for a failed payment on the selected product */
  paymentFailure: PropTypes.shape({
    /** The payment failure case id */
    caseId: PropTypes.string
  }),
  /** Function used to opt out of auto renew associated to the product ids */
  pauseProduct: PropTypes.func.isRequired,
  /** Function used to opt out of auto renew if the current product has a payment failure */
  pauseProductAfterPaymentFail: PropTypes.func.isRequired,
  /** Refresh Subscriber Offers */
  refreshOffers: PropTypes.func.isRequired,
  /** Fetches and loads all the users orders */
  searchOrders: PropTypes.func.isRequired,
  /** The action to trigger when populating the list for support requests */
  searchSupportRequest: PropTypes.func.isRequired,
  /** Selected product to perform actions against. */
  selectedProduct: PropTypes.shape({
    /** Offering Id */
    offeringId: PropTypes.string,
    /** Offering Instance Id */
    offeringInstanceId: PropTypes.string,
    /** Flag to determine if a use can opt out of the renewal at the end of the billing cycle. */
    canOptOutOnRenew: PropTypes.bool,
    /** Billing object on the offer */
    billing: PropTypes.shape({
      /** Next charge date for the offer */
      nextChargeDate: PropTypes.string
    }),
    /** Bool for product having first usage */
    hasFirstUsage: PropTypes.bool,
    /** Bool for product being benify */
    isBenify: PropTypes.bool
  }),
  allProducts: PropTypes.array,
  hasPennyPlayOffer: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  selectedLocale: PropTypes.string
};

export default compose(withI18n(), withRouter)(Suspend);
