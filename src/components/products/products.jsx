import { displayDate, withinXDays, today } from '@selfcare/core/helpers/date.helper';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import { OFFERING_OVERALL_STATUS, IMMEDIATE_ACTIVATION_DATE } from '@selfcare/core/redux/subscriberOfferings/subscriber.offering.constants';
import { SUPPORT_REQUEST_STATUS } from '@selfcare/core/redux/supportRequest/support.request.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { withI18n } from 'react-i18next';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import ActivateProductModal from './activateProductModal/activate.product.modal.contextual';
import ManageProductRoute from './manageProduct/manage.product.route';
import { getLocaleToUseForStatusIndicator } from './product.helper';
import ProductInfoBox from './productInfoBox/product.info.box.contextual';
import ProductPayment from './productPayment/product.payment.contextual';
import ProductSettings from './productSettings/product.settings.contextual';
import ProductTopUp from './productTopUp/product.top.up.contextual';
import ProductUsage from './productUsage/product.usage.contextual';
import PurchaseRoaming from './purchaseRoaming/purchase.roaming.contextual';
import LocaleKeys from '../../locales/keys';
import { getProductCategory, getContextPageObject } from '../../helpers/inaccount.help.helpers';
import { getNotFoundNavItem, getProductsNavItem, getShopNavItem } from '../../navigation/sitemap.selectors';
import Allowances from '../allowances/allowance.contextual';
import PageContent, { Aside, Main } from '../pageContent/page.content';
import MetaData from '../pageMetaData/meta.data.handler.contextual';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import ExpandableSection from 'selfcare-ui/src/components/expandableSection/expandable.section';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import SidebarMenu from 'selfcare-ui/src/components/sidebarMenu/sidebar.menu';
import SidebarMenuItem from 'selfcare-ui/src/components/sidebarMenu/sidebar.menu.item';
import StatusIndicator from 'selfcare-ui/src/components/statusIndicator/status.indicator';
import { STATUS_TYPES } from 'selfcare-ui/src/components/statusIndicator/status.indicator.constants';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import IconArrowThinRight from 'selfcare-ui/src/icons/react-icons/arrow-thin-right';
import { formatCurrency } from 'selfcare-ui/src/utilities/localization/currency';
import * as Papa from 'papaparse';
import { RULES, COUNTRY_ALPHA_3_INDEX, COUNTRY_GROUP_INDEX } from  '../roamingDetails/roaming.constants';
import * as LocalStorageHelper from 'selfcare-core/src/helpers/storage/local.storage';
import { SUBSCRIBER_CURRENT_COUNTRY } from 'selfcare-core/src/redux/utils/api.constants';

import './products.scss';

const getCountryGroup = (countryCode) => {
  const list = Papa.parse(RULES).data.slice(1);
  const countryFound = list.find((item) => item[COUNTRY_ALPHA_3_INDEX] === countryCode);

  if (countryFound) {
    return countryFound[COUNTRY_GROUP_INDEX];
  }

  return null;
};

const Products = (props) => {
  const [closeUsageDetails, setCloseUsageDetails] = useState(false);
  const [closeBilling, setCloseBilling] = useState(false);
  const [closeBuyMore, setCloseBuyMore] = useState(false);
  const [closeAllowances, setCloseAllowances] = useState(false);
  const [closeSettings, setCloseSettings] = useState(false);
  const [countryCode, setCountry] = useState('');

  const {
    setContextPageData,
    selectedProduct: { futureActivationDate },
    t
  } = props;

  const closeOthersForUsageDetails = () => {
    setContextPageData(getContextPageObject(3, 'usageDetails'));
    setCloseUsageDetails(false);
    setCloseBilling(true);
    setCloseBuyMore(true);
    setCloseAllowances(true);
    setCloseSettings(true);
  };

  const closeOthersForBilling = () => {
    setContextPageData(getContextPageObject(3, 'payments'));
    setCloseUsageDetails(true);
    setCloseBilling(false);
    setCloseBuyMore(true);
    setCloseAllowances(true);
    setCloseSettings(true);
  };

  const closeOthersForBuyMore = () => {
    setContextPageData(getContextPageObject(3, 'manageSubscription'));
    setCloseUsageDetails(true);
    setCloseBilling(true);
    setCloseBuyMore(false);
    setCloseAllowances(true);
    setCloseSettings(true);
  };

  const closeOthersForAllowances = () => {
    setContextPageData(getContextPageObject(3, 'allowance'));
    setCloseUsageDetails(true);
    setCloseBilling(true);
    setCloseBuyMore(true);
    setCloseAllowances(false);
    setCloseSettings(true);
  };

  const closeOthersForSettings = () => {
    setContextPageData(getContextPageObject(3, 'settings'));
    setCloseUsageDetails(true);
    setCloseBilling(true);
    setCloseBuyMore(true);
    setCloseAllowances(true);
    setCloseSettings(false);
  };

  const [activatedCaseIds, setActivatedCaseIds] = useState([]);
  const [submitOrderSuccessMessage, setSubmitOrderSuccessMessage] = useState(null);
  const [submitOrderTriggeredForProduct, setSubmitOrderTriggeredForProduct] = useState(false);
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const [productIndicator, setProductIndicator] = useState(0);
  const [grabbedCaseDetails, setGrabbedCaseDetails] = useState(false);

  const { match } = props;
  const { currentProductId, currentInstanceId, isRouteInvalid } = useMemo(() => {
    const EXPECT_TWO_VALUES = 2;
    const ID_VALUE = 0;
    const INSTANCE_ID_VALUE = 1;

    const productIdFromRoute = match.params.productId;
    const productIdCombo = productIdFromRoute ? productIdFromRoute.split('-') : null;
    if (productIdCombo && productIdCombo.length === EXPECT_TWO_VALUES) {
      const id = productIdCombo[ID_VALUE];
      const instanceId = productIdCombo[INSTANCE_ID_VALUE];
      if (instanceId) {
        return {
          currentProductId: id,
          currentInstanceId: instanceId,
          isRouteInvalid: false
        };
      }
    }
    return {
      currentProductId: null,
      currentInstanceId: null,
      irRouteInvalid: true
    };
  }, [match]);

  const countryGroup = useMemo(() => getCountryGroup(countryCode), [countryCode]);

  useEffect(() => {
    setCountry(LocalStorageHelper.read(SUBSCRIBER_CURRENT_COUNTRY));
  }, []);

  const { retrieveConvergentBillerSummary } = props;
  useEffect(() => {
    retrieveConvergentBillerSummary();
  }, [retrieveConvergentBillerSummary]);

  const { retrieveCodes } = props;
  useEffect(() => {
    retrieveCodes(CODES.UnitOfMeasure);
    retrieveCodes(CODES.ProductClassification);
    retrieveCodes(CODES.MarketingTemplateType);
    retrieveCodes(CODES.MarketingTemplateTypeAttribute);
  }, [retrieveCodes]);

  const { areSubscriberOfferingsLoaded, fetchCatalog } = props;
  useEffect(() => {
    if (areSubscriberOfferingsLoaded) {
      fetchCatalog();
    }
  }, [areSubscriberOfferingsLoaded, fetchCatalog]);

  const { fetchMobileServiceFeatures, serviceFeaturesReadyToLoad } = props;
  useEffect(() => {
    if (serviceFeaturesReadyToLoad) {
      fetchMobileServiceFeatures();
    }
  }, [fetchMobileServiceFeatures, serviceFeaturesReadyToLoad]);

  const { hasPaymentFailure, paymentFailure, retrieveSupportRequest } = props;
  useEffect(() => {
    if (hasPaymentFailure && !grabbedCaseDetails) {
      retrieveSupportRequest(paymentFailure.caseId);
      setGrabbedCaseDetails(true);
    }
  }, [hasPaymentFailure, grabbedCaseDetails, paymentFailure, retrieveSupportRequest]);


  const { selectedProductId, updateSelectedProduct, setCurrentOfferAndRetrieveAttributes } = props;
  useEffect(() => {
    if (currentInstanceId && currentInstanceId !== selectedProductId) {
      updateSelectedProduct(currentInstanceId);
      setCurrentOfferAndRetrieveAttributes(currentProductId, currentInstanceId);
      setGrabbedCaseDetails(false);
    }
  }, [currentInstanceId, currentProductId,
    selectedProductId, setCurrentOfferAndRetrieveAttributes,
    updateSelectedProduct]);

  const { isSubmittingOrder } = props;
  useEffect(() => {
    if (isSubmittingOrder) {
      setSubmitOrderSuccessMessage(null);
      setSubmitOrderTriggeredForProduct(true);
    }
  }, [isSubmittingOrder]);

  const { selectedProduct, productList, page2 } = props;
  useEffect(() => {
    setSubmitOrderSuccessMessage(null);
    setSubmitOrderTriggeredForProduct(false);

    if (productList.length > 0) {
      const product = productList.find((item) => {
        return item.id === selectedProductId;
      });

      if (product) {
        const category = getProductCategory(product);
        if (category !== page2) {
          setContextPageData(getContextPageObject(2, category));
        }
      }
    }
  }, [selectedProduct, productList, selectedProductId, page2, setContextPageData]);

  useEffect(() => {
    if (selectedProduct.rightToReturn) {
      retrieveCodes(CODES.RemoveReasons);
    }
  }, [selectedProduct, retrieveCodes]);

  const handleUpdateSelectedProduct = (target) => {
    const instanceId = pathOr(null, ['offeringInstanceId'], target);
    const id = pathOr(null, ['offeringId'], target);
    if (id && instanceId) {
      props.history.push(`${getProductsNavItem().url}/${id}-${instanceId}`);
    }
  };

  const onProductSelect = useCallback((products) => {
    if (products.length > 0) {
      const index = products.findIndex((x) => x.id === selectedProductId);
      const newIndicator = index + 1 === products.length ? 0 : index + 1;
      setProductIndicator(newIndicator);
      const target = products[newIndicator];
      const instanceId = pathOr(null, ['offeringInstanceId'], target);
      const id = pathOr(null, ['offeringId'], target);
      if (id && instanceId) {
        props.history.push(`${getProductsNavItem().url}/${id}-${instanceId}`);
      }
    }
  }, [props.history, selectedProductId]);

  const renderProductIndicator = (products) => {
    const index = products.findIndex((x) => x.id === selectedProductId);
    return (
      <div
        className="product-selector__bar--active"
        style={
          {
            width: `${100 / products.length}%`,
            left: `${(100 / products.length) * index}%`
          }
        }
      />
    );
  };

  const activationRequestId = props.activationRequestIdForSelectedProduct || props.activationRequestIdForOpenSelectedProduct;
  const onActivate = () => {
    // Activate the product then add to list of ids we activated so we dont' show them
    setActivatedCaseIds(activatedCaseIds.concat([activationRequestId]));
    setActivationModalOpen(false);
  };

  const sidebarSubtext = (product) => {
    if (product.isBroadband) {
      return product.planName;
    }
    if (product.isWireless) {
      return product.displayServiceIdentifier;
    }
    if (product.isPennyPlay) {
      return t(LocaleKeys.PLANS_AND_SERVICES.PLAN.PENNY_PLAY.CATEGORY);
    }
  };

  // Make sure default is loaded (load if not set)
  if (props.productList.length > 0 && !selectedProduct.offeringInstanceId && !props.match.params.productId) {
    handleUpdateSelectedProduct(props.productList[0]);
  }

  const offerIsActive = OFFERING_OVERALL_STATUS.ACTIVE === selectedProduct.status;
  const displayNormalBillingHeading = selectedProduct.isPennyPlay || (selectedProduct.hasFirstUsage && (selectedProduct.canOptOutOnRenew || selectedProduct.status === OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE));
  const offerIsPendingPause = OFFERING_OVERALL_STATUS.PENDING_PRIMARY_PAUSE === selectedProduct.status;
  const ordinaryCampaignHeading = t(LocaleKeys.PRODUCTS.CAMPAIGN.ORDINARY_PRICE, {
    ordinaryPrice: formatCurrency(selectedProduct.campaign.amount, selectedProduct.currencyCode, props.selectedLocale)
  });

  const isCampaignOnGoing = pathOr(IMMEDIATE_ACTIVATION_DATE, ['campaign', 'discountExpirationDate'], selectedProduct) > today();

  const campaignPriceDateHeading = () => {
    const locale = selectedProduct.isStudent ? LocaleKeys.PRODUCTS.CAMPAIGN.STUDENT_DISCOUNT_PRICE_UNTIL : LocaleKeys.PRODUCTS.CAMPAIGN.DISCOUNT_PRICE_UNTIL;
    const offerName = selectedProduct.isBroadband ? 'Bredband' : 'Mobil';

    return t(locale, {
      offerName: offerName,
      campaignPrice: formatCurrency(selectedProduct.campaign.totalAmount, selectedProduct.currencyCode, props.selectedLocale),
      discountExpirationDate: displayDate(selectedProduct.campaign.discountExpirationDate, t)
    });
  };

  let billingHeading = t(LocaleKeys.PRODUCTS.BILLING.HEADING_NO_PAYMENTS);

  if (!selectedProduct.hasFirstUsage && selectedProduct.status !== OFFERING_OVERALL_STATUS.PENDING_REMOVAL) {
    const { selectedProduct: { futureActivationDate } } = props;

    if (futureActivationDate && futureActivationDate !== IMMEDIATE_ACTIVATION_DATE) {
      billingHeading = t(LocaleKeys.PRODUCTS.BILLING.ACTIVATING_ON, {
        date: displayDate(futureActivationDate, t)
      });
    } else {
      billingHeading = t(LocaleKeys.PRODUCTS.BILLING.AWAITING_ACTIVATION);
    }
  }
  if (displayNormalBillingHeading) {
    let amount;
    if (selectedProduct.status === OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE) {
      if (selectedProduct.isBroadband) {
        amount = t(LocaleKeys.OFFER_DECISION_ACTION.CHANGE_OF_SERVICE);
      } else {
        amount = t(LocaleKeys.OFFER_DECISION_ACTION.DOWNGRADE);
      }
      billingHeading = t(LocaleKeys.PRODUCTS.BILLING.HEADING, {
        amount,
        dueDate: selectedProduct.billing.nextChargeDate
      });
    } else {
      amount = formatCurrency(selectedProduct.billing.totalAmount, selectedProduct.currencyCode, props.selectedLocale);
      billingHeading = t(LocaleKeys.PRODUCTS.BILLING.HEADING_ACTIVE, {
        amount,
        dueDate: selectedProduct.billing.nextChargeDate
      });
    }
  } else if (props.hasPaymentFailure) {
    billingHeading = t(LocaleKeys.PRODUCTS.PAYMENT.FAILED_PAYMENT);
  }

  const emptyPage = (
    <PageContent className="c-products-overview">
      <Main key="empty">
        <ZeroState
          title={t(LocaleKeys.PRODUCTS.ZERO_STATE.TITLE)}
          description={t(LocaleKeys.PRODUCTS.ZERO_STATE.DESCRIPTION)}
          callToAction={(
            <FilledButton className="c-cart__action" onClick={() => props.history.push(getShopNavItem().url)}>
              {t(LocaleKeys.SHOP_NOW)}
            </FilledButton>
          )}
        />
      </Main>
    </PageContent>
  );

  const isActivationStarted = () => {
    const activationRequest = props.activationRequestForSelectedProduct(SUPPORT_REQUEST_STATUS.OPEN);

    return Boolean(pathOr([], ['customCaseDetails'], activationRequest).filter((detail) => {
      return detail.Name === 'ResponseMSG' && detail.Value === 'PROVISIONINGHASSTARTED';
    }).length > 0);
  };

  const displayPaymentFailure = (props.paymentFailure || selectedProduct.canOptOutOnRenew || selectedProduct.isPennyPlay || selectedProduct.status === OFFERING_OVERALL_STATUS.PENDING_REMOVAL);
  const displayFDA = (!selectedProduct.hasFirstUsage || selectedProduct.status === OFFERING_OVERALL_STATUS.ORDER_PENDING || selectedProduct.status === OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE) &&
        (selectedProduct.status !== OFFERING_OVERALL_STATUS.PENDING_REMOVAL);
  const isMobile = (selectedProduct.isWireless || selectedProduct.isBenify);
  const hasPendingActivationStatus = offerIsActive && !selectedProduct?.hasFirstUsage && selectedProduct?.billing?.nextChargeDate && !props.activationRequestedForSelectedProduct;
  const hasntPendingActivationImmediate = (!isActivationStarted() && !activatedCaseIds.includes(activationRequestId)) && futureActivationDate !== IMMEDIATE_ACTIVATION_DATE;

  const productsPage = (
    <PageContent variant="aside-right" className="c-products-overview">
      <MetaData title={t(LocaleKeys.META_DATA.PRODUCTS.TITLE)} description={t(LocaleKeys.META_DATA.PRODUCTS.DESCRIPTION)} />
      <Aside className="c-products-overview__aside">
        <SidebarMenu
          defaultSelected={selectedProductId}
          items={props.productList.map((product) => ({
            product,
            id: product.offeringInstanceId,
            content: (
              <SidebarMenuItem
                heading={product.isPennyPlay ? t(LocaleKeys.PLANS_AND_SERVICES.PLAN.PENNY_PLAY.TITLE) : product.displayName}
                subtext={<Heading category="major" tone="quiet">{sidebarSubtext(product)}</Heading>}
              />
            )
          }))}
          onChange={(obj) => handleUpdateSelectedProduct(obj.product)}
        />
      </Aside>
      <Main key={selectedProductId}>
        {selectedProduct && selectedProduct.offeringInstanceId && (
          <div className="c-products-overview">
            <LoadingIndicator isLoading={props.isHandlingProductAction} />
            <Heading category="brand">
              {selectedProduct.isPennyPlay ? t(LocaleKeys.PLANS_AND_SERVICES.PLAN.PENNY_PLAY.TITLE) : selectedProduct.displayName}
            </Heading>
            {props.productList.length > 1 && (
              <div className="product-selector">
                <div className="product-selector__bar">
                  {renderProductIndicator(props.productList)}
                </div>
                <div className="product-selector__next">
                  <IconArrowThinRight onClick={() => onProductSelect(props.productList)} />
                </div>
              </div>
            )}

            <div className="c-products-overview__service-information">
              <Heading category="major" tone="quiet" className="c-products-overview__service-identifier">{selectedProduct.isBroadband ? selectedProduct.planName : selectedProduct.displayServiceIdentifier}</Heading>
              {selectedProduct.isBroadband && selectedProduct.primaryOptionDisplayInfo.downloadSpeed && (
                <Heading category="minor" tone="normal" className="c-products-overview__service-identifier">
                  {`${selectedProduct.primaryOptionDisplayInfo.downloadSpeed} / ${selectedProduct.primaryOptionDisplayInfo.uploadSpeed}`}
                </Heading>
              )}
              {!offerIsActive && selectedProduct.status && (
                <>
                  {selectedProduct.status === OFFERING_OVERALL_STATUS.ORDER_PENDING ? (
                    <>
                      {futureActivationDate ? (
                        <Heading category="minor" tone="normal" className="c-products-overview__renews">
                          {t(LocaleKeys.PRODUCTS.FUTURE_ACTIVATION, {
                            activationDate: displayDate(futureActivationDate, t)
                          })}
                        </Heading>
                      ) : (
                        <Heading category="minor" tone="normal" className="c-products-overview__renews">
                          {t(LocaleKeys.PRODUCTS.STATUS.PENDING_ACTIVATION)}
                        </Heading>
                      )}
                    </>
                  ) : (
                    <StatusIndicator
                      appearance="emphasis"
                      type={STATUS_TYPES.OFFERING}
                      value={selectedProduct.status}
                      customLabel={getLocaleToUseForStatusIndicator(selectedProduct)}
                    />
                  )}
                </>
              )}
              {offerIsActive && !selectedProduct.hasFirstUsage && props.activationRequestedForSelectedProduct && (
                <StatusIndicator
                  appearance="emphasis"
                  type={STATUS_TYPES.OFFERING}
                  value={selectedProduct.status}
                  customLabel={t(LocaleKeys.PRODUCTS.STATUS.PENDING_ACTIVATION)}
                />
              )}
              {hasPendingActivationStatus && (
                <StatusIndicator
                  appearance="emphasis"
                  type={STATUS_TYPES.OFFERING}
                  value={selectedProduct.status}
                  customLabel={t(LocaleKeys.PRODUCTS.STATUS.PENDING_FIRST_USAGE)}
                />
              )}
              {((offerIsActive && selectedProduct.hasFirstUsage)) && selectedProduct.billing.nextChargeDate && (
                <Heading category="minor" tone="normal" className="c-products-overview__renews">
                  {t(LocaleKeys.PRODUCTS.BILLING.RENEWS, {
                    dueDate: selectedProduct.billing.nextChargeDate
                  })}
                </Heading>
              )}
            </div>
            {selectedProduct.status !== OFFERING_OVERALL_STATUS.ORDER_PENDING && selectedProduct.hasFirstUsage && isCampaignOnGoing && selectedProduct.campaign.discountHasNotCycledOff && (
              <div>
                <Heading category="minor" tone="normal" className="c-products-overview__campaign">
                  {ordinaryCampaignHeading}
                </Heading>
                <Heading category="minor" tone="normal" className="c-products-overview__campaign">
                  {campaignPriceDateHeading()}
                </Heading>
              </div>
            )}
            {selectedProduct.isBroadband &&
            !isActivationStarted(props) &&
            activationRequestId &&
            !activatedCaseIds.includes(activationRequestId) &&
            selectedProduct.status !== OFFERING_OVERALL_STATUS.ORDER_PENDING && (
              <>
                <FilledButton
                  onClick={() => setActivationModalOpen(true)}
                  className="c-products-overview__activate-button"
                >
                  {t(LocaleKeys.PRODUCTS.BILLING.ACTIVATE)}
                </FilledButton>
                {activationModalOpen && (
                  <ActivateProductModal
                    activationRequestId={activationRequestId}
                    onClose={() => setActivationModalOpen(false)}
                    onActivate={onActivate}
                  />
                )}
              </>
            )}
            {(((offerIsActive || offerIsPendingPause) && isMobile) && !props.inSweden)  && (
              <PurchaseRoaming
                selectedProduct={selectedProduct}
                showConfirmationExternally={setSubmitOrderSuccessMessage}
                countryGroup={countryGroup}
              />
            )}
            {isMobile && <ProductInfoBox />}
            {props.isSubmitOrderLoaded && submitOrderTriggeredForProduct && !props.apiFault && (
              <Notice
                className="c-products-overview__notice"
                type="success"
                heading={submitOrderSuccessMessage || t(LocaleKeys.PRODUCTS.SETTINGS.SUCCESSFULLY_MODIFIED_PRODUCT)}
              />
            )}
            <div className="c-products-overview__section">
              {isMobile && selectedProduct.serviceIdentifier && (
                <ExpandableSection
                  key={t(LocaleKeys.PRODUCTS.USAGE_DETAILS.HEADING)}
                  postToggle={closeOthersForUsageDetails}
                  isClose={closeUsageDetails}
                  className="c-products-overview__sub-section"
                  heading={<Heading category="minor" tone="normal">{t(LocaleKeys.PRODUCTS.USAGE_DETAILS.HEADING)}</Heading>}
                  body={(
                    <ProductUsage currentLocale={props.selectedLocale} selectedProduct={selectedProduct} />
                  )}
                  highlightButton
                />
              )}
              {(isMobile || selectedProduct.isBroadband || selectedProduct.isPennyPlay) && (
                <ExpandableSection
                  key={billingHeading}
                  postToggle={closeOthersForBilling}
                  isClose={closeBilling}
                  className="c-products-overview__sub-section"
                  heading={<Heading category="minor" tone="normal">{billingHeading}</Heading>}
                  body={(
                    <React.Fragment>
                      {(displayPaymentFailure) ? (
                        <ProductPayment product={selectedProduct} />
                      ) : displayFDA && (
                        <>
                          {!futureActivationDate && (
                            <>
                              <Paragraph>
                                {t(LocaleKeys.PRODUCTS.BILLING.PENDING_ACTIVATION)}
                              </Paragraph>
                            </>
                          )}
                          {futureActivationDate && withinXDays(futureActivationDate, 1) && (
                            <>
                              <Paragraph>
                                {t(LocaleKeys.PRODUCTS.BILLING.ACTIVATION_WITHIN_ONE_DAY, {
                                  date: displayDate(futureActivationDate, t)
                                })}
                              </Paragraph>
                            </>
                          )}
                          {futureActivationDate && !withinXDays(futureActivationDate, 1) && (
                            <>
                              {hasntPendingActivationImmediate && (
                                <Paragraph>
                                  {t(LocaleKeys.PRODUCTS.BILLING.ACTIVATION_TEXT, {
                                    date: displayDate(futureActivationDate, t)
                                  })}
                                </Paragraph>
                              )}
                              {!hasntPendingActivationImmediate && (
                                <Paragraph>
                                  {t(LocaleKeys.PRODUCTS.BILLING.ACTIVATION_IMMEDIATE_TEXT)}
                                </Paragraph>
                              )}
                              {props.activationRequestIdForOpenSelectedProduct &&
                        (hasntPendingActivationImmediate) && (
                                <Paragraph>
                                  <FilledButton
                                    className="c-products-overview__activate-button"
                                    onClick={() => {
                                      const instanceId = path(['offeringInstanceId'], selectedProduct);
                                      const id = path(['offeringId'], selectedProduct);
                                      const route = `${getProductsNavItem().url}/${id}-${instanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.ACTIVATION_DATE)}`;
                                      props.history.push(route);
                                    }}
                                  >
                                    {t(LocaleKeys.PRODUCTS.BILLING.MANAGE_ACTIVATION_DATE)}
                                  </FilledButton>
                                </Paragraph>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {(selectedProduct.status === OFFERING_OVERALL_STATUS.PENDING_REMOVAL) && (
                        <Paragraph>{t(LocaleKeys.PRODUCTS.BILLING.PENDING_REMOVAL)} 4</Paragraph>
                      )}
                      {!props.hasPaymentFailure && selectedProduct.hasFirstUsage && !selectedProduct.canOptOutOnRenew && (
                        selectedProduct.status !== OFFERING_OVERALL_STATUS.ORDER_PENDING &&
                          selectedProduct.status !== OFFERING_OVERALL_STATUS.PENDING_PRIMARY_DOWNGRADE &&
                          !selectedProduct.isPennyPlay) && (
                        <>
                          {selectedProduct.status !== OFFERING_OVERALL_STATUS.SUSPENDED && (
                            <Paragraph>
                              {t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE_PRODUCT_NOTICE, {
                                endDate: selectedProduct.billing.nextChargeDate
                              })}
                            </Paragraph>
                          )}
                          <FilledButton
                            className="c-products-overview__restore-button"
                            onClick={async () => {
                              if (selectedProduct.hasPrimaryOption) {
                                await props.restoreProduct(selectedProduct);
                                await props.refreshOffers(selectedProduct);
                              } else {
                                const instanceId = path(['offeringInstanceId'], selectedProduct);
                                const id = path(['offeringId'], selectedProduct);
                                props.history.push(`${getProductsNavItem().url}/${id}-${instanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.RESTORE)}`);
                              }
                            }}
                          >
                            {t(LocaleKeys.PRODUCTS.SETTINGS.RESTORE)}
                          </FilledButton>
                        </>
                      )}
                    </React.Fragment>
                  )}
                  highlightButton
                />
              )}
              {(isMobile) && (
                <ExpandableSection
                  key={t(LocaleKeys.PRODUCTS.BUY_MORE_DATA.HEADING)}
                  postToggle={closeOthersForBuyMore}
                  isClose={closeBuyMore}
                  className="c-products-overview__sub-section"
                  heading={<Heading category="minor" tone="normal">{t(LocaleKeys.PRODUCTS.BUY_MORE_DATA.HEADING)}</Heading>}
                  body={(
                    (offerIsActive || offerIsPendingPause) ? <ProductTopUp selectedProduct={selectedProduct} showConfirmationExternally={setSubmitOrderSuccessMessage} /> : <Paragraph>{t(LocaleKeys.PRODUCTS.BUY_MORE_DATA.PENDING_ACTIVATION)}</Paragraph>
                  )}
                  highlightButton
                />
              )}
              {(isMobile) && (
                <ExpandableSection
                  key={t(LocaleKeys.BILLING.ALLOWANCE)}
                  postToggle={closeOthersForAllowances}
                  isClose={closeAllowances}
                  className="c-products-overview__sub-section"
                  heading={<Heading category="minor" tone="normal">{t(LocaleKeys.BILLING.ALLOWANCE)}</Heading>}
                  body={(
                    (offerIsActive || offerIsPendingPause) ? <Allowances showSelectedProductOnly /> : <Paragraph>{t(LocaleKeys.ALLOWANCES.PENDING_ACTIVATION)}</Paragraph>
                  )}
                  highlightButton
                />
              )}
              {(isMobile || selectedProduct.isBroadband || selectedProduct.isPennyPlay) && (
                <ExpandableSection
                  key={t(LocaleKeys.PRODUCTS.SETTINGS.HEADING)}
                  postToggle={closeOthersForSettings}
                  isClose={closeSettings}
                  className="c-products-overview__sub-section"
                  heading={<Heading category="minor" tone="normal">{t(LocaleKeys.PRODUCTS.SETTINGS.HEADING)}</Heading>}
                  body={(selectedProduct.isPennyPlay && props.isRunningMobile) ?
                    (
                      <Paragraph>{t(LocaleKeys.PRODUCTS.SETTINGS.PLAY_IN_APP_REDIRECT)}</Paragraph>
                    ) :
                    (
                      <ProductSettings product={selectedProduct} offerIsActive={offerIsActive} />
                    )}
                  highlightButton
                />
              )}
            </div>
          </div>
        )}
      </Main>
    </PageContent>
  );

  if (props.match.params.productId && (isRouteInvalid || productIndicator === -1)) {
    return <Redirect to={getNotFoundNavItem().url} />;
  }

  const isSelectedProduct = selectedProduct && selectedProduct.offeringInstanceId;

  return (
    <Switch>
      <Route exact path={`${match.url}/${t(LocaleKeys.ROUTES.MANAGE)}/:mode`} component={ManageProductRoute} />
      <Route exact path={`${match.url}`} render={() => (isSelectedProduct ? productsPage : emptyPage)} />
      <Redirect to={getNotFoundNavItem().url} />
    </Switch>
  );
};

Products.propTypes = {
  /** True if this product has an activation request open. */
  activationRequestedForSelectedProduct: PropTypes.bool,
  /** A list of activation requests that have been initiated */
  activationRequestIdForOpenSelectedProduct: PropTypes.string,
  /** A list of activation requests that have not been initiated */
  activationRequestIdForSelectedProduct: PropTypes.string,
  activationRequestForSelectedProduct: PropTypes.func.isRequired,
  /** An error message response kicked back from an API call */
  apiFault: PropTypes.shape({
    translatedMessage: PropTypes.string.isRequired,
    Code: PropTypes.number.isRequired
  }),
  /** True if subscriber offerings have been loaded */
  areSubscriberOfferingsLoaded: PropTypes.bool,
  /** Requests the mobile catalog of service features */
  fetchCatalog: PropTypes.func.isRequired,
  /** Requests additional information on the mobile service features */
  fetchMobileServiceFeatures: PropTypes.func.isRequired,
  /** True if subscriber has payment failures for this product */
  hasPaymentFailure: PropTypes.bool,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag for when a product action is being utilized and the loading indicator should be triggered. */
  isHandlingProductAction: PropTypes.bool.isRequired,
  /** Flag to determine if we are in-app or not */
  isRunningMobile: PropTypes.bool.isRequired,
  /** Flag which describes when a SubmitOrder action has been started but is not yet completed */
  isSubmittingOrder: PropTypes.bool.isRequired,
  /** Flag to determine if the most recent call to SubmitOrder has completed. Will be false if there is an apiFault */
  isSubmitOrderLoaded: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] Match object provided by react-router */
  match: PropTypes.object.isRequired,
  /** Returns the case object for a failed payment on the selected product */
  paymentFailure: PropTypes.shape({
    /** The payment failure case id */
    caseId: PropTypes.string
  }),
  /** The list of offerings for the subscriber */
  productList: PropTypes.arrayOf(PropTypes.shape({
    /** The display name for the product */
    displayName: PropTypes.string,
    /** Formatted service identifier of the product */
    displayServiceIdentifier: PropTypes.string,
    /** Flag to determine if it is broadband */
    isBroadband: PropTypes.bool,
    /** Plan name for the product */
    planName: PropTypes.string,
    /** The id of the product */
    offeringInstanceId: PropTypes.string,
    /** Service Identifier of the product */
    serviceIdentifier: PropTypes.string,
    /** Thumbnail url of the product */
    thumbnailUrl: PropTypes.string
  })).isRequired,
  /** Refresh Subscriber Offers */
  refreshOffers: PropTypes.func.isRequired,
  /** Function used to opt in to renewing your product. */
  restoreProduct: PropTypes.func.isRequired,
  /** Retrieve convergent biller summary action */
  retrieveConvergentBillerSummary: PropTypes.func.isRequired,
  /** Retrieve codes call to perform a lookup of the metadata required to display the entitlements to the user */
  retrieveCodes: PropTypes.func.isRequired,
  /** Retrieve details for the payment failure case (or any other case we need) */
  retrieveSupportRequest: PropTypes.func.isRequired,
  /** The selected locale */
  selectedLocale: PropTypes.string.isRequired,
  /** Selected product as defined by the identifier value in the list of products */
  selectedProduct: PropTypes.shape({
    /** Offering instance id associated to the product */
    id: PropTypes.string,
    /** Allowance information */
    allowance: PropTypes.shape({
      /** Balance remaining for allowance */
      balanceRemaining: PropTypes.number
    }),
    /** Billing information related to the selected product. */
    billing: PropTypes.shape({
      /** Total amount due on next date */
      totalAmount: PropTypes.number.isRequired,
      /** Next date that the total amount is due */
      nextChargeDate: PropTypes.string
    }),
    /** Billing campaign information related to the selected Benefy product. */
    campaign: PropTypes.shape({
      /** Total amount campaign price */
      amount: PropTypes.number.isRequired,
      /** Total price discount, amount to pay */
      totalAmount: PropTypes.number.isRequired,
      /** Next date when the campaing price discount is over */
      discountExpirationDate: PropTypes.string,
      /** Boolean to verify if campaign discount period has ended or not */
      discountHasNotCycledOff: PropTypes.bool
    }),
    /** Flag to determine if a use can opt out of the renewal at the end of the billing cycle. */
    canOptOutOnRenew: PropTypes.bool,
    /** The currency code for the product */
    currencyCode: PropTypes.string,
    /** The display name for the product, will be related to the decision option. */
    displayName: PropTypes.string,
    /** Formatted service identifier of the product */
    displayServiceIdentifier: PropTypes.string,
    /** Activation date for pending active products */
    futureActivationDate: PropTypes.string,
    /** Boolean for product having first usage */
    hasFirstUsage: PropTypes.bool,
    /** The selected option Id on the primary decision. */
    hasPrimaryOption: PropTypes.string,
    /** Flag to determine if it is benify and display campaign information */
    isBenify: PropTypes.bool,
    /** Flag to determine if it is student campaign and display campaign information */
    isStudent: PropTypes.bool,
    /** Flag to tell us if it is broadband */
    isBroadband: PropTypes.bool,
    /** Flag to tell us if it is penny play */
    isPennyPlay: PropTypes.bool,
    /** Flag to tell us if it is wireless */
    isWireless: PropTypes.bool,
    /** Right to Return */
    rightToReturn: PropTypes.bool,
    /** array of options for the product */
    options: PropTypes.array,
    /** Plan name to use for the product. */
    planName: PropTypes.string,
    /** The name for the product */
    productName: PropTypes.string,
    /** Primary Option display Info */
    primaryOptionDisplayInfo: PropTypes.shape({
      /** Download Speed for broadband */
      downloadSpeed: PropTypes.string,
      /** Upload Speed for broadband */
      uploadSpeed: PropTypes.string
    }),
    /** The offering instance id of the product */
    offeringInstanceId: PropTypes.string,
    /** Service Identifier for the product. Also called the phone number. */
    serviceIdentifier: PropTypes.string,
    /** Status of the offering. */
    status: PropTypes.number,
    /** Thumbnail url associated to the offer */
    thumbnailUrl: PropTypes.string
  }),
  /** Selected product Id */
  selectedProductId: PropTypes.string,
  /** True if service features need to be loaded */
  serviceFeaturesReadyToLoad: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Callback for selecting the product to display */
  updateSelectedProduct: PropTypes.func.isRequired,
  /** Action to change context ui page data for in account help */
  setContextPageData: PropTypes.func.isRequired,
  /** Subpage 2 value of context ui  */
  page2: PropTypes.string.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(Products);
