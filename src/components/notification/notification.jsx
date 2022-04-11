import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import Button from 'selfcare-ui/src/components/button/button';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Card from 'selfcare-ui/src/components/card/card';
import Container from 'selfcare-ui/src/components/container/container';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import IconClose from 'selfcare-ui/src/icons/react-icons/close';
import './notification.scss';

const Notification = ({ className, ctaLabel, ctaLink, ctaLabel1, ctaLink1, description, history, onClose, ...props }) => (
  <Card className={classNames('c-notification', className)} {...props}>
    <Container className="c-notification__main">
      <div className="c-notification__content">
        <div className="c-notification__messaging">
          <div className="c-notification__heading">
            {<Button className="unset-button-min-width" onClick={onClose}><IconClose className="c-notification__close-icon" /></Button>}
          </div>
          <Paragraph className="c-notification__description">{description}</Paragraph>
          {ctaLink && ctaLink1 ?
            (
              <div>
                <OutlineButton
                  className="c-notification__action c-button-double"
                  onClick={() => {
                    return ctaLink.startsWith('http') ? window.open(ctaLink) : history.push(ctaLink);
                  }}
                >
                  {ctaLabel}
                </OutlineButton>
                <FilledButton
                  className="c-notification__action c-button-double"
                  onClick={() => {
                    return ctaLink1.startsWith('http') ? window.open(ctaLink1) : history.push(ctaLink1);
                  }}
                >
                  {ctaLabel1}
                </FilledButton>
              </div>
            ) : ((ctaLink || ctaLink1) && (
              <div className="c-notification__action__wrapper">
                <FilledButton
                  className="c-notification__action"
                  onClick={() => {
                    return (ctaLink.startsWith('http') ? window.open(ctaLink) : history.push(ctaLink)) || (ctaLink1.startsWith('http') ? window.open(ctaLink1) : history.push(ctaLink1));
                  }}
                  width="flex"
                >
                  {ctaLabel || ctaLabel1}
                </FilledButton>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  </Card>
);

Notification.displayName = 'Notification';
Notification.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Text to appear on the button to the right on the notification. */
  ctaLabel: PropTypes.string,
  /** Link to go to when action is clicked. */
  ctaLink: (props) => {
    if (typeof props.onButtonClick === 'function' && typeof props.buttonText !== 'string') {
      return new Error('buttonText is required when onButtonClick is defined.');
    }
  },
  /** Text to appear on the button to the right on the notification. */
  ctaLabel1: PropTypes.string,
  /** Link to go to when action is clicked. */
  ctaLink1: (props) => {
    if (typeof props.onButtonClick === 'function' && typeof props.buttonText !== 'string') {
      return new Error('buttonText is required when onButtonClick is defined.');
    }
  },
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
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** ID value for key purposes */
  id: PropTypes.string.isRequired,
  /** Title for the notification. */
  title: PropTypes.string.isRequired,
  /** Priority of message */
  priority: PropTypes.number,
  /** The close function callback for handling the `X` being clicked */
  onClose: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(Notification);
