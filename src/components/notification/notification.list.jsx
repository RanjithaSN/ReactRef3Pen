import { MESSAGE_PRIORITY } from '@selfcare/core/redux/messages/messages.constants';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Container from 'selfcare-ui/src/components/container/container';
import Notification from './notification';
import './notification.list.scss';

class NotificationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotificationClosed: [],
      counter: 1
    };
  }

    dismissCriticalNotifications = (id) => {
      this.props.dismissNotifications(id);
      this.setState((prevState) => ({
        isNotificationClosed: {
          ...prevState.isNotificationClosed,
          [id]: true
        }
      }));
    };

    dismissOtherNotifications = (id) => {
      this.props.dismissNotifications(id);
      this.setState((prevState) => ({
        isNotificationClosed: {
          ...prevState.isNotificationClosed,
          [id]: true
        },
        counter: prevState.counter + 1
      }));
    };

    render() {
      const { className, notifications } = this.props;
      const criticalNotices = notifications.filter((notification) => {
        return notification.priority === MESSAGE_PRIORITY.CRITICAL;
      });
      const otherNotices = notifications.filter((notification) => {
        return notification.priority !== MESSAGE_PRIORITY.CRITICAL;
      });
      return (
        <Container>
          {!!notifications.length && (
            <div className={classNames('c-notification-list', className)}>
              {criticalNotices.map((notification) => (
                !this.state.isNotificationClosed[notification.id] && <Notification key={notification.id} onClose={() => this.dismissCriticalNotifications(notification.id)} {...notification} />
              ))}
              {otherNotices.slice(0, this.state.counter).map((notification) => (
                !this.state.isNotificationClosed[notification.id] && <Notification key={notification.id} onClose={() => this.dismissOtherNotifications(notification.id)} {...notification} />
              ))}
            </div>
          )}
        </Container>
      );
    }
}

NotificationList.displayName = 'NotificationList';
NotificationList.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** The notifications to be rendered */
  notifications: PropTypes.arrayOf(PropTypes.shape({
    /** Text to appear on the button to the right on the notification. */
    ctaLabel: PropTypes.string,
    /** Link to go to when action is clicked. */
    ctaLink: PropTypes.string,
    /** Text to appear on the button to the right on the notification. */
    ctaLabel1: PropTypes.string,
    /** Link to go to when action is clicked. */
    ctaLink1: PropTypes.string,
    /** Description that appear below the heading. */
    description: (props) => {
      if (props.description !== undefined) {
        if (typeof props.description !== 'string') {
          return new Error('Description must be a string.');
        } if (props.description.length > 140) {
          return new Error('Description can not be more the 140 characters.');
        }
      }
    },
    /** ID value for key purposes */
    id: PropTypes.string.isRequired,
    /** Title for the notification. */
    title: PropTypes.string.isRequired,
    /** Priority of message */
    priority: PropTypes.number
  })),
  /** Action to dismiss notifications. */
  dismissNotifications: PropTypes.func,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};
NotificationList.defaultProps = {
  notifications: []
};

export default withI18n()(NotificationList);
