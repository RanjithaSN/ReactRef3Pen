import { Subscriber } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Troubleshooter from './troubleshooter';
import { PushToHistory } from '../../../redux/troubleshooter/troubleshooter.actions';
import { GetHistory } from '../../../redux/troubleshooter/troubleshooter.selectors';
import { SetContextPageData } from '../../../redux/inAccountHelp/in.accounthelp.actions';

const mapStateToProps = createStructuredSelector({
  troubleshooterHistory: GetHistory,
  subscriber: Subscriber
});

const mapActionsToProps = {
  pushToHistory: PushToHistory,
  setContextPageData: SetContextPageData
};
export default connect(mapStateToProps, mapActionsToProps)(Troubleshooter);
