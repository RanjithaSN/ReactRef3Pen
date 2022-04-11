import PropTypes from 'prop-types';
import React from 'react';
import './chat.button.scss';

const ChatButton = ({ unauthenticated }) => {
  return unauthenticated ?
    (<div id="LP_DIV_REVOKED" className="c-troubleshooter__chat-button" />) :
    (<div id="LP_DIV_1573633851326" className="c-troubleshooter__chat-button" />);
};

ChatButton.propTypes = {
  /** Whether or not this 'button' is for unauthenticated or authenticated */
  unauthenticated: PropTypes.bool
};
export default ChatButton;
