import { CloseSession } from '@selfcare/core/redux/session/session.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IsRunningMobile } from '../../redux/site/site.selectors';
import Logout from './logout';

const mapStateToProps = createStructuredSelector({
  isRunningMobile: IsRunningMobile
});

const mapActionsToProps = {
  closeSession: CloseSession
};

export default connect(mapStateToProps, mapActionsToProps)(Logout);
