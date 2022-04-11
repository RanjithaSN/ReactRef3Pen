import { ADYEN_ORIGIN_KEY, ENVIRONMENT } from '../../../constants/payment.instrument.constants';
import LocaleKeys from '../../../locales/keys';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import './payment.method.form.scss';

const BRAND_DEFAULT_LOGO = 'https://checkoutshopper-test.adyen.com/checkoutshopper/images/logos/nocard.svg';
const FIELD_NAME = {
  CARD_NUMBER: 'encryptedCardNumber',
  CARD_EXPIRY: 'encryptedExpiryDate',
  CARD_CVV: 'encryptedSecurityCode'
};
const FIELD_STAUS = {
  DEFAULT: 'default',
  FILLED: 'filled',
  FOCUSED: 'focused'
};
const FIELD_INFO = {
  CARD_NUMBER: '1234 5678 9012 3456',
  CARD_EXPIRY: 'MM/YY',
  CARD_CVV: 'CVV/CVC'
};

const useScript = (src) => {
  const [status, setStatus] = useState(src ? 'loading' : 'idle');

  useEffect(
    () => {
      if (!src) {
        setStatus('idle');
        return;
      }

      let script = document.querySelector(`script[src="${src}"]`);

      if (!script) {
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        document.body.appendChild(script);

        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            'data-status',
            event.type === 'load' ? 'ready' : 'error'
          );
        };

        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        setStatus(script.getAttribute('data-status'));
      }

      const setStateFromEvent = (event) => {
        setStatus(event.type === 'load' ? 'ready' : 'error');
      };

      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);

      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src]
  );

  return status;
};

const PaymentMethodForm = ({ forceDefault, lng, onChange, t }) => {
  const [adyenLoaded, setAdyenLoaded] = useState(false);
  const [brandLogo, setBrandLogo] = useState(BRAND_DEFAULT_LOGO);
  const [cardNumberFocus, setNumberFocus] = useState(FIELD_STAUS.DEFAULT);
  const [cardNumberError, setNumberError] = useState(null);
  const [cardExpFocus, setExpFocus] = useState(FIELD_STAUS.DEFAULT);
  const [cardExpError, setExpError] = useState(null);
  const [cardCvvFocus, setCvvFocus] = useState(FIELD_STAUS.DEFAULT);
  const [cardCvvError, setCvvError] = useState(null);

  const status = useScript(
    `https://checkoutshopper-${ENVIRONMENT}.adyen.com/checkoutshopper/sdk/3.13.0/adyen.js`
  );

  const onFocusField = (event) => {
    switch (event.fieldType) {
    case FIELD_NAME.CARD_NUMBER:
      if (!event.focus) {
        if (event.numChars > 0) {
          return setNumberFocus(FIELD_STAUS.FILLED);
        }
        return setNumberFocus(FIELD_STAUS.DEFAULT);
      }
      return setNumberFocus(FIELD_STAUS.FOCUSED);
    case FIELD_NAME.CARD_EXPIRY:
      if (!event.focus) {
        if (event.numChars > 0) {
          return setExpFocus(FIELD_STAUS.FILLED);
        }
        return setExpFocus(FIELD_STAUS.DEFAULT);
      }
      return setExpFocus(FIELD_STAUS.FOCUSED);
    case FIELD_NAME.CARD_CVV:
      if (!event.focus) {
        if (event.numChars > 0) {
          return setCvvFocus(FIELD_STAUS.FILLED);
        }
        return setCvvFocus(FIELD_STAUS.DEFAULT);
      }
      return setCvvFocus(FIELD_STAUS.FOCUSED);
    default:
      return null;
    }
  };

  const onError = (event) => {
    switch (event.fieldType) {
    case FIELD_NAME.CARD_NUMBER:
      return setNumberError(event.i18n);
    case FIELD_NAME.CARD_EXPIRY:
      return setExpError(event.i18n);
    case FIELD_NAME.CARD_CVV:
      return setCvvError(event.i18n);
    default:
      return null;
    }
  };
  useEffect(() => {
    if (status === 'ready' && !adyenLoaded) {
      const configuration = {
        locale: lng,
        environment: ENVIRONMENT,
        originKey: ADYEN_ORIGIN_KEY,
        paymentMethodsResponse: {
          details: [{
            name: 'Credit Card',
            type: 'scheme'
          }],
          groupTypes: ['mc', 'visa']
        }
      };
      new window.AdyenCheckout(configuration)
        .create('securedfields', {
          type: 'card',
          showBrandIcon: true,
          brands: ['mc', 'visa'],
          styles: {
            base: {
              fontSize: '.9375rem'
            },
            placeholder: {
              color: 'transparent',
              caretColor: 'black'
            }
          },
          ariaLabels: {
            lang: 'en-GB',
            encryptedCardNumber: {
              label: 'Credit or debit card number field'
            }
          },
          onBrand: (brand) => {
            setBrandLogo(brand.brandImageUrl);
          },
          onError: (event) => {
            onError(event);
          },
          onFocus: (event) => {
            onFocusField(event);
          },
          onChange: (state) => {
            onChange(state.data, state.isValid);
          }
        })
        .mount('#c-payment-method-form__adyen-card');
      setAdyenLoaded(true);
    }
  }, [status, adyenLoaded, lng, onChange]);

  return (
    <div className="c-payment-method-form">
      <LoadingIndicator isLoading={!adyenLoaded} />
      <div className="c-payment-method-form__section">
        <div id="c-payment-method-form__adyen-card">
          <label
            className={classNames('c-payment-method-form__card-field',
              `c-payment-method-form__card-field--${cardNumberFocus}`, {
                'c-payment-method-form__card-field--error': cardNumberError
              })}
            htmlFor="encryptedCardNumber"
          >
            <span className={classNames('c-payment-method-form__card-field__label')}>{t(LocaleKeys.PAYMENT_INSTRUMENT.FORM.CARD_NUMBER)}</span>
            <span data-cse="encryptedCardNumber" className="c-payment-method-form__card-field__input" />
            <div className="c-payment-method-form__card-field__info">
              <Heading tone="quiet">{FIELD_INFO.CARD_NUMBER}</Heading>
              <img alt="card" className="c-payment-method-form__brand-logo" src={brandLogo} />
            </div>
            {cardNumberError && (<div className="c-payment-method-form__card-field__error-text">{cardNumberError}</div>)}
          </label>
          <div className="c-payment-method-form__expiry-cvv">
            <label
              className={classNames('c-payment-method-form__card-field', 'c-payment-method-form__expiry-cvv--first', `c-payment-method-form__card-field--${cardExpFocus}`, {
                'c-payment-method-form__card-field--error': cardExpError
              })}
              htmlFor="encryptedExpiryDate"
            >
              <span className="c-payment-method-form__card-field__label">{t(LocaleKeys.PAYMENT_INSTRUMENT.FORM.EXPIRATION)}</span>
              <span data-cse="encryptedExpiryDate" className="c-payment-method-form__card-field__input" />
              <div className="c-payment-method-form__card-field__info"><Heading tone="quiet">{FIELD_INFO.CARD_EXPIRY}</Heading></div>
              {cardExpError && (<div className="c-payment-method-form__card-field__error-text">{cardExpError}</div>)}
            </label>
            <label
              className={classNames('c-payment-method-form__card-field', 'c-payment-method-form__expiry-cvv--last', `c-payment-method-form__card-field--${cardCvvFocus}`, {
                'c-payment-method-form__card-field--error': cardCvvError
              })}
              htmlFor="encryptedSecurityCode"
            >
              <span className="c-payment-method-form__card-field__label">{t(LocaleKeys.PAYMENT_INSTRUMENT.FORM.CVV)}</span>
              <span data-cse="encryptedSecurityCode" className="c-payment-method-form__card-field__input" />
              <div className="c-payment-method-form__card-field__info"><Heading tone="quiet">{FIELD_INFO.CARD_CVV}</Heading></div>
              {cardCvvError && (<div className="c-payment-method-form__card-field__error-text">{cardCvvError}</div>)}
            </label>
          </div>

        </div>
      </div>
      {forceDefault && (
        <div className="c-payment-method-form__section__notice">
          <Heading category="minor" tone="normal">{t(LocaleKeys.PAYMENT_METHODS.YOUR_DEFAULT)}</Heading>
        </div>
      )}
    </div>
  );
};

PaymentMethodForm.displayName = 'PaymentMethodForm';
PaymentMethodForm.propTypes = {
  /** with this card have to be the default payment method for this subscriber */
  forceDefault: PropTypes.bool,
  /* Passed in from I18n */
  lng: PropTypes.string.isRequired,
  /* Callback returns data when payment form is valid */
  onChange: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export const PaymentMethodFormWithLocalization = PaymentMethodForm;
export default withI18n()(PaymentMethodFormWithLocalization);
