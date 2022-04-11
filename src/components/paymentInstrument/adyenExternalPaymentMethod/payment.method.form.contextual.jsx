import PaymentMethodForm from './payment.method.form';
import { SetData } from '../../../redux/inAccountHelp/in.accounthelp.actions';
import { connect } from 'react-redux';

const mapActionsToProps = {
  setData: SetData
};

export default connect(mapActionsToProps)(PaymentMethodForm);
