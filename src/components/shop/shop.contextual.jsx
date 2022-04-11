import { UpdateIsBenifyDistributionChannel } from '@selfcare/core/redux/settings/settings.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UserIsAvailable } from '../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import Shop from './shop';

const mapStateToProps = createStructuredSelector({
  isUserAvailable: UserIsAvailable
});

const mapActionsToProps = {
  updateIsBenifyDistributionChannel: UpdateIsBenifyDistributionChannel
};

export default connect(mapStateToProps, mapActionsToProps)(Shop);
