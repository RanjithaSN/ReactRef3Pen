import {FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX} from '@selfcare/core/constants/subscriber';
import {addMonths, displayDate} from '@selfcare/core/helpers/date.helper';
import {read} from '@selfcare/core/helpers/storage/local.storage';
import {SUPPORT_REQUEST} from '@selfcare/core/redux/supportRequest/support.request.constants';
import AppConfig from 'AppConfig';
import classNames from 'classnames';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import React, {useEffect, useState} from 'react';
import {withI18n} from 'react-i18next';
import {withRouter} from 'react-router';
import {apiFaultPropTypes} from 'selfcare-core/src/constants/api.fault.prop.types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import {formatCurrency} from 'selfcare-ui/src/utilities/localization/currency';
import {WELCOME_URL_1, WELCOME_URL_2} from '../../../constants/order.constants';
import LocaleKeys from '../../../locales/keys';
import {getAccountNavItem, getPennyPlayNavItem, getProductsNavItem, getViewArticleNavItem} from '../../../navigation/sitemap.selectors';
import {SECTION_IDS} from '../../../redux/progressStepper/progress.stepper.constants';
import {ARTICLES} from '../../getHelp/post.helper';
import PageContent, {Main} from '../../pageContent/page.content';
import {SetupApiDataFromForm} from '../../supportRequest/support.request.helpers';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';
import './confirmation.scss';

const Confirmation = ({ apiFault, className, clearSubmittedOrderData, createSupportRequest, ensureDashboardReload,
  feasibilityData, fetchAddressById, hasPennyPlayInCart, hasPennyPlayProduct, isPortInOrder, isRunningMobile, isSubscriberLoading,
  history, leaveOrderConfirmationPage, portInCurrentMSISDNField, portInDate, portInDateField, portInNumber, portInPortToMSISDNField,
  portInSsnField, productList, recentlyClosedPortInRequest, recentlyNewOrOpenPortInRequest, retrieveAddresses, refreshOffers,
  SubmittedShoppingCartIsPortIn, serviceIdentifierFromCart, setSectionId, subscriber, subscriberFeasibilityAddress, subscriberMobilePhone,
  subscriberName, subscriberSSN, t, updateIsBenifyDistributionChannel }) => {
  const [portInUrlPath, setPortInUrlPath] = useState();
  const [createCaseAttempted, setCreateCaseAttempted] = useState(false);
  const [isPennyPlayOffer, setIsPennyPlayOffer] = useState(false);

  const hasOpenPortInRequest = recentlyNewOrOpenPortInRequest && !recentlyClosedPortInRequest;
  const mobileNumberPortType = AppConfig.MOBILE_NUMBER_PORT;

  useEffect(() => {
    return () => refreshOffers();
  }, [refreshOffers]);

  useEffect(() => {
    updateIsBenifyDistributionChannel(false);
  }, [updateIsBenifyDistributionChannel]);

  useEffect(() => {
    if (productList.length === 1 && pathOr(false, ['isPlayOffer'], productList[0])) {
      setIsPennyPlayOffer(true);
    }
  }, [productList]);

  useEffect(() => {
    if (!apiFault && !createCaseAttempted && (isPortInOrder || SubmittedShoppingCartIsPortIn || !hasOpenPortInRequest)) {
      const mobileProduct = productList.find((product) => product.isMobileOffer);

      if (mobileProduct && portInNumber && portInNumber.value) {
        setCreateCaseAttempted(true);
        const instanceId = mobileProduct.id;
        const id = mobileProduct.altId;
        setPortInUrlPath(`${getProductsNavItem().url}/${id}-${instanceId}/${t(LocaleKeys.ROUTES.MANAGE)}/${t(LocaleKeys.ROUTES.MANAGE_PAGE.PORT_NUMBER)}`);

        // TODO Fix. Currently pulling serviceIdentifier Info for portInCurrentMSISDNField from Local Storage for 3DS workflow workaround.
        let serviceIdentifierEntry;
        if (serviceIdentifierFromCart) {
          serviceIdentifierEntry = serviceIdentifierFromCart;
        } else {
          serviceIdentifierEntry = read('serviceIdentifierFor3DSWorkflow');
        }
        const values = {
          [SUPPORT_REQUEST.DESCRIPTION]: mobileProduct.id,
          [portInCurrentMSISDNField.id]: serviceIdentifierEntry,
          [portInPortToMSISDNField.id]: portInNumber.value.replace(FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.pattern, FORMAT_INTERNATIONAL_SWEDISH_MOBILE_REGEX.replace),
          [portInSsnField.id]: subscriberSSN,
          [portInDateField.id]: format(portInDate, 'YYYY-MM-DD')
        };
        const productInventoryItem = path(['inventoryItem', 'Id'], mobileProduct);
        if (productInventoryItem) {
          values[SUPPORT_REQUEST.INVENTORY_ITEM] = productInventoryItem;
        }
        const portInRequestData = SetupApiDataFromForm(values, mobileNumberPortType, mobileNumberPortType);
        createSupportRequest(portInRequestData);
      }
    }
  }, [apiFault, createCaseAttempted, createSupportRequest, hasOpenPortInRequest, isPortInOrder,
    mobileNumberPortType, portInCurrentMSISDNField, portInDate, portInDateField, portInNumber, portInPortToMSISDNField,
    portInSsnField, productList, SubmittedShoppingCartIsPortIn, serviceIdentifierFromCart, subscriberSSN, t]);

  useEffect(() => {
    setSectionId(SECTION_IDS.CONFIRMATION, history.push);
    retrieveAddresses();
    ensureDashboardReload();
    return () => {
      clearSubmittedOrderData();
    };
  }, [ensureDashboardReload, history, retrieveAddresses, setSectionId]);

  useEffect(() => {
    if (feasibilityData.address && !subscriberFeasibilityAddress) {
      fetchAddressById(feasibilityData.address);
    }
  }, [feasibilityData, fetchAddressById, subscriberFeasibilityAddress]);

  const niceAddressFormat = () => {
    if (!subscriberFeasibilityAddress) {
      return '';
    }
    const baseAddress = `${subscriberFeasibilityAddress.addressName} ${subscriberFeasibilityAddress.addressLocation}`;
    return feasibilityData.unitNum ? `${baseAddress} ${feasibilityData.unitNum}` : baseAddress;
  };

  const renderWelcomeText = () => {
    return hasPennyPlayInCart || isPennyPlayOffer ? (
      <>
        <Heading className="c-confirmation__title" category="major" tone="normal">{t(LocaleKeys.ORDERING.WELCOME_PLAY)}</Heading>
        <Paragraph tone="normal">
          {t(LocaleKeys.ORDERING.WELCOME_TEXT_PLAY)}
        </Paragraph>
        {isRunningMobile && (<FilledButton className="c-confirmation__play_button" onClick={() => history.push(getPennyPlayNavItem().url)}>{t(LocaleKeys.ORDERING.LAUNCH_PENNY_PLAY)}</FilledButton>)}
      </>
    ) : (
      <>
        <Heading className="c-confirmation__title" category="major" tone="normal">{t(LocaleKeys.ORDERING.WELCOME)}</Heading>
        <Paragraph tone="normal">
          {t(LocaleKeys.ORDERING.WELCOME_TEXT_1)}
          <Link onClick={() => window.open(WELCOME_URL_1)}>{t(LocaleKeys.ORDERING.WELCOME_TEXT_LINK_LABEL_1)}</Link>
          {t(LocaleKeys.ORDERING.WELCOME_TEXT_2)}
          <Link onClick={() => window.open(WELCOME_URL_2)}>{t(LocaleKeys.ORDERING.WELCOME_TEXT_LINK_LABEL_2)}</Link>
          {t(LocaleKeys.ORDERING.WELCOME_TEXT_3)}
        </Paragraph>
      </>
    );
  };

  return (
    <div className={classNames('c-confirmation', className)}>
      <PageContent className="c-loading-indicator-containment">
        <LoadingIndicator isLoading={isSubscriberLoading} />
        <Main isShop className="c-confirmation__main">
          <Heading className="c-confirmation__title" category="brand" tone="normal">{t(LocaleKeys.ORDERING.ORDER_CONFIRMATION)}</Heading>
          {apiFault && !createCaseAttempted && (
            <div className="c-confirmation__order-notification">
              <Notice
                apiFault={apiFault}
                type="error"
                heading={apiFault.translatedMessage}
              />
            </div>
          )}
          {apiFault && createCaseAttempted && (
            <div className="c-confirmation__order-notification">
              <Notice
                type="error"
                heading={t(LocaleKeys.ORDERING.PORT_IN_CREATE_CASE_FAILED_HEADING)}
              >
                <Heading
                  category="minor"
                  className="c-confirmation__port-in-error-body"
                >
                  <span>{t(LocaleKeys.ORDERING.PORT_IN_CREATE_CASE_FAILED_START)}</span>
                  <Link
                    className="c-confirmation__port-in-error-link"
                    onClick={() => leaveOrderConfirmationPage(history, portInUrlPath)}
                  >
                    {t(LocaleKeys.ORDERING.PORT_IN_CREATE_CASE_FAILED_LINK)}
                  </Link>
                  <span>{t(LocaleKeys.ORDERING.PORT_IN_CREATE_CASE_FAILED_END)}</span>
                </Heading>
              </Notice>
            </div>
          )}
          <div className="c-confirmation__section">
            {renderWelcomeText()}
            <FilledButton
              orientation="reversed"
              className="c-confirmation__button"
              onClick={() => history.push(getAccountNavItem().url)}
            >
              {t(LocaleKeys.ORDERING.GO_TO_DASHBOARD)}
            </FilledButton>
          </div>
          {!hasPennyPlayInCart && !hasPennyPlayProduct && (
            <div className="c-confirmation__section">
              <Heading className="c-confirmation__title" category="major" tone="normal">{t(LocaleKeys.ORDERING.PENNY_PLAY_AD)}</Heading>
              <Paragraph tone="normal">
                {t(LocaleKeys.ORDERING.STREAMING_AD_TEXT)}
                <Link onClick={() => history.push(getPennyPlayNavItem().url)}>{t(LocaleKeys.ORDERING.STREAMING_AD_LINK_TEXT)}</Link>
              </Paragraph>
            </div>
          )}
          <div className="c-confirmation__section">
            <Heading category="major" tone="normal">
              {
                !isPennyPlayOffer ?
                  t(LocaleKeys.ORDERING.SHIPPING_INFO) :
                  t(LocaleKeys.ORDERING.ORDER_SUMMARY)
              }
            </Heading>
            <div className="c-confirmation__section-data">
              {Boolean(productList.length) && productList.map((product) => (
                <React.Fragment key={`${product.id}_${product.label}`}>
                  <div className="c-confirmation__section-shipping">
                    <Heading category="minor" tone="normal">
                      {t(product.label)}
                    </Heading>
                    {!isPennyPlayOffer && (
                      <Heading category="minor" tone="quiet">
                        {t(product.address, {
                          address: niceAddressFormat()
                        })}
                      </Heading>
                    )}
                    {(product.activationDate && !product.isMobileOffer) && (
                      <Heading category="minor" tone="quiet">
                        {t(LocaleKeys.ORDERING.ACTIVATING_ON, {
                          date: displayDate(product.activationDate, t)
                        })}
                      </Heading>
                    )}
                    {product.activationDate && product.isMobileOffer && !(isPortInOrder || SubmittedShoppingCartIsPortIn) && (
                      <Heading category="minor" tone="quiet">
                        {t(LocaleKeys.ORDERING.ACTIVATING_ON, {
                          date: displayDate(product.activationDate, t)
                        })}
                      </Heading>
                    )}
                    {product.isMobileOffer && portInDate && SubmittedShoppingCartIsPortIn && (
                      <>
                        <Heading category="minor" tone="quiet">
                          {t(LocaleKeys.ORDERING.ACTIVATING_ON, {
                            date: displayDate(portInDate, t)
                          })}
                        </Heading>
                        <Heading category="minor" tone="quiet">
                          {t(LocaleKeys.ORDERING.PORTING_ON, {
                            date: displayDate(portInDate, t)
                          })}
                        </Heading>
                      </>
                    )}
                    {product.isBenifyOffer && (
                      <>
                        <Heading category="minor" tone="quiet">
                          {t(LocaleKeys.PRODUCTS.CAMPAIGN.ORDINARY_PRICE, {
                            ordinaryPrice: formatCurrency(product.ordinaryAmount, product.currencyCode, product.locale)
                          })}
                        </Heading>
                        {enableDiscounts() && (
                          <Heading category="minor" tone="quiet">
                            {t(LocaleKeys.PRODUCTS.CAMPAIGN.DISCOUNT_PRICE_MONTHS, {
                              campaignPrice: product.discountedAmount
                            })}
                          </Heading>
                        )}
                      </>
                    )}
                    {!product.isBenifyOffer && !product.isPlayOffer && (
                      <>
                        <Heading category="minor" tone="quiet">
                          {t(LocaleKeys.PRODUCTS.CAMPAIGN.ORDINARY_PRICE, {
                            ordinaryPrice: formatCurrency(product.ordinaryAmount, product.currencyCode, product.locale)
                          })}
                        </Heading>
                        {product.hasDiscount && enableDiscounts() && (
                          <Heading category="minor" tone="quiet">
                            {t(LocaleKeys.PRODUCTS.DISCOUNT.DISCOUNT_LIMIT_NOTICE, {
                              discountName: t(product.campaignLabel),
                              discountAmount: formatCurrency(product.discountedAmount, product.currencyCode, product.locale),
                              discountEndDate: displayDate(addMonths(product.activationDate, product.discountMonthsLimit), t)
                            })}
                          </Heading>
                        )}
                      </>
                    )}
                    {(!product.isBenifyOffer && product.isPlayOffer) && (
                      <>
                        <Heading category="minor" tone="quiet">
                          {t(LocaleKeys.PRODUCTS.CAMPAIGN.ORDINARY_PRICE, {
                            ordinaryPrice: formatCurrency(product.ordinaryAmount, product.currencyCode, product.locale)
                          })}
                          &nbsp;
                          { t(LocaleKeys.ORDERING.PER_MONTH) }
                        </Heading>
                        {product.hasDiscount && enableDiscounts() && (
                          <Heading category="minor" tone="quiet">
                            {t(LocaleKeys.PRODUCTS.DISCOUNT.DISCOUNT_LIMIT_NOTICE, {
                              discountName: t(product.campaignLabel),
                              discountAmount: formatCurrency(product.discountedAmount, product.currencyCode, product.locale),
                              discountEndDate: displayDate(addMonths(product.activationDate, product.discountMonthsLimit), t)
                            })}
                          </Heading>
                        )}
                      </>
                    )}
                  </div>
                  <div>
                    {
                      !isPennyPlayOffer && (
                        <Heading category="minor" tone="quiet">{t(product.shipping)}</Heading>
                      )
                    }
                  </div>
                </React.Fragment>
              ))}
              {(hasPennyPlayInCart && !isPennyPlayOffer) && (
                <Heading category="minor" tone="normal">{t(LocaleKeys.ORDERING.PENNY_PLAY)}</Heading>
              )}
            </div>
          </div>
          <div className="c-confirmation__section">
            <Heading category="major" tone="normal">{t(LocaleKeys.ORDERING.CUSTOMER_INFO)}</Heading>
            <div className="c-confirmation__section-data">
              <div>
                <Heading className="c-confirmation__section-header" category="minor" tone="quiet">{t(LocaleKeys.SUBSCRIBER.NAME)}</Heading>
                <Heading category="minor" tone="normal">{subscriberName}</Heading>
              </div>
              <div>
                <Heading className="c-confirmation__section-header" category="minor" tone="quiet">{t(LocaleKeys.SUBSCRIBER.MOBILE_PHONE)}</Heading>
                <Heading category="minor" tone="normal">{subscriberMobilePhone}</Heading>
              </div>
              <div>
                <Heading className="c-confirmation__section-header" category="minor" tone="quiet">{t(LocaleKeys.SUBSCRIBER.EMAIL)}</Heading>
                <Heading category="minor" tone="normal">{path(['Email'], subscriber)}</Heading>
              </div>
            </div>
          </div>
          <div className="c-confirmation__section">
            {!isRunningMobile && (
              <>
                <Heading className="c-confirmation__title" category="major" tone="normal">{t(LocaleKeys.ORDERING.MOBILE_APP)}</Heading>
                <Paragraph tone="normal">{t(LocaleKeys.ORDERING.MOBILE_APP_TEXT)}</Paragraph>
                <OutlineButton
                  className="c-confirmation__button-article"
                  onClick={() => history.push(`${getViewArticleNavItem().url}/${ARTICLES.LEARN_MORE_MOBILE_APP}`)}
                >
                  {t(LocaleKeys.ORDERING.LEARN_MORE)}
                </OutlineButton>
              </>
            )}
          </div>
          {!hasPennyPlayInCart || !isPennyPlayOffer && (
            <div className="c-confirmation__section">
              <Heading className="c-confirmation__title" category="major" tone="normal">{t(LocaleKeys.ORDERING.ACTIVATION)}</Heading>
              <Paragraph tone="normal">{t(LocaleKeys.ORDERING.ACTIVATION_TEXT_LINE1)}</Paragraph>
              <Paragraph tone="normal">{t(LocaleKeys.ORDERING.ACTIVATION_TEXT_LINE2)}</Paragraph>
              <Paragraph tone="normal">{t(LocaleKeys.ORDERING.ACTIVATION_TEXT_LINE3)}</Paragraph>
            </div>
          )}
        </Main>
      </PageContent>
    </div>
  );
};

Confirmation.displayName = 'Confirmation';
Confirmation.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: apiFaultPropTypes,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Method used to clear submitted order data */
  clearSubmittedOrderData: PropTypes.func.isRequired,
  /** Function to be called on submission of the support request form to create the request */
  createSupportRequest: PropTypes.func,
  /** Method used to ensure addresses have been loaded */
  ensureDashboardReload: PropTypes.func.isRequired,
  /** The feasibility data we have for the subscriber */
  feasibilityData: PropTypes.shape({
    /** The addressID */
    address: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** The unit number */
    unitNum: PropTypes.string
  }),
  /** Function used to retrieve the friendly name for the address id */
  fetchAddressById: PropTypes.func.isRequired,
  /** Play is in the cart. */
  hasPennyPlayInCart: PropTypes.bool.isRequired,
  /** Whether play is already on the account */
  hasPennyPlayProduct: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** True if user selected port-in on order configuration page */
  isPortInOrder: PropTypes.bool,
  /** State bool to determine if we are running in an app */
  isRunningMobile: PropTypes.bool.isRequired,
  /** True if Subscriber is still loading */
  isSubscriberLoading: PropTypes.bool,
  /** Function to leave the order confirmation page */
  leaveOrderConfirmationPage: PropTypes.func.isRequired,
  /** Current MSISDN Field information for creation of new port in case. */
  portInCurrentMSISDNField: PropTypes.shape({
    id: PropTypes.string
  }),
  /** The port in date for the product */
  portInDate: PropTypes.string,
  /** Port in Date Field */
  portInDateField: PropTypes.shape({
    id: PropTypes.string
  }),
  /** Port in number */
  portInNumber: PropTypes.object,
  /** Port in number service identifier field */
  portInNumberField: PropTypes.shape({
    id: PropTypes.string
  }),
  /** New MSISDN Field information for creation of new port in case. */
  portInPortToMSISDNField: PropTypes.shape({
    id: PropTypes.string
  }),
  /** Port in SSN */
  portInSsnField: PropTypes.shape({
    id: PropTypes.string
  }),
  /** Whether there is a recently closed port-in request. */
  recentlyClosedPortInRequest: PropTypes.object,
  /** Whether there is a recently new or open port in request. */
  recentlyNewOrOpenPortInRequest: PropTypes.object,
  /** Order product list */
  productList: PropTypes.arrayOf(PropTypes.shape({
    /** Address that this prodcut will ship to */
    address: PropTypes.string.isRequired,
    /** Instance id for this product */
    id: PropTypes.string.isRequired,
    /** Id for this product */
    altId: PropTypes.string.isRequired,
    /** label for the product */
    label: PropTypes.string.isRequired,
    /** whether or not the product is benify */
    isBenifyOffer: PropTypes.bool.isRequired,
    /** if the offer has any type of discount */
    hasDiscount: PropTypes.bool.isRequired,
    /** product price original amount */
    ordinaryAmount: PropTypes.number,
    /** discounted product price. E.g. student offer or benify */
    discountedAmount: PropTypes.number,
    activationDate: PropTypes.object
  })),
  /** Refresh Subscriber Offers */
  refreshOffers: PropTypes.func.isRequired,
  /** Method used to ensure addresses have been loaded */
  retrieveAddresses: PropTypes.func.isRequired,
  /** True if shopping cart has attribute in it with port-in intent set to port-in */
  SubmittedShoppingCartIsPortIn: PropTypes.bool,
  /** Service identifier from offerings in cart. */
  serviceIdentifierFromCart: PropTypes.string,
  /** Method used to update the current section id */
  setSectionId: PropTypes.func.isRequired,
  /** Subscriber information */
  subscriber: PropTypes.shape({
    /** Email field */
    Email: PropTypes.string
  }),
  /** The address linked to the address id for this subscriber's eligibility */
  subscriberFeasibilityAddress: PropTypes.shape({
    /** Stree name */
    addressName: PropTypes.string,
    /** Street number */
    addressLocation: PropTypes.string
  }),
  /** Display local swedish format for mobile phone */
  subscriberMobilePhone: PropTypes.string,
  /** Subscriber full name */
  subscriberName: PropTypes.string,
  /** SSN of subscriber */
  subscriberSSN: PropTypes.string.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Updates whether the distribution channel should be the Benify one or not. */
  updateIsBenifyDistributionChannel: PropTypes.func.isRequired
};

export const NakedCheckout = Confirmation;
export default compose(
  withI18n(),
  withRouter
)(Confirmation);
