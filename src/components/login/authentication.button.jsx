import i18next from 'i18next';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withRouter } from 'react-router';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import LocaleKeys from '../../locales/keys';

const AuthenticationButton = ({ history, isLoggedIn, openModal }) => {
  const handleClick = () => {
    if (isLoggedIn) {
      history.push('/logout');
    } else {
      openModal();
    }
  };

  return (
    <OutlineButton
      onMouseDown={handleClick}
      variant="inverted"
      className="unset-button-min-width"
    >
      {isLoggedIn ? i18next.t(LocaleKeys.HEADER_CONTENT.LOGOUT_LABEL) : i18next.t(LocaleKeys.HEADER_CONTENT.LOGIN_LABEL)}
    </OutlineButton>
  );
};

AuthenticationButton.propTypes = {
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** function to open the login modal */
  openModal: PropTypes.func.isRequired,
  /** Bool if the subscriber is logged in */
  isLoggedIn: PropTypes.bool.isRequired
};

export default compose(withRouter)(AuthenticationButton);
