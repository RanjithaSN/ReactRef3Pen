import { RequestDetails } from '@selfcare/core/redux/supportRequest/support.request.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SupportRequestDetailsHeader from './support.request.details.header';

const mapStateToProps = createStructuredSelector({
  requestDetails: RequestDetails
});
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(SupportRequestDetailsHeader);
