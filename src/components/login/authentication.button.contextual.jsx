import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OpenLoginModal } from '../../redux/login/login.actions';
import { NonProspectIsLoggedIn } from '../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import AuthenticationButton from './authentication.button';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: NonProspectIsLoggedIn
});
const mapActionsToProps = {
  openModal: OpenLoginModal
};

export default connect(mapStateToProps, mapActionsToProps)(AuthenticationButton);
