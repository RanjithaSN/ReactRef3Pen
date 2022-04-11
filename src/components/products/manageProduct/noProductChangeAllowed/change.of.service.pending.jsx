import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import { getProductsNavItem } from '../../../../navigation/sitemap.selectors';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LinkButton from 'selfcare-ui/src/components/button/link.button';
import LocaleKeys from '../../../../locales/keys';

const ChangeOfServicePending = ({ t, clearOrderData, history, recentlyNewOrOpenPortInRequest, recentlyClosedPortInRequest, selectedProduct }) => {
  const [secondaryAction, setSecondaryAction] = useState({});
  const hasOpenPortInRequest = recentlyNewOrOpenPortInRequest && !recentlyClosedPortInRequest;

  useEffect(() => {
    if (hasOpenPortInRequest) {
      setSecondaryAction({
        mode: t(LocaleKeys.ROUTES.MANAGE_PAGE.RETURN),
        label: t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT)
      });
    }
  }, [recentlyClosedPortInRequest, recentlyNewOrOpenPortInRequest, hasOpenPortInRequest, t]);

  return (
    <div className="c-manage-product c-loading-indicator-containment">
      <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.CHANGE_OF_SERVICE_IN_PROGRESS)}</Paragraph>
      {secondaryAction !== {} && (
        <LinkButton
          className="c-manage-product__secondary-action"
          onClick={() => {
            clearOrderData();
            const instanceId = path(['offeringInstanceId'], selectedProduct);
            const id = path(['offeringId'], selectedProduct);
            history.push(`${getProductsNavItem().url}/${id}-${instanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${secondaryAction.mode}`);
          }}
        >
          {secondaryAction.label}
        </LinkButton>
      )}
    </div>
  );
};

ChangeOfServicePending.displayName = 'ChangeOfServicePending';
ChangeOfServicePending.propTypes = {
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Function used to clear order data. */
  clearOrderData: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Recent Port in Request */
  recentlyNewOrOpenPortInRequest: PropTypes.shape({}),
  /** Recent Closed Port In Request */
  recentlyClosedPortInRequest: PropTypes.shape({
    /** Response message for closed port in request */
    responseMessage: PropTypes.string,
    /** successful flag for closed port in request */
    successfull: PropTypes.bool
  }),
  /** Selected product to perform actions against. */
  selectedProduct: PropTypes.shape({
    /** Offering Id */
    offeringId: PropTypes.string,
    /** Offering Instance Id */
    offeringInstanceId: PropTypes.string,
    /** Display Name */
    displayName: PropTypes.string,
    /** Flag to determine if a use can opt out of the renewal at the end of the billing cycle. */
    canOptOutOnRenew: PropTypes.bool,
    /** Currency Code */
    currencyCode: PropTypes.string,
    /** Billing object on the offer */
    billing: PropTypes.shape({
      /** Next charge date for the offer */
      nextChargeDate: PropTypes.string
    }),
    /** Bool for product having first usage */
    hasFirstUsage: PropTypes.bool,
    /** The selected option Id on the primary decision. */
    hasPrimaryOption: PropTypes.string,
    /** Bool for product being benify */
    isBenify: PropTypes.bool,
    /** Bool for product being broadband */
    isBroadband: PropTypes.bool,
    /** Flag to tell us if the product is wireless */
    isWireless: PropTypes.bool,
    /** Marketing Template object to be used to render upgrade /downgrade */
    marketingTemplate: PropTypes.shape({}),
    /** Options */
    options: PropTypes.array,
    /** Right to Return */
    rightToReturn: PropTypes.bool,
    /** Service Identifier for the product. Also called the phone number. */
    serviceIdentifier: PropTypes.string,
    /** Status of the product */
    status: PropTypes.number
  })
};

export default compose(
  withI18n(),
  withRouter
)(ChangeOfServicePending);
