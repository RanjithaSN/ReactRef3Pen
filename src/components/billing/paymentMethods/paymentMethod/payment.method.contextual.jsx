import { connect } from 'react-redux';
import { InitializeEditForm } from '../../../../redux/paymentInstrument/payment.instrument.form.actions';
import PaymentMethod from './payment.method';

const mapActionsToProps = {
  initializeEditForm: InitializeEditForm
};

export default connect(null, mapActionsToProps)(PaymentMethod);
