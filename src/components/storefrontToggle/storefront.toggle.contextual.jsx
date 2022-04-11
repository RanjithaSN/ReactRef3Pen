import StorefrontToggle from './storefront.toggle';
import { SetScroll } from '../../redux/site/site.actions';
import { connect } from 'react-redux';

const mapActionsToProps = {
  setScroll: SetScroll
};

export default connect(null, mapActionsToProps)(StorefrontToggle);
