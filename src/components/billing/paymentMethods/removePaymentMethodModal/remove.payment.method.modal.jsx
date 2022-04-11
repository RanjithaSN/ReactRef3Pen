import PropTypes from 'prop-types';
import identity from 'ramda/src/identity';
import memoize from 'ramda/src/memoizeWith';
import path from 'ramda/src/path';
import React from 'react';
import { withI18n } from 'react-i18next';
import { apiFaultPropTypes } from 'selfcare-core/src/constants/api.fault.prop.types';
import Card, { CardBody, CardHeader } from 'selfcare-ui/src/components/card/card';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Modal, { ModalButtons } from 'selfcare-ui/src/components/modal/modal';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import Radio from 'selfcare-ui/src/components/radio/radio';
import { generateDescriptor, isExpired } from '../../../../helpers/payment.instrument.helpers';
import LocaleKeys from '../../../../locales/keys';
import PaymentInstrumentCard from '../../../paymentInstrument/paymentInstrumentCard/payment.instrument.card.contextual';
import './remove.payment.method.modal.scss';


class RemovePaymentMethodModal extends React.Component {
    getEligiblePaymentMethods = memoize(identity, (paymentMethod, paymentMethods) => {
      return paymentMethods.filter((pm) => {
        return pm.Id !== paymentMethod.Id && (!pm.CreditCard || !isExpired(pm));
      });
    });

    state = {
      selectedId: path([0, 'Id'], this.eligiblePaymentMethods),
      removeAttempted: false,
      switchingDefaultMethod: false
    };

    get eligiblePaymentMethods() {
      const { paymentMethod, paymentMethods } = this.props;
      return this.getEligiblePaymentMethods(paymentMethod, paymentMethods);
    }

    get showSelection() {
      return ((this.props.paymentMethod.Default && Boolean(this.eligiblePaymentMethods.length)) || this.state.switchingDefaultMethod);
    }

    get descriptionKey() {
      const { paymentMethod } = this.props;
      const { switchingDefaultMethod } = this.state;
      const descriptions = LocaleKeys.PAYMENT_METHODS.REMOVE_DESCRIPTION;

      if (paymentMethod.Default || switchingDefaultMethod) {
        return descriptions.DEFAULT;
      }
      return descriptions.BASIC;
    }

    removePaymentInstrument = async () => {
      const { onRemoveSuccess, paymentMethod, paymentMethods, removePaymentInstrument, updatePaymentInstrument } = this.props;
      const { selectedId } = this.state;

      const selectedPaymentMethod = paymentMethods.find((pm) => pm.Id === selectedId);
      if (selectedPaymentMethod) {
        const updatedPaymentMethod = selectedPaymentMethod
          .update('Default', (isDefault) => isDefault || paymentMethod.Default);

        if (updatedPaymentMethod.Default && this.showSelection) {
          this.setState({
            switchingDefaultMethod: true
          });
          await updatePaymentInstrument(updatedPaymentMethod);
        }
      }

      this.setState({
        removeAttempted: true
      });
      try {
        await removePaymentInstrument(paymentMethod.Id);
        onRemoveSuccess();
      } catch (e) {
        this.setState({
          removeAttempted: false
        });
        this.props.onCancel();
      }
    };

    onSelectedIdChange = (event) => {
      this.setState({
        selectedId: Number(event.target.id)
      });
    };

    render() {
      const { apiFault, creditCardTypes, isUpdatingPaymentInstrument, onCancel, paymentMethod, t } = this.props;
      const { removeAttempted, selectedId } = this.state;

      if (!this.eligiblePaymentMethods.length) {
        return (
          <Modal
            appearance="seamless"
            size="small"
            heading={t(LocaleKeys.PAYMENT_METHODS.REMOVAL_FAILURE)}
            onClose={onCancel}
            buttons={(
              <ModalButtons
                secondaryAction={onCancel}
                secondaryText={t(LocaleKeys.PROMPT.CANCEL)}
              />
            )}
            content={(
              <Paragraph>
                {t(this.descriptionKey)}
              </Paragraph>
            )}
            footerVariant="auto"
          />
        );
      }

      return (
        <React.Fragment>
          <LoadingIndicator isLoading={isUpdatingPaymentInstrument || removeAttempted} />
          <Modal
            appearance="seamless"
            className="c-loading-indicator-containment"
            size={this.showSelection ? 'medium' : 'small'}
            headingClassName="c-remove-payment-method-modal__header"
            heading={t(LocaleKeys.PAYMENT_METHODS.REMOVE_TITLE, {
              descriptor: generateDescriptor(paymentMethod, creditCardTypes)
            })}
            onClose={onCancel}
            buttons={(
              <ModalButtons
                primaryAction={this.removePaymentInstrument}
                primaryText={t(LocaleKeys.PROMPT.CONFIRM)}
                secondaryAction={onCancel}
                secondaryText={t(LocaleKeys.PROMPT.CANCEL)}
              />
            )}
            contentClassName="c-remove-payment-method-modal__content"
            content={this.showSelection ?
              (
                <React.Fragment>
                  {apiFault && <Notice apiFault={apiFault} type="error" heading={apiFault.translatedMessage} />}
                  <Paragraph>
                    {t(`${this.descriptionKey}_with_selection`)}
                  </Paragraph>
                  <Card className="c-remove-payment-method-modal__radio-card" appearance="seamless">
                    <CardHeader appearance="seamless" className="c-remove-payment-method-modal__card-header">
                      <Heading category="major" tone="normal">
                        {t(LocaleKeys.PAYMENT_METHODS.AVAILABLE_PAYMENT_METHODS)}
                      </Heading>
                    </CardHeader>
                    <CardBody className="c-remove-payment-method-modal__card-body">
                      {this.eligiblePaymentMethods.map((pm) => (
                        <Radio
                          key={pm.Id}
                          id={`${pm.Id}`}
                          name="selectedId"
                          onChange={this.onSelectedIdChange}
                          checked={pm.Id === selectedId}
                        >
                          <PaymentInstrumentCard appearance="seamless" instrument={pm} />
                        </Radio>
                      ))}
                    </CardBody>
                  </Card>
                </React.Fragment>
              ) :
              t(this.descriptionKey)
            }
            footerVariant="auto"
          />
        </React.Fragment>
      );
    }
}

const paymentMethodShape = PropTypes.shape({
  Id: PropTypes.number.isRequired,
  Name: PropTypes.string.isRequired,
  Default: PropTypes.bool,
  ConvergentBillerPaymentInstrumentAccounts: PropTypes.arrayOf(PropTypes.shape({
    AutoPay: PropTypes.bool,
    AccountNumber: PropTypes.string
  })),
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
});

RemovePaymentMethodModal.displayName = 'RemovePaymentMethodModal';
RemovePaymentMethodModal.propTypes = {
  /** Application fault */
  apiFault: apiFaultPropTypes,
  /** Supported credit card types */
  creditCardTypes: PropTypes.arrayOf(PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Value: PropTypes.number.isRequired
  })).isRequired,
  /** Whether a payment instrument is being set as default */
  isUpdatingPaymentInstrument: PropTypes.bool.isRequired,
  /** Function invoked when close/cancel is clicked */
  onCancel: PropTypes.func.isRequired,
  /** Function invoked when payment method is successfully removed */
  onRemoveSuccess: PropTypes.func.isRequired,
  /** ID of the payment method to remove */
  paymentMethod: paymentMethodShape.isRequired,
  /** Payment methods */
  paymentMethods: PropTypes.arrayOf(paymentMethodShape).isRequired,
  /** Action used to remove this payment instrument */
  removePaymentInstrument: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Action used to set a new payment instrument as default */
  updatePaymentInstrument: PropTypes.func.isRequired
};

export default withI18n()(RemovePaymentMethodModal);
