import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import LocaleKeys from '../../locales/keys';
import AuthenticationPanel from '../authenticationPanel/authentication.panel';
import ForgotPasswordForm from './forgot.password.form';
import AppConfig from 'AppConfig';

const ForgotPassword = (props) => {
  const [captchaResponse, setReCaptchaResponse] = useState(null);

  const handleResetPassword = async (login) => {
    await props.resetPassword(captchaResponse, login);
    if (JSON.parse(AppConfig.USE_RECAPTCHA)) {
      window.grecaptcha.reset(0);
    }

    if (props.showLogin) {
      props.showLogin();
    } else {
      props.history.push(`/${props.t(LocaleKeys.ROUTES.LOGIN)}`);
    }
  };

  return (
    <div className="c-forgot-password">
      <AuthenticationPanel
        className="c-loading-indicator-containment"
        heading={!props.showLogin ? props.t(LocaleKeys.FORGOT_PASSWORD.FORGOT_PASSWORD_HEADING) : null}
        removePadding={props.fromModal}
      >
        <React.Fragment>
          <LoadingIndicator isLoading={props.sendingEmailLoadingIndicator} />
          <ForgotPasswordForm
            useStackedControls
            apiFault={props.apiFault}
            handleResetPassword={handleResetPassword}
            setReCaptchaResponse={setReCaptchaResponse}
            push={props.history.push}
            resetPassword={props.resetPassword}
            userId={props.userId}
            updateUserId={props.updateUserId}
            showLogin={props.showLogin}
          />
        </React.Fragment>
      </AuthenticationPanel>
    </div>
  );
};

ForgotPassword.displayName = 'ForgotPassword';
ForgotPassword.propTypes = {
  /** A fault object representing an error that occurred attempting to login.  Must have a translatedMessage attribute. */
  apiFault: PropTypes.object,
  /** Boolean indicating if we are surrounded by a modal (which gives us padding) */
  fromModal: PropTypes.bool,
  /** Navigation function used to change the browser url. */
  history: PropTypes.object.isRequired,
  /** Callback which will be executed when a user submits the reset password form. */
  resetPassword: PropTypes.func.isRequired,
  /** The loading indicator will be displayed until email with temporary password is sent. */
  sendingEmailLoadingIndicator: PropTypes.bool.isRequired,
  /** Modal function to show login component */
  showLogin: PropTypes.func,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The user id entered from the login page. */
  userId: PropTypes.string,
  /** Callback which will be executed when a user updated the user id. */
  updateUserId: PropTypes.func.isRequired
};

export default withRouter(withI18n()(ForgotPassword));
