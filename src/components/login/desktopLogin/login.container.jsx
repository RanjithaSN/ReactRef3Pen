import PropTypes from 'prop-types';
import React from 'react';
import LocaleKeys from '../../../locales/keys';
import ForgotPassword from '../../forgotPassword/forgot.password.contextual';
import ResetPassword from '../../resetPassword/reset.password.contextual';
import Login from './login.contextual';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowLogin: true,
      shouldShowForgotPassword: false,
      shouldShowReset: false
    };
  }

  componentWillUnmount() {
    this.props.headerController(LocaleKeys.LOGIN_FORM.PANEL_HEADING);
  }

    setShowLogin = () => {
      this.setState({
        shouldShowLogin: true,
        shouldShowForgotPassword: false,
        shouldShowReset: false
      }, () => {
        this.props.headerController(LocaleKeys.LOGIN_FORM.PANEL_HEADING);
      });
    };

    setShowForgotPassword = () => {
      this.setState({
        shouldShowLogin: false,
        shouldShowForgotPassword: true,
        shouldShowReset: false
      }, () => {
        this.props.headerController(LocaleKeys.FORGOT_PASSWORD.FORGOT_PASSWORD_HEADING);
      });
    };

    setShowReset = () => {
      this.setState({
        shouldShowLogin: false,
        shouldShowForgotPassword: false,
        shouldShowReset: true
      }, () => {
        this.props.headerController(LocaleKeys.RESET_PASSWORD.RESET_PASSWORD_HEADING);
      });
    };

    render() {
      const { shouldShowLogin, shouldShowForgotPassword, shouldShowReset } = this.state;
      if (shouldShowLogin) {
        return (
          <Login afterSubmit={this.props.closeModal} showForgotPassword={this.setShowForgotPassword} showResetPassword={this.setShowReset} fromModal />
        );
      }
      if (shouldShowForgotPassword) {
        return (
          <ForgotPassword showLogin={this.setShowLogin} fromModal />
        );
      }
      if (shouldShowReset) {
        return <ResetPassword afterSubmit={this.props.closeModal} />;
      }
    }
}

LoginContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  headerController: PropTypes.func.isRequired
};

export default LoginContainer;
