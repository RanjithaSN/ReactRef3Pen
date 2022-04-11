import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Checkbox from 'selfcare-ui/src/components/checkbox/checkbox';
import Heading from 'selfcare-ui/src/components/heading/heading';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LocaleKeys from '../../../../locales/keys';
import { getPaymentMethodsNavItem } from '../../../../navigation/sitemap.selectors';
import PageContent, { Main } from '../../../pageContent/page.content';
import PaymentMethodForm from '../../../paymentInstrument/adyenExternalPaymentMethod/payment.method.form';
import './add.payment.method.scss';
import { write as localStorageWrite, remove as localStorageRemove } from '@selfcare/core/helpers/storage/local.storage';
import { MAKE_CARD_DEFAULT } from '@selfcare/core/redux/utils/api.constants';

const AddPaymentMethod = ({ apiFault, createPaymentInstrument, defaultPaymentInstrument, history, isProcessing3DSPaymentInstrument, paymentMethods,
  set3DS1RedirectUrl, setPaymentInstrumentOptions, t, threeDSPaymentInstrumentRedirectUrl, updatePaymentInstrumentValues }) => {
  const [isDefaultSelected, setIsDefaultSelected] = useState(false);
  const [forceDefault, setForceDefault] = useState(false);
  const [paymentMethodData, setPaymentMethodData] = useState(null);
  const [paymentMethodIsValid, setPaymentMethodIsValid] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    // Force default if there are no other payment methods or if no payment methods are selected as default
    setForceDefault(Boolean(!paymentMethods.length) || !defaultPaymentInstrument);

    setPaymentInstrumentOptions({
      canSave: true,
      isDefault: forceDefault
    });
  }, [defaultPaymentInstrument, forceDefault, paymentMethods, setForceDefault, setPaymentInstrumentOptions]);

  useEffect(() => {
    if (paymentMethodIsValid && paymentMethodData.paymentMethod) {
      updatePaymentInstrumentValues(paymentMethodData.paymentMethod);
    }
  }, [paymentMethodData, paymentMethodIsValid, updatePaymentInstrumentValues]);

  const attemptSubmit = async () => {
    setSubmitAttempted(true);

    if (paymentMethodIsValid) {
      if (!forceDefault) {
        setPaymentInstrumentOptions({
          canSave: true,
          isDefault: isDefaultSelected
        });
      }
      try {
        set3DS1RedirectUrl(threeDSPaymentInstrumentRedirectUrl);
        await createPaymentInstrument(paymentMethodData);
        if (!isProcessing3DSPaymentInstrument) {
          history.push(getPaymentMethodsNavItem().url);
        }
      } catch (e) {
        setSubmitAttempted(false);
      }
    }
  };

  const updatePaymentMethod = (data, isValid) => {
    setPaymentMethodData(data);
    setPaymentMethodIsValid(isValid);
  };

  const handleClickCancel = () => {
    history.goBack();
  };

  const handleChangeDefault = (event) => {
    const { target: { checked } } = event;

    checked ?
      localStorageWrite(MAKE_CARD_DEFAULT, checked):
      localStorageRemove(MAKE_CARD_DEFAULT);
    setIsDefaultSelected(checked);
  };

  return (
    <PageContent className="c-loading-indicator-containment">
      <LoadingIndicator isLoading={submitAttempted} />
      <Main>
        {apiFault && (
          <Notice
            apiFault={apiFault}
            className="c-with-standard-size--large"
            type="error"
            heading={apiFault.translatedMessage}
          />
        )}
        <div className="c-add-payment-information__section">
          <Heading category="brand" tone="normal">{t(LocaleKeys.NAVIGATOR.ADD_PAYMENT_INSTRUMENT)}</Heading>
        </div>
        <div className="c-add-payment-information__section">
          <Paragraph category="minor" tone="normal">{t(LocaleKeys.PAYMENT_METHODS.INTRO_COPY_LOGGEDIN)}</Paragraph>
        </div>
        <PaymentMethodForm onChange={updatePaymentMethod} forceDefault={forceDefault} />
        {!forceDefault && (
          <InputField
            input={(
              <Checkbox
                id="Default"
                name="Default"
                className="c-add-payment-method__default-checkbox"
                labelClassName="c-add-payment-method__default-checkbox-label"
                checked={isDefaultSelected}
                onChange={handleChangeDefault}
              >
                {t(LocaleKeys.PAYMENT_METHODS.SET_AS_DEFAULT)}
              </Checkbox>
            )}
          />
        )}
        <div className="c-add-payment-method__button-wrapper">
          <OutlineButton className="c-add-payment-method__button c-button-double" onClick={handleClickCancel}>{t(LocaleKeys.CANCEL)}</OutlineButton>
          <FilledButton className="c-add-payment-method__button c-button-double" onClick={attemptSubmit}>{t(LocaleKeys.ADD)}</FilledButton>
        </div>
      </Main>
    </PageContent>
  );
};

AddPaymentMethod.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Action used to submit form values to create a payment instrument */
  createPaymentInstrument: PropTypes.func.isRequired,
  /** Returns the current default payment instrument */
  defaultPaymentInstrument: PropTypes.object,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Identifies if a 3DS payment is being processed */
  isProcessing3DSPaymentInstrument: PropTypes.bool,
  /** Payment methods */
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    ECheck: PropTypes.shape({
      AccountNumber: PropTypes.string.isRequired,
      RoutingNumber: PropTypes.string.isRequired
    }),
    CreditCard: PropTypes.shape({
      AccountNumber: PropTypes.string.isRequired,
      ExpirationMonth: PropTypes.string.isRequired,
      ExpirationYear: PropTypes.string.isRequired,
      Type: PropTypes.number.isRequired
    })
  })).isRequired,
  /** Sets the url that Adyen will redirect to after 3DS authorization */
  set3DS1RedirectUrl: PropTypes.func.isRequired,
  /** Sets whether payment instrument can be saved */
  setPaymentInstrumentOptions: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The create payment redirect URL for 3DS cards. */
  threeDSPaymentInstrumentRedirectUrl: PropTypes.string,
  /** Action used to set the payment instrument values */
  updatePaymentInstrumentValues: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(AddPaymentMethod);
