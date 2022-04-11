import { OfferingContextIntent } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { DECISION_TYPE } from '../../../../constants/order.constants';
import LocaleKeys from '../../../../locales/keys';
import PageContent, { Main } from '../../../pageContent/page.content';
import { navigateToProducts } from '../manage.product.helper';
import { getContextPageObject } from '../../../../helpers/inaccount.help.helpers';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import '../manage.product.scss';

const SIMSwap = ({ apiFault, filteredDecisions, history, isHandlingProductAction, openChangeOfServiceOrderExists, recentlyNewOrOpenPortInRequest, recentlyClosedPortInRequest,
  recentlyCreatedRequest, retrieveOfferingContextWithDecisions, searchOrders, simSwapAttribute, selectedProduct, setActiveOfferIds, submitOrder, t, toggleDecisionCartUpdate,
  updateAttributeValue, updateCart, setContextPageData }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [requestRecentlyCreatedChange, setRequestRecentlyCreatedChange] = useState(recentlyCreatedRequest);

  useEffect(() => {
    searchOrders();
  }, [searchOrders]);

  useEffect(() => {
    setContextPageData(getContextPageObject(3, 'simSwap'));
  }, [setContextPageData]);

  useEffect(() => {
    const hasOpenPortInRequest = recentlyNewOrOpenPortInRequest && !recentlyClosedPortInRequest;
    setShowConfirmation(openChangeOfServiceOrderExists || hasOpenPortInRequest);
  }, [openChangeOfServiceOrderExists, recentlyClosedPortInRequest, recentlyNewOrOpenPortInRequest, setShowConfirmation]);

  useEffect(() => {
    if (requestRecentlyCreatedChange !== recentlyCreatedRequest && recentlyCreatedRequest) {
      setShowConfirmation(true);
      setRequestRecentlyCreatedChange(true);
    }
  }, [recentlyCreatedRequest, requestRecentlyCreatedChange]);

  useEffect(() => {
    if (selectedProduct && selectedProduct.offeringInstanceId && selectedProduct.offeringId) {
      setActiveOfferIds(selectedProduct.offeringId, selectedProduct.offeringInstanceId);
    }
  }, [retrieveOfferingContextWithDecisions, selectedProduct, setActiveOfferIds]);

  const updateDecisionForOffer = async () => {
    if (selectedProduct && selectedProduct.offeringInstanceId && selectedProduct.offeringId) {
      await retrieveOfferingContextWithDecisions(selectedProduct.offeringId, selectedProduct.offeringInstanceId);

      if (filteredDecisions) {
        const options = {
          action: OfferingContextIntent.MODIFY,
          decisionId: filteredDecisions.Id,
          optionId: selectedProduct.offeringId,
          optionName: selectedProduct.displayName, // Name is present on current option
          offeringId: selectedProduct.offeringId,
          offeringInstanceId: selectedProduct.offeringInstanceId,
          offerName: selectedProduct.displayName
        };
        await toggleDecisionCartUpdate(options);
      }
    }
  };

  const doSimSwap = async () => {
    const optionId = path(['OfferingOptionPriceId'], simSwapAttribute);
    const attributeId = path(['Id'], simSwapAttribute);
    const isRequired = path(['IsRequired'], simSwapAttribute);
    await updateAttributeValue(DECISION_TYPE.QUANTITY, optionId, attributeId, 'Yes', isRequired);
    await updateDecisionForOffer();
    await updateCart();
    await submitOrder({
      OfferingId: selectedProduct.offeringId,
      OfferingInstanceId: selectedProduct.offeringInstanceId
    });
    setShowConfirmation(!apiFault);
  };

  return (
    <PageContent>
      <Main>
        <div className="c-manage-product c-loading-indicator-containment">
          <LoadingIndicator isLoading={isHandlingProductAction} />
          <Heading category="brand" tone="normal">
            {t(LocaleKeys.PRODUCTS.SETTINGS.REPLACE_SIM)}
          </Heading>
          {!showConfirmation && (
            <React.Fragment>
              <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.SIM_SWAP)}</Paragraph>
              {apiFault && <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />}
              <div>
                <OutlineButton className="c-manage-product__primary-action c-button-double" onClick={() => navigateToProducts(history)}>
                  {t(LocaleKeys.CANCEL)}
                </OutlineButton>
                <FilledButton className="c-manage-product__primary-action c-button-double" onClick={doSimSwap}>
                  {t(LocaleKeys.SUBMIT)}
                </FilledButton>
              </div>
            </React.Fragment>
          )}
          {showConfirmation && (
            <>
              <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.CHANGE_OF_SERVICE_IN_PROGRESS)}</Paragraph>
              <FilledButton className="c-manage-product__primary-action" onClick={() => navigateToProducts(history)}>
                {t(LocaleKeys.BACK)}
              </FilledButton>
            </>
          )}
        </div>
      </Main>
    </PageContent>
  );
};

SIMSwap.displayName = 'SIMSwap';
SIMSwap.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Filtered decisions used  to select options */
  filteredDecisions: PropTypes.shape({
    /** Id of decision  */
    Id: PropTypes.string.isRequired,
    /** Options to select from */
    Options: PropTypes.arrayOf(PropTypes.shape({
      /** Amounts related to the option */
      BillerRuleInstanceAmounts: PropTypes.array,
      /** Id of the option */
      Id: PropTypes.string,
      /** Name of the option */
      Name: PropTypes.string,
      /** Current quantity of the option */
      Quantity: PropTypes.number
    }))
  }),
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag for when a product action is being utilized and the loading indicator should be triggered. */
  isHandlingProductAction: PropTypes.bool.isRequired,
  /** Flag used to display a confirmation message when the user cannot perform any change of service */
  openChangeOfServiceOrderExists: PropTypes.bool,
  /** Flag for recently submitted support request. */
  recentlyCreatedRequest: PropTypes.bool,
  /** Action used to fetch information about the product. */
  retrieveOfferingContextWithDecisions: PropTypes.func.isRequired,
  /** Fetches and loads all the users orders */
  searchOrders: PropTypes.func.isRequired,
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
  }),
  /** Action used to set the offer id and offering instance id. */
  setActiveOfferIds: PropTypes.func.isRequired,
  /** SIM Swap attribute needed to update and start the SIM Swap process flow. */
  simSwapAttribute: PropTypes.shape({
    /** ID for Sim Swap. */
    Id: PropTypes.string,
    /** True if required. */
    IsRequired: PropTypes.bool,
    /** Offering option price id for Sim Swap. */
    OfferingOptionPriceId: PropTypes.string,
    /** Possible values to set SIM Swap to. */
    PossibleValues: PropTypes.arrayOf(PropTypes.string),
    /** Current value of Sim Swap. */
    SelectedValue: PropTypes.string
  }),
  /** Recent Port in Request */
  recentlyNewOrOpenPortInRequest: PropTypes.shape({}),
  /** Recent Closed Port In Request */
  recentlyClosedPortInRequest: PropTypes.shape({
    /** Response message for closed port in request */
    responseMessage: PropTypes.string,
    /** successful flag for closed port in request */
    successfull: PropTypes.bool
  }),
  /** Function used to submit order used when changing the decision on the offer. */
  submitOrder: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Action used to get new shopping cart totals based on the new selection. */
  toggleDecisionCartUpdate: PropTypes.func.isRequired,
  /** Function to update the attribute value */
  updateAttributeValue: PropTypes.func.isRequired,
  /** Function to update the cart in order to submit an order. */
  updateCart: PropTypes.func.isRequired,
  /** Action to change ui context page data */
  setContextPageData: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(SIMSwap);
