import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { GeneratePassword } from '@selfcare/core/redux/passwordManagement/password.management.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UpdateUserId } from '../../redux/forgotPassword/forgot.password.actions';
import { IsSendingEmail, UserId } from '../../redux/forgotPassword/forgot.password.selectors';
import ForgotPassword from './forgot.password';


const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  sendingEmailLoadingIndicator: IsSendingEmail,
  userId: UserId
});

const mapActionsToProps = {
  resetPassword: GeneratePassword,
  updateUserId: UpdateUserId
};

export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);
