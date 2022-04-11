import { connect } from 'react-redux';
import { CloseLoginModal } from '../../../redux/login/login.actions';
import LoginModal from './login.modal';

const mapActionsToProps = {
  closeModal: CloseLoginModal
};

export default connect(null, mapActionsToProps)(LoginModal);
