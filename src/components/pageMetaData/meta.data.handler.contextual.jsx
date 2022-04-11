import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IsRunningMobile } from '../../redux/site/site.selectors';
import MetaData from './meta.data.handler';

const mapStateToProps = createStructuredSelector({
  isRunningMobile: IsRunningMobile
});
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(MetaData);
