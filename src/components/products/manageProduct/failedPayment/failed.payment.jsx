import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React, { useEffect } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import LinkButton from 'selfcare-ui/src/components/button/link.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LocaleKeys from '../../../../locales/keys';
import { getProductsNavItem } from '../../../../navigation/sitemap.selectors';
import PageContent from '../../../pageContent/page.content';
import { navigateToProducts } from '../manage.product.helper';
import '../manage.product.scss';

const FailedPayment = ({ history, isHandlingProductAction, paymentFailure, selectedProduct, t }) => {
  useEffect(() => {
    const caseId = path(['caseId'], paymentFailure);
    if (!caseId) {
      history.replace(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}`);
      history.push(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.CHANGE)}`);
    }
  }, [history, paymentFailure, selectedProduct.offeringId, selectedProduct.offeringInstanceId, t]);

  const navigateToReturnPage = () => {
    history.push(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.RETURN)}`);
  };

  const navigateToSuspendPage = () => {
    history.push(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.SUSPEND)}`);
  };

  return (
    <PageContent>
      <div className="c-manage-product c-loading-indicator-containment">
        <LoadingIndicator isLoading={isHandlingProductAction} />
        <Heading category="brand" tone="normal">
          {t(LocaleKeys.PRODUCTS.SETTINGS.FAILED_PAYMENT)}
        </Heading>
        <div>
          <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.FAILED_PAYMENT_CONFIRMATION)}</Paragraph>
          <div className="c-manage-product__actions">
            <FilledButton className="c-manage-product__primary-action" onClick={() => navigateToProducts(history)}>{t(LocaleKeys.BACK)}</FilledButton>
            {selectedProduct.rightToReturn && (
              <LinkButton className="c-manage-product__secondary-action" onClick={navigateToReturnPage}>
                {t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT)}
              </LinkButton>
            )}
            {(selectedProduct.inGracePeriod || (selectedProduct.status !== OFFERING_OVERALL_STATUS.PENDING_REMOVAL && selectedProduct.status !== OFFERING_OVERALL_STATUS.SUSPENDED)) && (
              <LinkButton className="c-manage-product__secondary-action" onClick={navigateToSuspendPage}>
                {t(LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT)}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </PageContent>
  );
};

FailedPayment.displayName = 'FailedPayment';
FailedPayment.propTypes = {
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag for when a product action is being utilized and the loading indicator should be triggered. */
  isHandlingProductAction: PropTypes.bool.isRequired,
  /** Returns the case object for a failed payment on the selected product */
  paymentFailure: PropTypes.shape({
    /** The payment failure case id */
    caseId: PropTypes.string
  }),
  /** Selected product to perform actions against. */
  selectedProduct: PropTypes.shape({
    /** Whether this product is currently in grace period for failed payment */
    inGracePeriod: PropTypes.bool,
    /** Offering Id */
    offeringId: PropTypes.string,
    /** Offering Instance Id */
    offeringInstanceId: PropTypes.string,
    /** Bool for product having the right to return */
    rightToReturn: PropTypes.bool,
    /** Status of the product */
    status: PropTypes.number
  }),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(FailedPayment);
