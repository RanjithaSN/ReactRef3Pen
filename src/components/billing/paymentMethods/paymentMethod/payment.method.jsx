import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { isExpired } from '../../../../helpers/payment.instrument.helpers';
import PaymentInstrumentCard from '../../../paymentInstrument/paymentInstrumentCard/payment.instrument.card.contextual';
import './payment.method.scss';

class PaymentMethod extends React.Component {
    showEditForm = () => {
      const { paymentMethod, initializeEditForm, onShowEditForm } = this.props;

      const formValues = {
        ...(paymentMethod.CreditCard || paymentMethod.ECheck || paymentMethod.ExternalBill),
        Default: paymentMethod.Default
      };
      if (isExpired(paymentMethod)) {
        formValues.ExpirationMonth = null;
        formValues.ExpirationYear = null;
      }
      initializeEditForm(paymentMethod.Type, formValues, (paymentMethod.BillingAddress ? paymentMethod.BillingAddress.Id : undefined));
      onShowEditForm(paymentMethod.Id);
    };


    render() {
      const { paymentMethod } = this.props;

      return (
        <React.Fragment>
          <PaymentInstrumentCard
            instrument={paymentMethod}
            onSelect={this.showEditForm}
          />
        </React.Fragment>
      );
    }
}

PaymentMethod.displayName = 'PaymentMethod';
PaymentMethod.propTypes = {
  /** Action used to initialize the payment instrument edit form values in the store */
  initializeEditForm: PropTypes.func.isRequired,
  /** Callback invoked when the edit menu option is selected */
  onShowEditForm: PropTypes.func.isRequired,
  /** Payment method */
  paymentMethod: PropTypes.shape({
    /** Billing Address */
    BillingAddress: PropTypes.shape({
      /** Billing Address Id */
      Id: PropTypes.number
    }),
    /** Credit card information */
    CreditCard: PropTypes.shape({
      AccountNumber: PropTypes.string.isRequired,
      ExpirationMonth: PropTypes.string.isRequired,
      ExpirationYear: PropTypes.string.isRequired,
      Type: PropTypes.number.isRequired
    }),
    /** Default payment */
    Default: PropTypes.bool,
    /** Id */
    Id: PropTypes.number.isRequired,
    /** Name on card */
    Name: PropTypes.string.isRequired,
    /** E Check payment type */
    ECheck: PropTypes.shape({
      /** Account number */
      AccountNumber: PropTypes.string.isRequired,
      /** Routing nu */
      RoutingNumber: PropTypes.string.isRequired
    }),
    /** E Check payment type */
    ExternalBill: PropTypes.shape({
      AccountNumber: PropTypes.string,
      ExpirationMonth: PropTypes.string,
      ExpirationYear: PropTypes.string,
      ExternalBillData: PropTypes.string,
      NameOnAccount: PropTypes.string,
      Type: PropTypes.number
    }),
    /** Payment method type */
    Type: PropTypes.number

  }).isRequired
};

export default withI18n()(PaymentMethod);
