import { SubscriberIsLoaded } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OpenLoginModal } from '../../redux/login/login.actions';
import { IsRunningMobile } from '../../redux/site/site.selectors';
import Footer from './footer';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: SubscriberIsLoaded,
  isRunningMobile: IsRunningMobile
});

const mapActionsToProps = {
  openLoginModal: OpenLoginModal
};

export default connect(mapStateToProps, mapActionsToProps)(Footer);
