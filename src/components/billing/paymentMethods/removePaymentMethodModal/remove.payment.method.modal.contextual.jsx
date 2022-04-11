import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RemovePaymentInstrument, UpdatePaymentInstrument } from '@selfcare/core/redux/paymentInstrument/payment.instrument.actions';
import { PaymentInstrumentIsUpdating, SupportedCreditCardTypes, SupportedPaymentInstruments } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RemovePaymentMethodModal from './remove.payment.method.modal';


const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  creditCardTypes: SupportedCreditCardTypes,
  isUpdatingPaymentInstrument: PaymentInstrumentIsUpdating,
  paymentMethods: SupportedPaymentInstruments
});
const mapActionsToProps = {
  removePaymentInstrument: RemovePaymentInstrument,
  updatePaymentInstrument: UpdatePaymentInstrument
};

export default connect(mapStateToProps, mapActionsToProps)(RemovePaymentMethodModal);
