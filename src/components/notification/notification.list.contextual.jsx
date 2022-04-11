
import { DismissNotifications } from '@selfcare/core/redux/messages/messages.actions';
import { MessagesList } from '@selfcare/core/redux/messages/messages.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NotificationList from './notification.list';

const mapStateToProps = createStructuredSelector({
  notifications: MessagesList
});

const mapActionsToProps = {
  dismissNotifications: DismissNotifications
};
export default connect(mapStateToProps, mapActionsToProps)(NotificationList);
