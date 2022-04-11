import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import LocaleKeys from '../../../locales/keys';
import PaymentSelector from '../../paymentInstrument/paymentSelector/payment.selector';
import './product.payment.scss';

const ProductPayment = ({ apiFault, clearFault, createPayment, defaultPaymentInstrument, isSearchSupportLoaded, searchSupportRequest, isCreating, isUpdating, isWalletLoading, paymentMethods, paymentFailure, isAbleToRetryPayment, paymentRetryStatus, product, retrieveAddress, retrieveWallet, retrieveWalletOnce, selectedLocale, setPaymentInstrumentDefault, submitPaymentRetry, updatePayment, updatePaymentInstrumentValues, t }) => {
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const [paymentMethodIsValid, setPaymentMethodIsValid] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethodData, setPaymentMethodData] = useState(null);
  const [walletData, setWalletData] = useState(false);
  const [isRetrying, setRetrying] = useState(false);
  const [retryWorked, setRetryWorked] = useState(null);

  useEffect(() => {
    retrieveWalletOnce();
    retrieveAddress();
  }, [retrieveAddress, retrieveWalletOnce]);

  useEffect(() => {
    if (walletData && !isCreating && !isUpdating && !isWalletLoading && defaultPaymentInstrument) {
      setPaymentMethodData(defaultPaymentInstrument);
      setWalletData(null);
    }
  }, [defaultPaymentInstrument, isCreating, isUpdating, isWalletLoading, retrieveWalletOnce, walletData]);

  useEffect(() => {
    if (product.serviceIdentifier) {
      setRetryWorked(null);
    }
  }, [product.serviceIdentifier]);

  useEffect(() => {
    if (!paymentMethodData && defaultPaymentInstrument) {
      setPaymentMethodData(defaultPaymentInstrument);
    }
  }, [paymentMethodData, defaultPaymentInstrument, paymentMethodIsValid]);

  const updatePaymentMethod = async (paymentMethod, isValid) => {
    setPaymentMethodData(paymentMethod);
    setPaymentMethodIsValid(isValid);
    setHasBeenSubmitted(false);
    setShowConfirmation(false);

    if (isValid) {
      await updatePaymentInstrumentValues(paymentMethod);
    }
  };

  const savePaymentMethod = async (revertChanges) => {
    await clearFault();
    if (revertChanges) {
      setPaymentMethodData(defaultPaymentInstrument);
      return;
    }

    setHasBeenSubmitted(true);
    try {
      if (paymentMethodData.Id && !paymentMethodData.Default) {
        await updatePayment({
          ...paymentMethodData,
          Default: true
        });
      } else if (paymentMethodIsValid) {
        await setPaymentInstrumentDefault(true);
        await createPayment();
        setWalletData(true);
      }
      await retrieveWallet();
      setShowConfirmation(true);
      return true;
    } catch {
      return false;
    }
  };

  const handleRetryPayment = async () => {
    if (!isRetrying) {
      setRetrying(true);

      if (!paymentRetryStatus) {
        await searchSupportRequest();
      }

      if (isAbleToRetryPayment) {
        const { caseId } = paymentFailure;
        const PAYMENT_SUCCESS = 'Success';

        try {
          const result = await submitPaymentRetry(caseId);
          setRetryWorked(path(['Status'], result) === PAYMENT_SUCCESS);
        } catch {
          setRetryWorked(false);
        }

        await searchSupportRequest();
      }

      setRetrying(false);
    }
  };

  return (
    <div className="c-loading-indicator-containment">
      {(hasBeenSubmitted && apiFault) && (
        <div className="c-product-payment__notification">
          <Notice
            apiFault={apiFault}
            type="error"
            heading={apiFault.translatedMessage}
          />
        </div>
      )}
      {paymentFailure && (
        <Heading className="c-product-payment__pay-fail-header" category="minor" tone="normal">{t(LocaleKeys.PRODUCTS.PAYMENT.PAYMENT_FAILURE_MESSAGE)}</Heading>
      )}
      {showConfirmation && (
        <div className="c-product-payment__notification">
          <Notice type="success" heading={t(LocaleKeys.PRODUCTS.PAYMENT.SUCCESSFUL_SWITCH)} />
        </div>
      )}
      <LoadingIndicator isLoading={isCreating || isUpdating || isWalletLoading || isRetrying} />
      <PaymentSelector
        selectedInstrument={paymentMethodData}
        instruments={paymentMethods}
        onChange={updatePaymentMethod}
        saveMethod={savePaymentMethod}
        selectedLocale={selectedLocale}
      />
      {paymentFailure && (
        <FilledButton className="c-product-payment__retry-button" disabled={!isAbleToRetryPayment || retryWorked} onClick={handleRetryPayment}>
          {t(LocaleKeys.PRODUCTS.PAYMENT.RETRY_PAYMENT)}
        </FilledButton>
      )}
      {paymentFailure && retryWorked !== null && (
        <Notice
          className="c-products-overview__notice"
          type={retryWorked ? 'info' : 'error'}
          heading={retryWorked ? t(LocaleKeys.PRODUCTS.PAYMENT.RETRY_PAYMENT_INFO) : t(LocaleKeys.PRODUCTS.PAYMENT.RETRY_PAYMENT_FAILURE)}
        />
      )}
    </div>
  );
};

ProductPayment.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Clear last saved fault. */
  clearFault: PropTypes.func.isRequired,
  /** Creates new default payment instrument */
  createPayment: PropTypes.func.isRequired,
  /** Current default payment instrument for current user. */
  defaultPaymentInstrument: PropTypes.object,
  /** Is creating a payment instrument */
  isCreating: PropTypes.bool,
  /** Search Support request loaded */
  isSearchSupportLoaded: PropTypes.bool,
  /** Is updating a payment instrument */
  isUpdating: PropTypes.bool,
  /** Is loading payment instruments */
  isWalletLoading: PropTypes.bool,
  /** Sets wether the user is able to retry a payment */
  isAbleToRetryPayment: PropTypes.bool,
  /** Returns the current payment retry status for the given product */
  paymentRetryStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Payment method available for current subscriber */
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({
    /** Id of payment method */
    Id: PropTypes.number.isRequired,
    /** Name of payment method */
    Name: PropTypes.string.isRequired
  })),
  /** Returns the case object for a failed payment on the selected product */
  paymentFailure: PropTypes.shape({
    /** The payment failure case id */
    caseId: PropTypes.string
  }),
  /** Product information to be used for the display of information */
  product: PropTypes.shape({
    /** Service Identifier for the product. Also called the phone number. */
    serviceIdentifier: PropTypes.string
  }),
  /** Ensures subscribers address are retrieved */
  retrieveAddress: PropTypes.func.isRequired,
  /** Forces fresh retrieves of the subscriber's wallet */
  retrieveWallet: PropTypes.func.isRequired,
  /** Retrieves subscriber's wallet if it has not already been retireved. */
  retrieveWalletOnce: PropTypes.func.isRequired,
  /** The selected locale. */
  selectedLocale: PropTypes.string.isRequired,
  /** Sets whether the payment instrument is the default one */
  setPaymentInstrumentDefault: PropTypes.func.isRequired,
  /** The action to trigger when populating the list for support requests */
  searchSupportRequest: PropTypes.func.isRequired,
  /** Submits a request to retry a failed payment */
  submitPaymentRetry: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Updates selected payment instrument */
  updatePayment: PropTypes.func.isRequired,
  /** Updates new payment instrument values */
  updatePaymentInstrumentValues: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(ProductPayment);
