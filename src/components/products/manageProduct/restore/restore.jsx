import { OfferingContextIntent } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React, { useEffect, useState } from 'react';
import LocaleKeys from '../../../../locales/keys';
import { getProductsNavItem } from '../../../../navigation/sitemap.selectors';
import { getOptionsViewData } from '../../../shop/decision/decision.options.helper';
import { checkToSeeIfProductIsEditable, getServiceId, navigateToProducts } from '../manage.product.helper';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import CardSelection from 'selfcare-ui/src/components/cardSelection/card.selection';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import UnorderedList from 'selfcare-ui/src/components/unorderedList/unordered.list';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import { withRouter } from 'react-router';
import { withI18n } from 'react-i18next';
import '../manage.product.scss';

const Restore = ({ apiFault, broadbandAttributesObject, clearOrderData, feasilityOffers, filteredDecisions, isHandlingProductAction, history, openChangeOfServiceOrderExists, refreshOffers, unpauseProductAfterRenewal, unpauseProductBeforeRenewal, retrieveOfferingContext, searchOrders, selectedLocale, selectedProduct, retrieveAvailableOffers, t, toggleDecisionCartUpdate, updateAttributesForPurchase, updatedQuotesForDecision }) => {
  const [formattedDecisionsForSelection, setFormattedDecisionsForSelection] = useState([]);
  const [productDataRetrieved, setProductDataRetrieved] = useState(false);
  const [displayFixedError, setDisplayFixedError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [pendingPause, setPendingPause] = useState(false);
  const [recentlySubmittedOrder, setRecentlySubmittedOrder] = useState(false);

  useEffect(() => {
    if (selectedProduct && selectedProduct.canOptOutOnRenew) {
      history.replace(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}`);
      history.push(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.SUSPEND)}`);
    }
  }, [history, selectedProduct, t]);

  useEffect(() => {
    if (selectedProduct.isBroadband && selectedProduct.hasFirstUsage && !productDataRetrieved) {
      try {
        setProductDataRetrieved(true);
        retrieveAvailableOffers(path(['address', 'SelectedValue'], broadbandAttributesObject), path(['unitNum', 'SelectedValue'], broadbandAttributesObject));
        clearOrderData();
      } catch {
        const offering = {
          OfferingId: selectedProduct.offeringId,
          OfferingInstanceId: selectedProduct.offeringInstanceId
        };
        setDisplayFixedError(true);
        refreshOffers(offering);
      }
    } else if (selectedProduct.isWireless && !productDataRetrieved) {
      setProductDataRetrieved(true);
      clearOrderData();
      retrieveOfferingContext(selectedProduct.offeringId, selectedProduct.offeringInstanceId);
    }
  }, [broadbandAttributesObject, clearOrderData, productDataRetrieved, refreshOffers, retrieveAvailableOffers, retrieveOfferingContext, selectedProduct.hasFirstUsage, selectedProduct.isBroadband, selectedProduct.isWireless, selectedProduct.offeringId, selectedProduct.offeringInstanceId]);

  useEffect(() => {
    if (selectedProduct && (OFFERING_OVERALL_STATUS.PENDING_PRIMARY_PAUSE === selectedProduct.status || selectedProduct.isPennyPlay)) {
      setPendingPause(true);
    }

    checkToSeeIfProductIsEditable(selectedProduct, history, t);
  }, [history, selectedProduct, t]);

  useEffect(() => {
    searchOrders();
  }, [searchOrders]);

  useEffect(() => {
    if (openChangeOfServiceOrderExists) {
      history.replace(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}`);
      history.push(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.CURRENTLY_PENDING)}`);
    }
  }, [history, openChangeOfServiceOrderExists, selectedProduct.offeringId, selectedProduct.offeringInstanceId, t]);

  useEffect(() => {
    const decisions = (filteredDecisions ? getOptionsViewData({
      ...selectedProduct.marketingTemplate,
      PrimaryDecisions: {
        Id: filteredDecisions.Id,
        Options: filteredDecisions.Options
      },
      Language: selectedLocale
    }) : []);
    const isPurchaseNew = false;
    setFormattedDecisionsForSelection(decisions.map((viewData) => {
      const { sizeDisplayData } = viewData;
      return {
        ...viewData,
        cardHeader: (
          <div>
            {sizeDisplayData.description}
            <div>
              <span className="c-product-selection-template__arrow">
                                &#8594;
              </span>
              {sizeDisplayData.name}
            </div>
          </div>
        ),
        cardFooter: (<UnorderedList variant="condensed" list={sizeDisplayData.uspListItems} />)
      };
    }, isPurchaseNew));
  }, [filteredDecisions, selectedLocale, selectedProduct, setFormattedDecisionsForSelection]);

  const handleOptOfProduct = async () => {
    //condition to check if the Page is submitted
    if(isHandlingProductAction){
      return false;
    }
    if (!selectedProduct.canOptOutOnRenew) {
      if (selectedProduct.status === OFFERING_OVERALL_STATUS.SUSPENDED) {
        // TODO: This needs refactored
        const offering = {
          OfferingId: selectedProduct.offeringId,
          OfferingInstanceId: selectedProduct.offeringInstanceId
        };
        await unpauseProductAfterRenewal(offering);
      } else {
        await unpauseProductBeforeRenewal(selectedProduct);
      }

      await refreshOffers(selectedProduct);
      navigateToProducts(history);
      setRecentlySubmittedOrder(true);
    }
  };

  const updateDecisionForOffer = async (optionId) => {
    const updatedFilteredDecision = filteredDecisions.Options.find((decision) => {
      return decision.Id === optionId;
    });

    const optionObj = filteredDecisions.Options.find((option) => {
      return option.Id === optionId;
    });
    const options = {
      action: OfferingContextIntent.ADD,
      decisionId: filteredDecisions.Id,
      optionId,
      optionName: optionObj.Name,
      offeringId: selectedProduct.offeringId,
      offeringInstanceId: selectedProduct.offeringInstanceId,
      offerName: selectedProduct.displayName
    };
    await toggleDecisionCartUpdate(options);

    const attributesOptions = {
      offeringInstanceId: selectedProduct.offeringInstanceId,
      offeringId: selectedProduct.offeringId,
      isBroadband: selectedProduct.isBroadband
    };

    if (selectedProduct.isBroadband) {
      attributesOptions.serviceId = getServiceId(feasilityOffers, optionObj, updatedFilteredDecision);
    } else {
      attributesOptions.smsAndVoiceIds = selectedProduct.smsAndVoiceIds;
    }

    await updateAttributesForPurchase(attributesOptions);
    setSelectedPlan(true);
  };

  return (
    <div className="c-manage-product c-loading-indicator-containment">
      <LoadingIndicator isLoading={isHandlingProductAction} />
      <Heading category="brand" tone="quiet">
        {t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE_PRODUCT)}
      </Heading>
      {apiFault && <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />}
      {(!selectedProduct.isBroadband || (!displayFixedError)) && !pendingPause && (
        <CardSelection
          deprecatedCards
          className="c-manage-product__card-selection"
          simple
          canDeselect={false}
          cards={formattedDecisionsForSelection}
          invertNavColors
          onChange={(id) => updateDecisionForOffer(id)}
          maxCardsShown={formattedDecisionsForSelection.length}
          minCardsShown={formattedDecisionsForSelection.length}
        />
      )}
      {recentlySubmittedOrder && <Notice type="success" heading={t(LocaleKeys.PRODUCTS.SETTINGS.SUCCESSFULLY_MODIFIED_PRODUCT)} />}
      <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE_PRODUCT_DESCRIPTION)}</Paragraph>
      {selectedProduct && selectedProduct.status !== OFFERING_OVERALL_STATUS.SUSPENDED && (
        <Paragraph className="c-manage-product__description">
          {t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE_PRODUCT_END, {
            endDate: selectedProduct.billing.nextChargeDate
          })}
        </Paragraph>
      )}
      {updatedQuotesForDecision && (
        <Paragraph className="c-manage-product__description">
          {t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE_PRODUCT_SUMMARY, {
            decisionName: updatedQuotesForDecision.Name,
            paymentMethod: updatedQuotesForDecision.PaymentMethod,
            decisionTotal: formatCurrency(updatedQuotesForDecision.Total, updatedQuotesForDecision.Currency),
            offerName: updatedQuotesForDecision.OfferName
          })}
        </Paragraph>
      )}
      <div>
        <FilledButton className="c-button-double" disabled={!selectedPlan && !pendingPause} onClick={handleOptOfProduct}>
          {t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE_PRODUCT)}
        </FilledButton>
        <OutlineButton className="c-button-double" onClick={() => navigateToProducts(history)}>
          {t(LocaleKeys.CANCEL)}
        </OutlineButton>
      </div>
    </div>
  );
};

Restore.displayName = 'Restore';
Restore.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Object with attributes for the current broadband product. */
  broadbandAttributesObject: PropTypes.object,
  /** Function used to clear order data. */
  clearOrderData: PropTypes.func.isRequired,
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
  /** Refresh Subscriber Offers */
  refreshOffers: PropTypes.func.isRequired,
  /** Function used to restore (unpause) the product after a billing cycle has happened */
  unpauseProductAfterRenewal: PropTypes.func.isRequired,
  /** Function used to restore (opt into renewal) the product before a billing cycle has happened */
  unpauseProductBeforeRenewal: PropTypes.func.isRequired,
  /** Action used to fetch codes */
  retrieveAvailableOffers: PropTypes.func.isRequired,
  /** Action used to fetch information about the product. */
  retrieveOfferingContext: PropTypes.func.isRequired,
  /** Fetches and loads all the users orders */
  searchOrders: PropTypes.func.isRequired,
  /** Currently selected locale. */
  selectedLocale: PropTypes.string,
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
    /** Bool for product being broadband */
    isBroadband: PropTypes.bool,
    /** Flag to tell us if the product is wireless */
    isWireless: PropTypes.bool,
    /** Bool for product being benify */
    isBenify: PropTypes.bool,
    /** Marketing Template object to be used to render upgrade /downgrade */
    marketingTemplate: PropTypes.shape({}),
    /** Options */
    options: PropTypes.array,
    /** Right to Return */
    rightToReturn: PropTypes.bool,
    /** Service Identifier for the product. Also called the phone number. */
    serviceIdentifier: PropTypes.string,
    /** Array of Ids for Voice and SMS plans */
    smsAndVoiceIds: PropTypes.arrayOf(PropTypes.string),
    /** Status of the product */
    status: PropTypes.number
  }),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Action used to get new shopping cart totals based on the new selection. */
  toggleDecisionCartUpdate: PropTypes.func.isRequired,
  /** Action used to save broadband attributes into the cart */
  updateAttributesForPurchase: PropTypes.func.isRequired,
  /** Quote information related to changing a decision. */
  updatedQuotesForDecision: PropTypes.shape({
    /** Name of decision */
    Name: PropTypes.string,
    /** Offer name associated to decision  */
    OfferName: PropTypes.string,
    /** Payment method on the account */
    PaymentMethod: PropTypes.string,
    /** Total after changing a decision */
    Total: PropTypes.number,
    /** Currency for decision */
    Currency: PropTypes.string
  })
};

export default compose(
  withI18n(),
  withRouter
)(Restore);
