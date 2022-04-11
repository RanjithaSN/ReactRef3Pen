import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import LocaleKeys from '../../locales/keys';
import { getAccountNavItem } from '../../navigation/sitemap.selectors';
import AuthenticationPanel from '../authenticationPanel/authentication.panel';
import LoginForm from './login.form.withFormik';
import './login.scss';

class Login extends React.Component {
    state = {
      showError: false,
      login: this.props.userId,
      password: '',
      loading: false
    };

    componentDidMount() {
      this.props.updateShouldShowExpiration(this.props.location.search.includes('sessionExpired'));
      this.props.retrieveCodes(CODES.SubscriberRequirements);

      if (this.props.currentSession) {
        this.props.history.push(getAccountNavItem().url);
      }

      window.handleSubmit = this.handleSubmit;
      window.populateFields = this.populateFields;
    }

    componentWillUnmount() {
      window.handleSubmit = undefined;
      window.populateFields = undefined;
    }

    get referrer() {
      const query = new URLSearchParams(this.props.location.search);
      const referrer = query.get('referrer');
      return referrer;
    }

    get isLoading() {
      return this.state.loading && this.props.apiFault === null;
    }

    populateFields = (login, password) => {
      this.setState({
        login,
        password
      });
    };

    handleSubmit = async (login, password) => {
      if (this.isLoading) {
        return;
      }

      this.setState({
        loading: true
      });

      await this.props.forceEnvironmentUpdate();
      await this.props.createSession(login, password);

      this.setState({
        loading: false
      });

      if (this.props.isPropectCustomer) {
        this.setState({
          showError: true
        });
      } else {
        this.props.updateShouldShowExpiration(false);
        if (this.referrer) {
          this.props.history.push(this.referrer);
        } else {
          this.props.history.push(getAccountNavItem().url);
        }
      }
    };

    render() {
      const { t } = this.props;
      const { login, password } = this.state;
      return (
        <div className="c-login">
          <AuthenticationPanel
            className="c-loading-indicator-containment"
            heading={t(LocaleKeys.LOGIN_FORM.PANEL_HEADING)}
          >
            <LoadingIndicator isLoading={this.isLoading} />
            {this.state.showError &&
                        <Notice type="error" heading={t(LocaleKeys.LOGIN_FORM.ERROR_WITH_ACCOUNT)} className="c-login__form-errors" />}
            {this.props.showForgotPasswordSuccessNotification &&
                        <Notice type="success" heading={t(LocaleKeys.FORGOT_PASSWORD.SUCCESS)} className="c-login__form-success" />}
            {this.props.showUpdatePasswordNotification &&
                        <Notice type="success" heading={t(LocaleKeys.RESET_PASSWORD.SUCCESS)} className="c-login__form-success" />}
            <LoginForm
              apiFault={this.props.apiFault}
              handleSubmit={this.handleSubmit}
              isRunningMobile={this.props.isRunningMobile}
              password={password}
              push={this.props.history.push}
              shouldCaptureEmailAsLogin={this.props.shouldCaptureEmailAsLogin}
              updateUserId={this.props.updateUserId}
              userId={login}
              useStackedControls
              referrer={this.referrer}
            />
          </AuthenticationPanel>
        </div>
      );
    }
}

Login.displayName = 'Login';
Login.propTypes = {
  /** A fault object representing an error that occurred attempting to login.  Must have a translatedMessage attribute. */
  apiFault: PropTypes.object,
  /** Whether or not the API utilizes the subscriber's email as the login field */
  shouldCaptureEmailAsLogin: PropTypes.bool,
  /** Callback which will be executed when a user submits the login form. */
  createSession: PropTypes.func.isRequired,
  /** The current session token if logged in */
  currentSession: PropTypes.string,
  /** Ensure environment is updated before login starts. */
  forceEnvironmentUpdate: PropTypes.func.isRequired,
  /** The Prospect customer being loaded currently. */
  isPropectCustomer: PropTypes.bool.isRequired,
  /** Boolean indicating whether we are in the mobile app or not */
  isRunningMobile: PropTypes.bool,
  /** Boolean indicating whether the retrieveSubscriber action is in progress */
  isSubscriberLoading: PropTypes.bool,
  /** The location object provided by the router */
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }),
  /** Navigation function used to change the browser url. */
  history: PropTypes.object.isRequired,
  /** Action used to fetch user accounts */
  retrieveAccounts: PropTypes.func.isRequired,
  /** Action used to fetch metadata */
  retrieveCodes: PropTypes.func.isRequired,
  /** The loading indicator will be displayed until the session is created. */
  sessionCreatingLoadingIndicator: PropTypes.bool.isRequired,
  /** The success notification flag from the store when email is sent. */
  showForgotPasswordSuccessNotification: PropTypes.bool.isRequired,
  /** The success notification flag from the store when user reset the password. */
  showUpdatePasswordNotification: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The function to update the state of whether or not the session expiration banner should be visible */
  updateShouldShowExpiration: PropTypes.func.isRequired,
  /** Callback which will be executed when a user updated the user id. */
  updateUserId: PropTypes.func.isRequired,
  /** The user id if entered from the forgot password page. */
  userId: PropTypes.string
};

export default withRouter(withI18n()(Login));
