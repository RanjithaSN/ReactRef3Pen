import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Card, { CardBody } from 'selfcare-ui/src/components/card/card';
import ExpandableCard from 'selfcare-ui/src/components/expandableCard/expandable.card';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import Tag from 'selfcare-ui/src/components/tag/tag';
import { onEnter } from 'selfcare-ui/src/utilities/keyboard.helper';
import LocaleKeys from '../../../locales/keys';
import { getPaymentMethodsNavItem } from '../../../navigation/sitemap.selectors';
import PaymentMethodForm from '../adyenExternalPaymentMethod/payment.method.form';
import ExternalInstrumentInfo from '../paymentInstrumentCard/external.instrument.info';
import './payment.selector.scss';

const PaymentSelector = ({ allowAdd, className, history, instruments, locked, onChange, saveMethod, selectedInstrument, t, selectedLocale }) => {
  const [openNew, setOpenNew] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [resetExpandableCard, setResetExpandableCard] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (selectedInstrument && selectedInstrument.Id && !selectedId) {
      setSelectedId(selectedInstrument.Id);
      onChange(selectedInstrument, true);
    }
    setResetExpandableCard(false);
  }, [selectedInstrument, selectedId, onChange]);

  const handleSelection = (paymentInstrument, newPaymentObj, newPaymentValid) => {
    if (paymentInstrument) {
      setSelectedId(paymentInstrument.Id);
      onChange(paymentInstrument, true);
      const resetCardState = Boolean(saveMethod);
      setResetExpandableCard(resetCardState);
      setOpenConfirmation(resetCardState);
    } else {
      setIsValid(newPaymentValid);
      onChange(newPaymentObj.paymentMethod, newPaymentValid);
    }
  };

  return (
    <div className={classNames('c-payment-selector', className)}>
      {instruments.length ? (
        <React.Fragment>
          <Heading className="c-payment-selector__space" category="major" tone="quiet">
            {t(LocaleKeys.PAYMENT_METHODS.PAYMENT_METHOD)}
          </Heading>
          <ExpandableCard
            className="c-payment-selector__card"
            header={(
              <ExternalInstrumentInfo
                key={selectedId}
                instrument={selectedInstrument || {}}
                locale={selectedLocale}
              />
            )}
            locked={locked}
            hideHeader
            hideToggle={openNew}
            resetToggle={resetExpandableCard}
            contentHeader={t(LocaleKeys.PAYMENT_METHODS.PAYMENT_METHOD_TITLE)}
          >
            {openNew ? (
              <React.Fragment>
                <PaymentMethodForm onChange={(newPaymentObj, newPaymentValid) => handleSelection(undefined, newPaymentObj, newPaymentValid)} forceDefault />
                {(saveMethod) ? (
                  <React.Fragment>
                    <FilledButton
                      disabled={!isValid}
                      onClick={async () => {
                        const saveWorked = await saveMethod();
                        if (saveWorked) {
                          setResetExpandableCard(true);
                          setOpenNew(false);
                        }
                      }}
                    >
                      {t(LocaleKeys.SAVE)}
                    </FilledButton>
                    <OutlineButton className="c-payment-selector__cancel-button" onClick={() => setOpenNew(false)}>{t(LocaleKeys.CANCEL)}</OutlineButton>
                  </React.Fragment>
                ) : (
                  <Link onClick={() => setOpenNew(false)}>{t(LocaleKeys.CANCEL)}</Link>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {instruments.map((instrument) => (
                  <div
                    className="c-payment-instrument-card"
                    onClick={() => !instrument.Default && handleSelection(instrument)}
                    onKeyPress={onEnter(() => handleSelection(instrument))}
                    role="button"
                    tabIndex={0}
                    key={instrument.Id}
                  >
                    <Card
                      className={classNames('c-payment-instrument-card__container', {
                        'c-payment-instrument-card__default': instrument.Default
                      })}
                    >
                      <CardBody className="c-payment-instrument-card__content">
                        <ExternalInstrumentInfo
                          instrument={instrument}
                          locale={selectedLocale}
                          tags={instrument.Default ?
                            [
                              <Tag key="default" className="c-payment-instrument-card__tag" type="info">
                                {t(LocaleKeys.PAYMENT_METHODS.DEFAULT)}
                              </Tag>
                            ] : []}
                        />
                      </CardBody>
                    </Card>

                  </div>

                ))}
                <FilledButton
                  className="c-payment-selector__manage-payments"
                  onClick={() => {
                    if (allowAdd) {
                      setOpenNew(true);
                      setOpenConfirmation(false);
                    } else {
                      history.push(getPaymentMethodsNavItem().url);
                    }
                  }}
                >
                  {allowAdd ?
                    t(LocaleKeys.PAYMENT_METHODS.ADD_NEW) :
                    t(LocaleKeys.PAYMENT_METHODS.MANAGE_PAYMENT_METHODS)}
                </FilledButton>
              </React.Fragment>
            )}
          </ExpandableCard>
          {openConfirmation && (
            <React.Fragment>
              <div className="c-payment-selector__space">{t(LocaleKeys.PAYMENT_METHODS.SWITCH_DEFAULT_CONFIRM)}</div>
              <div className="c-payment-selector__space c-payment-selector__space-wrapper">
                <OutlineButton
                  className="c-button-double c-payment-selector__yesNO"
                  onClick={() => {
                    setOpenConfirmation(false);
                    saveMethod(true);
                  }}
                >
                  {t(LocaleKeys.NO)}
                </OutlineButton>
                <FilledButton
                  className="c-payment-selector__submit-button c-button-double c-payment-selector__yesNO"
                  onClick={() => {
                    setOpenConfirmation(false);
                    saveMethod();
                  }}
                >
                  {t(LocaleKeys.YES)}
                </FilledButton>
              </div>
            </React.Fragment>
          )}
          {locked && (<Paragraph className="c-payment-selector__locked-change-notice">{t(LocaleKeys.PAYMENT_METHODS.LOCKED_CARD_CHANGE)}</Paragraph>)}
        </React.Fragment>
      ) : (
        <PaymentMethodForm onChange={(newPaymentObj, newPaymentValid) => handleSelection(undefined, newPaymentObj, newPaymentValid)} forceDefault />
      )}
    </div>
  );
};

PaymentSelector.displayName = 'PaymentSelector';
PaymentSelector.propTypes = {
  /** Indicates if user can add a payment instrument using the selector */
  allowAdd: PropTypes.bool,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Payment instruments available for selection */
  instruments: PropTypes.arrayOf(PropTypes.shape({
    /** Id of payment method */
    Id: PropTypes.number.isRequired,
    /** Name of payment method */
    Name: PropTypes.string.isRequired
  })).isRequired,
  /** Indicates if user can add/manage payment instruments */
  locked: PropTypes.bool,
  /** The locale with which to render the date. */
  selectedLocale: PropTypes.string.isRequired,
  /** Relay selected payment instrument to parent */
  onChange: PropTypes.func.isRequired,
  /** Method to save new payment instrument as default, if not provided save button will not be shown */
  saveMethod: PropTypes.func,
  /** The currently selected payment instrument */
  selectedInstrument: PropTypes.shape({
    /** Id of payment method */
    Id: PropTypes.number,
    /** Name of payment method */
    Name: PropTypes.string
  }),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};
export default compose(
  withI18n(),
  withRouter
)(PaymentSelector);
