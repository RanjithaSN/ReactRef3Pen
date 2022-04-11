/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import { checkoutAnalytic } from '@selfcare/core/analytics/checkout.analytics';
import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import Cost from '@selfcare/ui/components/cost/cost';
import FormErrors from '@selfcare/ui/components/formErrors/form.errors';
import Heading from '@selfcare/ui/components/heading/heading';
import IconButton from '@selfcare/ui/components/iconButton/icon.button';
import LoadingIndicator from '@selfcare/ui/components/loadingIndicator/loading.indicator';
import Notice from '@selfcare/ui/components/notice/notice';
import Paragraph from '@selfcare/ui/components/paragraph/paragraph';
import IconArrowThinRight from '@selfcare/ui/icons/react-icons/arrow-thin-right';
import PropTypes from 'prop-types';
import qs from 'query-string';
import compose from 'ramda/src/compose';
import isEmpty from 'ramda/src/isEmpty';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { transactionAnalytic } from 'selfcare-core/src/analytics/transaction.analytics';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import { read, write } from 'selfcare-core/src/helpers/storage/local.storage';
import LocaleKeys from '../../../locales/keys';
import {
  getCheckoutNavItem,
  getConfirmationNavItem,
  getSubscriberInformationNavItem
} from '../../../navigation/sitemap.selectors';
import { SECTION_IDS } from '../../../redux/progressStepper/progress.stepper.constants';
import PageContent from '../../pageContent/page.content';
import PaymentSelector from '../../paymentInstrument/paymentSelector/payment.selector';
import TrustedEntities from '../trustedEntities/trusted.entities';
import { trustedCards, trustedEntitiesList } from '../trustedEntities/trusted.entities.helper';
import CheckoutConsent from './checkout.consent';
import { mapSubscriberConsents } from './checkout.helper';
import { CheckoutContainer, CheckoutMain } from './checkout.styled';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';
import './checkout.scss';

const Checkout = ({ apiFault,
  calculateOrderQuote,
  className,
  clearFault,
  clearOrderQuote,
  codesLoading,
  consentArray,
  createPaymentInstrument,
  current3DS1MDValue,
  currentSectionId,
  defaultPaymentInstrument,
  hasBenifyInCart,
  hasPennyPlayInCart,
  history,
  isExistingUser,
  isInBundleOrderFlow,
  isLoggedIn,
  isMobileOffer,
  isPortIn,
  isProspect,
  isProspectSubscriberCreating,
  isQuotingOrder,
  isSubmitOrderLoaded,
  location,
  optionsViewDataInShoppingCart,
  openLoginModal,
  paymentInstrumentIsLoading,
  paymentMethods,
  promotionalConsentIds,
  quoteCalculated,
  quoteItemsList,
  quoteTotals,
  retrieveCodes,
  retrieveSavedCart,
  retrieveSupportRequestTypes,
  retrieveWallet,
  savedCartIsLoaded,
  savedCartItems,
  selectedLocale,
  serviceIdentifierFromCart,
  set3DS1RedirectUrl,
  setIsExistingUser,
  setPaymentInstrumentDefault,
  setSectionId,
  submit3DS1OrderFinalRequest,
  submitOrder,
  subscriberFormFields,
  t,
  threeDSSubmitOrderRedirectUrl,
  updateIsBenifyDistributionChannel,
  updatePaymentInstrumentValues,
  updateSubscriber,
  updateSubscriberFormValues }) => {
  const [consentAcknowledged, setConsentAcknowledged] = useState({});
  const [validPaymentInput, setValidPaymentInput] = useState(false);
  const [paymentMethodData, setPaymentMethodData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noPaymentMethodError, setNoPaymentMethodError] = useState(false);
  const [isSubmitInProgress, setIsSubmitInProgress] = useState(false);

  const queryParams = qs.parse(location.search, {
    decode: false
  });
  const has3DSPaymentInfo = queryParams && queryParams.MD && queryParams.MD === current3DS1MDValue;

  // 1. Get all the pre-requisite code tables ready
  const useInitializeStatus = () => {
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
      if (!consentArray.length) {
        retrieveCodes(CODES.ConsentConfiguration);
        retrieveCodes(CODES.ConsentType);
        retrieveCodes(CODES.Regex);
        retrieveCodes(CODES.FormControlType);
        retrieveSupportRequestTypes();
        if (currentSectionId !== SECTION_IDS.PAYMENT) {
          setSectionId(SECTION_IDS.PAYMENT, history.push);
        }
      } else {
        setInitialized(true);
      }
    }, [consentArray]);

    return initialized;
  };

  // 2. Make sure subscriber related pre-requisites are ready
  const useSubscriberStatus = (isInitialized) => {
    const [subscriberReady, setSubscriberReady] = useState(false);

    useEffect(() => {
      if (isInitialized) {
        setIsExistingUser(!isProspect); // Added to support analytics
        if (!isProspect) {
          if (!has3DSPaymentInfo) {
            retrieveWallet();
          }
          setSubscriberReady(true);
        }
      }
    }, [isInitialized]);

    useEffect(() => {
      if (isProspect) {
        if (subscriberFormFields && !subscriberFormFields.Email) {
          history.push(getSubscriberInformationNavItem().url);
        }

        if (consentArray.length && !Object.keys(consentAcknowledged).length) {
          const isConsentAcknowledged = {};

          consentArray.forEach((consent) => {
            isConsentAcknowledged[consent.type] = {
              accepted: false
            };
          });
          setConsentAcknowledged(isConsentAcknowledged);
          setSubscriberReady(true);
        }
      }
    }, [consentArray, subscriberFormFields]);

    return subscriberReady;
  };

  // 3. Retrieve shopping cart for submit
  const useCartStatus = (isSubscriberReady) => {
    const [cartReady, setCartReady] = useState(false);
    const [checkoutAnalyticCalled, setCheckoutAnalyticCalled] = useState(false);

    useEffect(() => {
      if (isSubscriberReady) {
        if (!savedCartIsLoaded) {
          const hasBenifyProductAfter3DS = read('hasBenifyProduct');
          if (hasBenifyProductAfter3DS) {
            updateIsBenifyDistributionChannel(true);
          }
          retrieveSavedCart();
        } else {
          setCartReady(true);
        }
      }
    }, [isSubscriberReady, savedCartIsLoaded]);

    useEffect(() => {
      if (!isEmpty(optionsViewDataInShoppingCart) && !checkoutAnalyticCalled) {
        checkoutAnalytic(optionsViewDataInShoppingCart, 2, !isProspect); // Changed for analytics
        setCheckoutAnalyticCalled(true);
      }
    }, [optionsViewDataInShoppingCart]);

    return cartReady;
  };

  // 4. Calculate quotes
  const useQuoteStatus = (isCartReady) => {
    const [quoteReady, setQuoteReady] = useState(false);

    useEffect(() => {
      if (isCartReady) {
        if (!quoteCalculated) {
          calculateOrderQuote();
        } else {
          setQuoteReady(true);
        }
      }
    }, [isCartReady, quoteCalculated]);

    return quoteReady;
  };

  // 5. Payment status check
  const usePaymentStatus = (isQuoteReady) => {
    const [paymentReady, setPaymentReady] = useState(false);

    useEffect(() => {
      if (isQuoteReady) {
        setPaymentReady(Boolean((paymentMethodData && paymentMethodData.Id) || (!isProspect && has3DSPaymentInfo)));
      }
    }, [isQuoteReady, paymentMethodData]);

    useEffect(() => {
      if (!paymentMethodData && defaultPaymentInstrument) {
        setPaymentMethodData(defaultPaymentInstrument, true);
      }
    }, [defaultPaymentInstrument]);
    return paymentReady;
  };

  // 6. Submit Status Check
  const useSubmitStatus = (isPaymentReady) => {
    const [submitReady, setSubmitReady] = useState(false);

    useEffect(() => {
      // This is a case when 3DS validation has come back with successful validation
      // or Penny Play purchase with valid payment
      if (isPaymentReady) {
        const noUserInteractionSubmit = has3DSPaymentInfo && !isSubmitOrderLoaded;
        setSubmitReady(noUserInteractionSubmit);
      }
    }, [isPaymentReady, hasPennyPlayInCart, isSubmitOrderLoaded]);

    return submitReady;
  };

  // 7. Submitted Order status
  const useConfirmationStatus = (isCartReady) => {
    const [confirmationReady, setConfirmationReady] = useState(false);
    useEffect(() => {
      if (isCartReady) {
        if (isSubmitOrderLoaded || isEmpty(savedCartItems)) {
          setConfirmationReady(true);
        }
      }
    }, [isCartReady, isSubmitOrderLoaded, savedCartItems]);

    return confirmationReady;
  };

  const newPortProlong = () => {
    if (isPortIn) {
      return 'port';
    }
    if (isExistingUser) {
      return 'prolong';
    }
    if (!isExistingUser) {
      return 'new';
    }
  };

  const executeSubmitOrder = async (paymentInstrument) => {
    if (isSubmitInProgress) {
      return;
    }
    setIsSubmitInProgress(true);
    setIsLoading(true);

    // this is to handle the payment instrument being pulled from the typical flow
    // or 3DS generated payment instrument.
    const paymentId = paymentInstrument ? paymentInstrument.Id : (paymentMethodData && paymentMethodData.Id ? paymentMethodData.Id : null);

    let orderData = null;
    if (has3DSPaymentInfo) {
      const decodedParams = {
        MD: decodeURIComponent(queryParams.MD),
        PaRes: decodeURIComponent(queryParams.PaRes)
      };

      // We are going to redirect - block page actions.
      history.push(getCheckoutNavItem().url);
      orderData = await submit3DS1OrderFinalRequest(decodedParams);
    } else if (paymentId) {
      orderData = await submitOrder(undefined, {
        paymentInstrumentId: paymentId
      });
    }

    setIsSubmitInProgress(false);

    if (orderData) {
      transactionAnalytic(orderData, optionsViewDataInShoppingCart, newPortProlong());
    }
  };

  const updatePaymentMethod = (data, isValid) => {
    setNoPaymentMethodError(false);
    setPaymentMethodData(data);
    setValidPaymentInput(isValid);

    if (isValid) {
      updatePaymentInstrumentValues(data);
    }
  };

  const updateProspectUser = async () => {
    let hasError = false;
    const consentData = mapSubscriberConsents(consentArray, consentAcknowledged, promotionalConsentIds);

    if (!consentData.isError) {
      updateSubscriberFormValues(
        {
          ...subscriberFormFields,
          SubscriberConsents: consentData.subscriberConsents
        },
        true
      ); // second parameter is true to allow resubmission of page 2/additional information

      if (validPaymentInput) {
        const subscriberError = await updateSubscriber();
        if (subscriberError) {
          history.push(getSubscriberInformationNavItem().url);
          hasError = true;
        }
      }
    } else {
      setConsentAcknowledged(consentData.acknowledged);
      hasError = true;
    }

    return hasError;
  };

  const isInitialized = useInitializeStatus();
  const isSubscriberReady = useSubscriberStatus(isInitialized);
  const isCartReady = useCartStatus(isSubscriberReady);
  const isQuoteReady = useQuoteStatus(isCartReady);
  const isPaymentReady = usePaymentStatus(isQuoteReady);
  const isSubmitReady = useSubmitStatus(isPaymentReady);
  const isConfirmationReady = useConfirmationStatus(isCartReady);

  useEffect(() => {
    if (apiFault) {
      // If we had an error, make sure to set isLoading to false so the user can interact
      setIsLoading(false);
    }
  }, [apiFault]);

  useEffect(() => {
    if (isSubmitReady) {
      executeSubmitOrder();
    }
  }, [isSubmitReady]);

  useEffect(() => {
    if (isConfirmationReady) {
      write('hasBenifyProduct', false);
      updateIsBenifyDistributionChannel(false);
      history.push(getConfirmationNavItem().url);
      retrieveSavedCart();
    }
    return () => {
      clearOrderQuote();
    }
  }, [isConfirmationReady]);

  const onCompleteOrderClicked = async () => {
    setIsLoading(true);

    if (isProspect) {
      const hasError = await updateProspectUser();
      if (hasError) {
        setIsLoading(false);
        return;
      }
    }

    const serviceIdentifierEntry = serviceIdentifierFromCart;
    write('serviceIdentifierFor3DSWorkflow', serviceIdentifierEntry);
    write('hasBenifyProduct', hasBenifyInCart);

    if (validPaymentInput) {
      clearFault();

      if (!paymentMethodData.Id) {
        await setPaymentInstrumentDefault(true);
        set3DS1RedirectUrl(threeDSSubmitOrderRedirectUrl);
        try {
          const response = await createPaymentInstrument();
          // It will redirect if 3DS validation is needed
          if (response.PaymentInstrument && response.PaymentInstrument.Id) {
            updatePaymentMethod(response.PaymentInstrument, true);
            executeSubmitOrder(response.PaymentInstrument);
          }
        // eslint-disable-next-line no-empty
        } catch {} // do nothing since payment info needs to be validated.
      } else {
        executeSubmitOrder();
      }
    }
  };

  const onAcknowledge = (consentType, accepted) => {
    setConsentAcknowledged((prevState) => ({
      ...prevState,
      [consentType]: {
        accepted
      }
    }));
  };

  const getCurrentPurchaseType = () => {
    if (isInBundleOrderFlow) {
      return 2;
    }

    return isMobileOffer ? 0 : 1;
  };

  const displayConsent =
    !codesLoading &&
    isProspect &&
    consentArray.length > 0 &&
    consentArray.length === Object.keys(consentAcknowledged).length;

  const isLoadingStatus =
    isQuotingOrder ||
    codesLoading ||
    paymentInstrumentIsLoading ||
    isProspectSubscriberCreating ||
    paymentInstrumentIsLoading ||
    isLoading;

  return (
    <CheckoutContainer className={`c-checkout ${className}`}>
      <PageContent>
        <CheckoutMain isShop className="c-loading-indicator-containment">
          <LoadingIndicator isLoading={isLoadingStatus} />
          <div className="c-checkout__heading">
            <Heading category="brand" tone="normal">
              {t(LocaleKeys.ORDERING.ORDER_SUMMARY)}
            </Heading>
          </div>

          <div className="c-checkout__heading_subtitle_logotypes_wrapper">
            <Paragraph className="c-checkout__heading__heading__card_notice">
              {t(LocaleKeys.ORDERING.CARD_PAYMENT)}
            </Paragraph>
            {trustedCards.map((card) => (
              <img src={card.image} key={card.ref} alt={card.ref} className="c-trusted-cards__logotype" />
            ))}
          </div>

          <Paragraph className="c-checkout__heading__heading__title">{t(LocaleKeys.ORDERING.INTRO_COPY)}</Paragraph>
          {apiFault && (
            <div className="c-payment-information__notification">
              <Notice
                apiFault={apiFault}
                type="error"
                heading={apiFault.translatedMessage}
                openLoginModal={openLoginModal}
              />
            </div>
          )}
          {noPaymentMethodError && (
            <div className="c-payment-information__form-errors">
              <FormErrors />
            </div>
          )}
          <PaymentSelector
            selectedInstrument={paymentMethodData}
            instruments={paymentMethods}
            onChange={updatePaymentMethod}
            allowAdd
            locked={isLoggedIn}
            selectedLocale={selectedLocale}
          />
          {Boolean(displayConsent) && (
            <CheckoutConsent
              consentAcknowledged={consentAcknowledged}
              consentArray={consentArray}
              onAcknowledge={onAcknowledge}
            />
          )}
          {quoteCalculated && (
            <div className="c-checkout__section">
              {Boolean(quoteItemsList.length) &&
                quoteItemsList.map((item) => {
                  return (
                    <div className="c-checkout__line-item" key={`${item.label}-${item.value}`}>
                      <Heading category="minor" tone="normal">
                        {item.label}
                      </Heading>
                      <Heading category="major" tone="quiet">
                        <Cost alternate cost={item.value} beforeDiscount={enableDiscounts() ? null : item.originalValue} />
                      </Heading>
                    </div>
                  );
                })}
              {Boolean(quoteTotals.oneTimeTotal) && (
                <React.Fragment>
                  <div className="c-checkout__one-time-total">
                    <Heading category="major" tone="quiet">
                      {t(LocaleKeys.ORDERING.ONE_TIME_TOTAL)}
                    </Heading>
                    <Heading category="major" tone="quiet">
                      {quoteTotals.oneTimeTotal}
                    </Heading>
                  </div>
                  <div className="c-checkout__monthly-total">
                    <Heading category="major" tone="normal">
                      {t(LocaleKeys.ORDERING.MONTHLY_TOTAL)}
                    </Heading>
                    <Heading category="major" tone="normal">
                      {quoteTotals.recurringTotal}
                    </Heading>
                  </div>
                </React.Fragment>
              )}
            </div>
          )}
          <div className="c-checkout__button-wrapper">
            <IconButton
              className="c-checkout__button"
              orientation="reversed"
              icon={<IconArrowThinRight />}
              onClick={() => onCompleteOrderClicked()}
              disabled={!validPaymentInput}
            >
              {t(LocaleKeys.ORDERING.ORDER_CONCLUSION)}
            </IconButton>
          </div>
          <TrustedEntities badgesArray={trustedEntitiesList} currentPurchaseType={getCurrentPurchaseType()} />
        </CheckoutMain>
      </PageContent>
    </CheckoutContainer>
  );
};

Checkout.displayName = 'Checkout';
Checkout.propTypes = {
  /** An error message response kicked back from an API call */
  apiFault: apiFaultPropTypes,
  /** Function to get order quote for the saved cart. */
  calculateOrderQuote: PropTypes.func.isRequired,
  /** Are codes still loading. */
  codesLoading: PropTypes.bool,
  /** Array of consents required for new user creation. */
  consentArray: PropTypes.arrayOf(
    PropTypes.shape({
      /** Label displayed next to checkbox */
      label: PropTypes.string,
      /** Is acceptance of the consent required */
      required: PropTypes.bool,
      /** Consent type value */
      type: PropTypes.string
    })
  ),
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Action to clear current api faults. */
  clearFault: PropTypes.func.isRequired,
  /** Func to reset order quote values. */
  clearOrderQuote: PropTypes.func.isRequired,
  /** Action to create a payment instrument */
  createPaymentInstrument: PropTypes.func.isRequired,
  /** Stored 3DS MD Value */
  current3DS1MDValue: PropTypes.string,
  /** Current Section Id */
  currentSectionId: PropTypes.number.isRequired,
  /** Current default payment instrument for current user. */
  defaultPaymentInstrument: PropTypes.object,
  /** Bool flag if bundle is selected */
  isInBundleOrderFlow: PropTypes.bool,
  /** Bool flag if current offer is mobile */
  isMobileOffer: PropTypes.bool,
  /** The selected locale. */
  selectedLocale: PropTypes.string.isRequired,
  /** Play is in the cart. */
  hasPennyPlayInCart: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** True if calculate order quote call is pending. */
  isQuotingOrder: PropTypes.bool.isRequired,
  /** Populated by the consents array having length */
  isExistingUser: PropTypes.bool,
  /** Whether or not a subscriber is logged in */
  isLoggedIn: PropTypes.bool,
  /** Is the Mobile ported from another provider */
  isPortIn: PropTypes.bool,
  /** True if switching current prospect into a subscriber. */
  isProspectSubscriberCreating: PropTypes.bool.isRequired,
  /** True if current user has not consented to GDPR. */
  isProspect: PropTypes.bool.isRequired,
  /** Check if an order is being processed */
  isSubmittingOrder: PropTypes.bool,
  /** Check if an order is submitted */
  isSubmitOrderLoaded: PropTypes.bool,
  /** The location object provided by the router */
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string
  }),
  /** Function to pop up the login modal */
  openLoginModal: PropTypes.func,
  /** Whether the payment instrument is being created */
  paymentInstrumentIsLoading: PropTypes.bool,
  /** Array of promotional consents set off the GDPR consent / non-required consent. */
  promotionalConsentIds: PropTypes.arrayOf(PropTypes.string),
  /** Flag to tell us if a quote has been calculated. */
  quoteCalculated: PropTypes.bool,
  /** List of items that are quoted to display to the user. */
  quoteItemsList: PropTypes.arrayOf(
    PropTypes.shape({
      /** label of item */
      label: PropTypes.string,
      /** value of item */
      value: PropTypes.string
    })
  ),
  /** Rolled up totals of all quoted items */
  quoteTotals: PropTypes.shape({
    /** one time total */
    oneTimeTotal: PropTypes.string,
    /** recurring total */
    recurringTotal: PropTypes.string
  }),
  /** Ensures saved cart is retrieved */
  retrieveSavedCart: PropTypes.func.isRequired,
  /** Ensures subscriber's wallet is retrieved */
  retrieveWallet: PropTypes.func.isRequired,
  retrieveSupportRequestTypes: PropTypes.func.isRequired,
  /** Function to retrieve codes */
  retrieveCodes: PropTypes.func.isRequired,
  /** Function to perform the challenge request/response for 3DS1 */
  submit3DS1OrderFinalRequest: PropTypes.func.isRequired,
  /** Saved Shopping Cart Items */
  optionsViewDataInShoppingCart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ),
  /** True if currently processing a 3DS transaction. */
  isProcessing3DS: PropTypes.bool,
  /** Return true if saved cart is loaded, otherwise false */
  savedCartIsLoaded: PropTypes.bool,
  /** Returns the saved cart items */
  savedCartItems: PropTypes.arrayOf(PropTypes.shape({})),
  /** Payment method available for current subscriber */
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      /** Id of payment method */
      Id: PropTypes.number.isRequired,
      /** Name of payment method */
      Name: PropTypes.string.isRequired
    })
  ),
  /** Benify offer is in the cart. */
  hasBenifyInCart: PropTypes.bool.isRequired,
  /** Sets whether the payment instrument is the default one */
  setPaymentInstrumentDefault: PropTypes.func.isRequired,
  /** Sets the url that Adyen will redirect to after 3DS authorization */
  set3DS1RedirectUrl: PropTypes.func.isRequired,
  /** Value of the Service Identifier needed for the 3DS Workflow */
  serviceIdentifierFromCart: PropTypes.string,
  /** Method used to update the current section id */
  setSectionId: PropTypes.func.isRequired,
  /** Function for setting if we have an existing user based on the consent array */
  setIsExistingUser: PropTypes.func.isRequired,
  /** Subscriber information */
  subscriberFormFields: PropTypes.shape({
    Email: PropTypes.string,
    HomePhone: PropTypes.string,
    Login: PropTypes.string
  }),
  /** Ordering function to be performed when user submits order */
  submitOrder: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The submit order redirect URL for 3DS cards. */
  threeDSSubmitOrderRedirectUrl: PropTypes.string,
  /** Update subscriber method. */
  updateSubscriber: PropTypes.func.isRequired,
  /** Update the form value for the subscriber form */
  updateSubscriberFormValues: PropTypes.func.isRequired,
  /** Action used to set the payment instrument values */
  updatePaymentInstrumentValues: PropTypes.func.isRequired,
  /** Update if it is the benify distribution channel */
  updateIsBenifyDistributionChannel: PropTypes.func.isRequired
};

export const NakedCheckout = Checkout;
export default compose(withI18n(), withRouter)(Checkout);
