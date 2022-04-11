import LandingPageBase from './landing.page.base';
import { ShouldScroll, ScrollPosition } from '../../redux/site/site.selectors';
import { SetScroll } from '../../redux/site/site.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  shouldScroll: ShouldScroll,
  scrollPosition: ScrollPosition
});
const mapActionsToProps = {
  setScroll: SetScroll
};

export default connect(mapStateToProps, mapActionsToProps)(LandingPageBase);
