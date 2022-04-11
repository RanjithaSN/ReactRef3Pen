import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NonProspectIsLoggedIn } from '../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import { HasPennyPlayProduct } from '../../redux/products/products.selectors';
import { UpdateShouldShowOTTGuidedExperience } from '../../redux/site/site.actions';
import { IsRunningMobile } from '../../redux/site/site.selectors';
import Header from './header';

const mapStateToProps = createStructuredSelector({
  hasPennyPlayProduct: HasPennyPlayProduct,
  isLoggedIn: NonProspectIsLoggedIn,
  isRunningMobile: IsRunningMobile
});

const mapActionsToProps = {
  updateShouldShowOTTGuidedExperience: UpdateShouldShowOTTGuidedExperience
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
