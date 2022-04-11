import CoreLocaleKeys from '@selfcare/core/locales/keys';
import { OfferingContextIntent } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { OFFERING_OVERALL_STATUS } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React, { useEffect, useState, useMemo } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import LocaleKeys from '../../../../locales/keys';
import { getProductsNavItem } from '../../../../navigation/sitemap.selectors';
import { getOptionsViewData } from '../../../shop/decision/decision.options.helper';
import { checkToSeeIfProductIsEditable, getExecutionDateForOrder, getServiceId, navigateToProducts } from '../manage.product.helper';
import { getContextPageObject } from '../../../../helpers/inaccount.help.helpers';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import LinkButton from 'selfcare-ui/src/components/button/link.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import CardSelection from 'selfcare-ui/src/components/cardSelection/card.selection';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import UnorderedList from 'selfcare-ui/src/components/unorderedList/unordered.list';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';

const MakeChange = ({ apiFault, broadbandAttributesObject, clearOrderData, filteredDecisions, history, isHandlingProductAction,
  isLoadingOrders, isSubscriberAndAccountsLoaded, openChangeOfServiceOrderExists, recentlyNewOrOpenPortInRequest, recentlyClosedPortInRequest,
  refreshOffers, retrieveAvailableOffers, retrieveOfferingContext, searchOrders, selectedLocale,
  selectedProduct, submitOrder, unpauseProductAfterRenewal, t, toggleDecisionCartUpdate, updateAttributesForPurchase,
  updateQuotesForDecision, feasilityOffers, setContextPageData }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [displayFixedError, setDisplayFixedError] = useState(false);
  const [updatedOption, setUpdatedOption] = useState();
  const [formattedDecisionsForSelection, setFormattedDecisionsForSelection] = useState([]);
  const [validChange, setValidChange] = useState(false);
  const [productDataRetrieved, setProductDataRetrieved] = useState(false);
  const [pendingRemoval, setPendingRemoval] = useState(false);
  const [recentlySubmittedOrder, setRecentlySubmittedOrder] = useState(false);

  const secondaryAction = useMemo(() => {
    if (selectedProduct.rightToReturn && selectedProduct.status !== OFFERING_OVERALL_STATUS.ORDER_PENDING) {
      return {
        mode: t(LocaleKeys.ROUTES.MANAGE_PAGE.RETURN),
        label: t(LocaleKeys.PRODUCTS.SETTINGS.RETURN_PRODUCT)
      };
    } else if (selectedProduct.hasFirstUsage && selectedProduct.status !== OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE && selectedProduct.hasPrimaryOption) {
      return selectedProduct.canOptOutOnRenew ? {
        mode: t(LocaleKeys.ROUTES.MANAGE_PAGE.SUSPEND),
        label: t(LocaleKeys.PRODUCTS.SETTINGS.SUSPEND_PRODUCT)
      } : {
        mode: t(LocaleKeys.ROUTES.MANAGE_PAGE.RESTORE),
        label: t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE_PRODUCT)
      };
    }
  }, [t,
    selectedProduct.rightToReturn,
    selectedProduct.status,
    selectedProduct.hasFirstUsage,
    selectedProduct.hasPrimaryOption,
    selectedProduct.canOptOutOnRenew
  ]);


  useEffect(() => {
    setContextPageData(getContextPageObject(3, 'product change'));
  }, [setContextPageData]);

  useEffect(() => {
    const hasFeasibilityOptions = filteredDecisions ? filteredDecisions.Options.filter((item) => item.feasibilityOption) : undefined;
    if (selectedProduct.isBroadband && selectedProduct.hasFirstUsage && !productDataRetrieved && (hasFeasibilityOptions && !hasFeasibilityOptions.length)) {
      retrieveAvailableOffers(path(['address', 'SelectedValue'], broadbandAttributesObject), path(['unitNum', 'SelectedValue'], broadbandAttributesObject));
    }
  }, [broadbandAttributesObject, isSubscriberAndAccountsLoaded, productDataRetrieved, retrieveAvailableOffers, selectedProduct.hasFirstUsage, selectedProduct.isBroadband, filteredDecisions]);

  useEffect(() => {
    if (isSubscriberAndAccountsLoaded) {
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
    }
  }, [broadbandAttributesObject, clearOrderData, isSubscriberAndAccountsLoaded, productDataRetrieved, refreshOffers, retrieveAvailableOffers, retrieveOfferingContext, selectedProduct.hasFirstUsage, selectedProduct.isBroadband, selectedProduct.isWireless, selectedProduct.offeringId, selectedProduct.offeringInstanceId]);

  useEffect(() => {
    searchOrders();
  }, [searchOrders]);

  useEffect(() => {
    setPendingRemoval(selectedProduct.status === OFFERING_OVERALL_STATUS.SUSPENDED);
  }, [selectedProduct.status]);

  useEffect(() => {
    const hasOpenPortInRequest = recentlyNewOrOpenPortInRequest && !recentlyClosedPortInRequest;

    if (openChangeOfServiceOrderExists || hasOpenPortInRequest) {
      history.replace(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}`);
      history.push(`${getProductsNavItem().url}/${selectedProduct.offeringId}-${selectedProduct.offeringInstanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.CURRENTLY_PENDING)}`);
    }
  }, [history, openChangeOfServiceOrderExists, recentlyClosedPortInRequest, recentlyNewOrOpenPortInRequest, selectedProduct.offeringId, selectedProduct.offeringInstanceId, t]);

  const originalOption = useMemo(() => {
    if (selectedProduct.hasPrimaryOption && filteredDecisions) {
      let originalOptionId = selectedProduct.hasPrimaryOption;
      const originalFilteredDecision = filteredDecisions.Options.find((decision) => {
        return decision.Id === originalOptionId;
      });
      if (!originalFilteredDecision.Weight) {
        const productIdToMatch = originalFilteredDecision.PricingPlanBillerRuleInstances.ProductId;
        const originalDecision = filteredDecisions.Options.find((decision) => {
          const isProductMatched = (decision.PricingPlanBillerRuleInstances && originalFilteredDecision.PricingPlanBillerRuleInstances)
                              && decision.PricingPlanBillerRuleInstances.ProductId === productIdToMatch;
          return decision.Id !== originalFilteredDecision.Id && isProductMatched && originalFilteredDecision.Amount === decision.Amount;
        });
        if (originalDecision) {
          originalOptionId = originalDecision.Id;
        }
      }
      return originalOptionId;
    }
  }, [selectedProduct]);

  useEffect(() => {
    setValidChange(updatedOption != null && updatedOption !== originalOption);
  }, [originalOption, setValidChange, updatedOption]);

  useEffect(() => {
    if (selectedProduct.hasPrimaryOption && selectedProduct.status !== OFFERING_OVERALL_STATUS.PENDING_REMOVAL) {
      checkToSeeIfProductIsEditable(selectedProduct, history, t);
    }
  }, [history, selectedProduct, t]);

  useEffect(() => {
    const decisions = (filteredDecisions ? getOptionsViewData({
      ...selectedProduct.marketingTemplate,
      PrimaryDecisions: {
        Id: filteredDecisions.Id,
        Options: filteredDecisions.Options.filter((option) => option.Weight)
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

  const updateDecisionForOffer = async (optionId) => {
    if (optionId === originalOption) {
      setUpdatedOption(originalOption);
    } else {
      const updatedFilteredDecision = filteredDecisions.Options.find((decision) => {
        return decision.Id === optionId;
      });

      const options = {
        action: OfferingContextIntent.ADD,
        decisionId: filteredDecisions.Id,
        optionId,
        optionName: updatedFilteredDecision.Name,
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
        attributesOptions.serviceId = getServiceId(feasilityOffers, updatedFilteredDecision);
      }

      await updateAttributesForPurchase(attributesOptions);
      setUpdatedOption(optionId);
    }
  };

  const getIsUpgradeChange = () => {
    const originalFilteredDecision = filteredDecisions.Options.find((decision) => {
      return decision.Id === originalOption;
    });

    const updatedFilteredDecision = filteredDecisions.Options.find((decision) => {
      return decision.Id === updatedOption;
    });

    return !originalFilteredDecision || (updatedFilteredDecision.Weight > originalFilteredDecision.Weight);
  };

  const submitOrderData = async () => {
    if (validChange) {
      const offering = {
        OfferingId: selectedProduct.offeringId,
        OfferingInstanceId: selectedProduct.offeringInstanceId
      };
      if (pendingRemoval) {
        await unpauseProductAfterRenewal(offering);
      } else {
        await submitOrder(offering, {
          executionDate: getExecutionDateForOrder(selectedProduct, getIsUpgradeChange())
        });
      }
      setShowConfirmation(true);
      await refreshOffers(offering);
      setRecentlySubmittedOrder(true);
    }
  };

  return (
    <div className="c-manage-product c-loading-indicator-containment">
      <LoadingIndicator isLoading={isHandlingProductAction || isLoadingOrders} />
      <Heading category="brand" tone="normal">
        {selectedProduct.hasPrimaryOption || selectedProduct.status === OFFERING_OVERALL_STATUS.ORDER_PENDING || selectedProduct.status === OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE ? t(LocaleKeys.PRODUCTS.SETTINGS.CHANGE_PRODUCT) : t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE_PRODUCT)}
      </Heading>
      {!showConfirmation && (
        <React.Fragment>
          {!selectedProduct.hasFirstUsage && !pendingRemoval && (
            <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.PENDING_ACTIVATION)}</Paragraph>
          )}
          {(selectedProduct.hasFirstUsage || pendingRemoval) && (
            <div>
              {recentlySubmittedOrder && !validChange && <Notice type="success" heading={t(LocaleKeys.PRODUCTS.SETTINGS.SUCCESSFULLY_MODIFIED_PRODUCT)} />}
              <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.CHANGE_PRODUCT_DESCRIPTION)}</Paragraph>
              <Heading className="c-manage-product__sub-heading" category="major" tone="normal">{selectedProduct.displayName}</Heading>
              {(!selectedProduct.isBroadband || (!displayFixedError)) && (
                <CardSelection
                  deprecatedCards
                  className="c-manage-product__card-selection"
                  simple
                  canDeselect={false}
                  cards={formattedDecisionsForSelection}
                  invertNavColors
                  onChange={(id) => updateDecisionForOffer(id)}
                  defaultSelectedId={originalOption}
                  maxCardsShown={formattedDecisionsForSelection.length}
                  minCardsShown={formattedDecisionsForSelection.length}
                />
              )}
              {/* Display notice if the API returns zero addresses and doesn't throw a fault */}
              {displayFixedError && (
                <Notice type="error" heading={t(`${CoreLocaleKeys.FAULT_PREFIX}1121`)} />
              )}
              {apiFault && <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />}
              {updateQuotesForDecision && updatedOption && (
                <React.Fragment>
                  <Paragraph className="c-manage-product__description">
                    {selectedProduct.isBroadband ?
                      t(LocaleKeys.PRODUCTS.SETTINGS.DECISION_CHANGE_BROADBAND, {
                        decisionName: updateQuotesForDecision.Name,
                        paymentMethod: updateQuotesForDecision.PaymentMethod,
                        decisionTotal: formatCurrency(updateQuotesForDecision.Total, updateQuotesForDecision.Currency),
                        offerName: updateQuotesForDecision.OfferName
                      }) : t(LocaleKeys.PRODUCTS.SETTINGS.DECISION_CHANGE_DESCRIPTION, {
                        decisionName: updateQuotesForDecision.Name,
                        paymentMethod: updateQuotesForDecision.PaymentMethod,
                        decisionTotal: formatCurrency(updateQuotesForDecision.Total, updateQuotesForDecision.Currency),
                        offerName: updateQuotesForDecision.OfferName
                      })
                    }
                  </Paragraph>
                  <Paragraph className="c-manage-product__description">
                    {t(LocaleKeys.PRODUCTS.SETTINGS.DECISION_CHANGE_DESCRIPTION_ARE_YOU_SURE, {
                      decisionName: updateQuotesForDecision.Name,
                      offerName: updateQuotesForDecision.OfferName
                    })}
                  </Paragraph>
                </React.Fragment>
              )}
            </div>
          )}
          <div className="c-manage-product__actions">
            {(selectedProduct.hasFirstUsage || pendingRemoval) && (
              <div className="c-manage-product__button-actions">
                <OutlineButton className="c-manage-product__primary-action c-button-double" onClick={() => navigateToProducts(history)}>{t(LocaleKeys.CANCEL)}</OutlineButton>
                <FilledButton
                  className="c-manage-product__primary-action c-button-double"
                  disabled={!validChange}
                  onClick={submitOrderData}
                >
                  {selectedProduct.hasPrimaryOption ? t(LocaleKeys.PRODUCTS.SETTINGS.CONFIRM_CHANGE) : t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE)}
                </FilledButton>
              </div>
            )}
            {(secondaryAction && secondaryAction !== {}) && (
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
        </React.Fragment>
      )}
      {showConfirmation && (
        <React.Fragment>
          <Paragraph className="c-manage-product__description">{t(LocaleKeys.PRODUCTS.SETTINGS.CHANGE_OF_SERVICE_IN_PROGRESS)}</Paragraph>
          <FilledButton className="c-manage-product__primary-action" onClick={() => navigateToProducts(history)}>{t(LocaleKeys.BACK)}</FilledButton>
        </React.Fragment>
      )}
    </div>
  );
};

MakeChange.displayName = 'MakeChange';
MakeChange.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Object with attributes for the current broadband product. */
  broadbandAttributesObject: PropTypes.object,
  /** Function used to clear order data. */
  clearOrderData: PropTypes.func.isRequired,
  /** Feasibility options for broadband */
  feasilityOffers: PropTypes.array,
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
  /** Flag for when orders are being loaded. */
  isLoadingOrders: PropTypes.bool.isRequired,
  /** Flag for when subscriber and accounts are fully loaded. */
  isSubscriberAndAccountsLoaded: PropTypes.bool,
  /** Flag used to display a confirmation message when the user cannot perform any change of service */
  openChangeOfServiceOrderExists: PropTypes.bool,
  /** Refresh Subscriber Offers */
  refreshOffers: PropTypes.func.isRequired,
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
  /** Recent Port in Request */
  recentlyNewOrOpenPortInRequest: PropTypes.shape({}),
  /** Recent Closed Port In Request */
  recentlyClosedPortInRequest: PropTypes.shape({
    /** Response message for closed port in request */
    responseMessage: PropTypes.string,
    /** successful flag for closed port in request */
    successfull: PropTypes.bool
  }),
  /** Submit upgrade / downgrade order to be processed. */
  submitOrder: PropTypes.func.isRequired,
  /** Submit restore order to be processed. Unpause after renewal. */
  unpauseProductAfterRenewal: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Action used to get new shopping cart totals based on the new selection. */
  toggleDecisionCartUpdate: PropTypes.func.isRequired,
  /** Action used to save attributes into the cart */
  updateAttributesForPurchase: PropTypes.func.isRequired,
  /** Quote information related to changing a decision. */
  updateQuotesForDecision: PropTypes.shape({
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
  }),
  /** Action to change ui context page data */
  setContextPageData: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(MakeChange);
