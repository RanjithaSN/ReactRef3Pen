import { PAYMENT_INSTRUMENT_TYPES } from '@selfcare/core/constants/payment.instrument.constants';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Card, { CardBody } from 'selfcare-ui/src/components/card/card';
import Tag from 'selfcare-ui/src/components/tag/tag';
import { onEnter } from 'selfcare-ui/src/utilities/keyboard.helper';
import LocaleKeys from '../../../locales/keys';
import { generateCreditCardDescriptor } from '../creditCard/credit.card.helper';
import CreditCardInfo from './credit.card.info';
import ExternalInstrumentInfo from './external.instrument.info';
import './payment.instrument.card.scss';
import { LOCALE } from 'selfcare-core/src/redux/utils/api.constants';

const PaymentInstrumentCard = ({ active,
  appearance,
  children,
  className,
  creditCardTypes,
  instrument,
  onSelect,
  selectedLocale,
  t }) => {
  const onClickOrEnter = () => onSelect && onSelect(instrument.Id);

  const isAutoPay = (instrument.ConvergentBillerPaymentInstrumentAccounts || []).some((account) => account.AutoPay);
  const tags = [];

  if (instrument.Default) {
    tags.push(
      <Tag key="default" className="c-payment-instrument-card__tag" type="info">
        {t(LocaleKeys.PAYMENT_METHODS.DEFAULT)}
      </Tag>
    );
  }
  if (isAutoPay) {
    tags.push(
      <Tag key="auto-pay" className="c-payment-instrument-card__tag" type="info">
        {t(LocaleKeys.PAYMENT_METHODS.AUTO_PAY)}
      </Tag>
    );
  }

  let cardContent;
  let ariaLabel;
  switch (instrument.Type) {
  case PAYMENT_INSTRUMENT_TYPES.CREDIT_CARD:
    cardContent = <CreditCardInfo instrument={instrument} tags={tags} creditCardTypes={creditCardTypes} />;
    ariaLabel = generateCreditCardDescriptor(creditCardTypes, instrument);
    break;
  case PAYMENT_INSTRUMENT_TYPES.EXTERNAL_PAYMENT:
    cardContent = <ExternalInstrumentInfo instrument={instrument} locale={selectedLocale} />;
    break;
  default:
    cardContent = null;
    ariaLabel = null;
  }

  return (
    <div
      className={classNames('c-payment-instrument-card', className, {
        'c-payment-instrument-card--active': active,
        'c-payment-instrument-card--selectable': onSelect
      })}
      onClick={onClickOrEnter}
      onKeyPress={onEnter(onClickOrEnter)}
      aria-label={ariaLabel}
      role="button"
      tabIndex={0}
    >
      <Card
        className={classNames('c-payment-instrument-card__container', {
          'c-payment-instrument-card__default': instrument.Default
        })}
        appearance={appearance}
      >
        <CardBody className="c-payment-instrument-card__content">
          {cardContent}
          {children}
        </CardBody>
      </Card>
    </div>
  );
};

PaymentInstrumentCard.displayName = 'PaymentInstrumentCard';
PaymentInstrumentCard.propTypes = {
  /** Whether to render active, highlighted state */
  active: PropTypes.bool,
  /** Conditionally render card borders and shadows */
  appearance: PropTypes.oneOf(['flat', 'seamless']),
  /** Nodes to render to the right of the payment instrument info */
  children: PropTypes.node,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Credit card types loaded from code tables */
  creditCardTypes: PropTypes.arrayOf(PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Value: PropTypes.number.isRequired
  })).isRequired,
  /** Payment instrument to display */
  instrument: PropTypes.shape({
    /** This should be changed */
    ConvergentBillerPaymentInstrumentAccounts: PropTypes.array,
    /** Is payment instrument default */
    Default: PropTypes.bool,
    Id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    /** Credit Card */
    CreditCard: PropTypes.shape({
      AccountNumber: PropTypes.string.isRequired,
      ExpirationMonth: PropTypes.string.isRequired,
      ExpirationYear: PropTypes.string.isRequired,
      Type: PropTypes.number.isRequired
    }),
    ExternalBill: PropTypes.shape({
      AccountNumber: PropTypes.string,
      ExpirationMonth: PropTypes.string,
      ExpirationYear: PropTypes.string,
      ExternalBillData: PropTypes.string,
      NameOnAccount: PropTypes.string,
      Type: PropTypes.number
    }),
    Name: PropTypes.string.isRequired,
    /** Payment instrument type */
    Type: PropTypes.number
  }),
  /** Optionally relay selection event to parent */
  onSelect: PropTypes.func,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The selected locale. */
  selectedLocale: PropTypes.string
};
PaymentInstrumentCard.defaultProps = {
  active: false,
  selectedLocale: LOCALE
};

export const NakedPaymentInstrumentCard = PaymentInstrumentCard;
export default withI18n()(PaymentInstrumentCard);
