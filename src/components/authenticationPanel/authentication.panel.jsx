import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Card from 'selfcare-ui/src/components/card/card';
import Heading from 'selfcare-ui/src/components/heading/heading';
import './authentication.panel.scss';


const AuthenticationPanel = (props) => (
  <div className={classNames('c-authenticationPanel', props.className)}>
    <Card
      appearance="seamless"
      className={classNames('c-authenticationPanel-card', {
        'c-authenticationPanel-card__no-padding': props.removePadding
      })}
    >
      {props.notification &&
                (
                  <div className="c-authenticationPanel-bannerNotification">
                    {props.notification}
                  </div>
                )
      }
      {props.heading && (
        <Heading category="brand" className="c-authenticationPanel-heading">{props.heading}</Heading>
      )}
      {props.message &&
                (
                  <div className="c-authenticationPanel-bannerMessage">
                    {props.message}
                  </div>
                )
      }
      <div className="c-authenticationPanel-content">
        {props.children}
      </div>
    </Card>
  </div>
);

AuthenticationPanel.displayName = 'AuthenticationPanel';
AuthenticationPanel.propTypes = {
  /** Any children elements passed will be included below the heading, icon and message. */
  children: PropTypes.node.isRequired,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** The main heading of the panel */
  heading: PropTypes.string,
  /** If a message is specified, it will be placed below the heading and icon, but above the content. */
  message: PropTypes.string,
  /** If a notification is specified, it will be placed above the heading. */
  notification: PropTypes.node,
  /** Boolean to determine if we want padding around this panel */
  removePadding: PropTypes.bool
};

export default AuthenticationPanel;
