import { SubscriberIsLoaded } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UpdateShouldShowSessionExpiration } from '../../redux/login/login.actions';
import { ShouldShowSessionExpiration } from '../../redux/login/login.selectors';
import { UpdateShouldShowCookieInfo, UpdateShouldShowGetHelpOverlay } from '../../redux/site/site.actions';
import { ShouldShowCookieInfo, ShouldShowGetHelpOverlay } from '../../redux/site/site.selectors';
import PageLayout from './page.layout';


const mapStateToProps = createStructuredSelector({
  isLoggedIn: SubscriberIsLoaded,
  shouldShowCookieInfo: ShouldShowCookieInfo,
  shouldShowGetHelpOverlay: ShouldShowGetHelpOverlay,
  shouldShowSessionExpiration: ShouldShowSessionExpiration
});
const mapActionsToProps = {
  updateShouldShowCookieInfo: UpdateShouldShowCookieInfo,
  updateShouldShowExpiration: UpdateShouldShowSessionExpiration,
  updateShouldShowGetHelpOverlay: UpdateShouldShowGetHelpOverlay
};

export default connect(mapStateToProps, mapActionsToProps)(PageLayout);
