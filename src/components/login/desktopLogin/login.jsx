import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Notice from 'selfcare-ui/src/components/notice/notice';
import LocaleKeys from '../../../locales/keys';
import {
  getAboutPennyPlayNavItem,
  getAccountNavItem,
  getCheckoutNavItem,
  getShopNavItem,
  getSubscriberInformationNavItem
} from '../../../navigation/sitemap.selectors';
import AuthenticationPanel from '../../authenticationPanel/authentication.panel';
import LoginForm from '../login.form.withFormik';
import '../login.scss';

class Login extends React.Component {
    state = {
      login: this.props.userId,
      password: '',
      loading: false
    };

    componentDidMount() {
      this.props.clearApiFault();

      if (this.props.location) {
        this.props.updateShouldShowExpiration(this.props.location.search.includes('sessionExpired'));
      }

      this.props.retrieveCodes(CODES.SubscriberRequirements);

      if (this.props.currentSession && !this.props.isPropectCustomer) {
        this.props.history.push(getAccountNavItem().url);
        if (this.props.closeModal) {
          this.props.closeModal();
        }
      }

      window.handleSubmit = this.handleSubmit;
      window.populateFields = this.populateFields;
    }

    componentWillUnmount() {
      window.handleSubmit = undefined;
      window.populateFields = undefined;
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

      const allowCartSwap = this.props.location.pathname === getSubscriberInformationNavItem().url;
      await this.props.createSession(login, password);

      await this.props.updateShouldShowExpiration(false);

      this.setState({
        loading: false
      });

      if (this.props.afterSubmit) {
        this.props.afterSubmit();
        if (!this.props.isPropectCustomer) {
          this.props.clearProspect();
        }

        if (allowCartSwap && !this.props.isPropectCustomer) {
          try {
            await this.props.saveCart();

            if (this.props.hasPennyPlayProduct && this.props.hasPennyPlayInCart) {
              this.props.history.push(getAboutPennyPlayNavItem().url);
            } else {
              this.props.history.push(getCheckoutNavItem().url);
            }
          } catch {
            this.props.history.push(getShopNavItem().url);
          }
        } else if (this.props.location.pathname.indexOf(getShopNavItem().url) !== -1) {
          this.props.history.push(getShopNavItem().url);
        }
      }
    };

    render() {
      const { fromModal, t } = this.props;
      const { login, password } = this.state;
      return (
        <div className="c-login">
          <AuthenticationPanel
            className="c-loading-indicator-containment"
            removePadding={fromModal}
          >
            <LoadingIndicator isLoading={this.isLoading} />
            {this.props.showForgotPasswordSuccessNotification &&
                        <Notice type="success" heading={t(LocaleKeys.FORGOT_PASSWORD.SUCCESS)} className="c-login__form-success" />}
            {this.props.showUpdatePasswordNotification &&
                        <Notice type="success" heading={t(LocaleKeys.RESET_PASSWORD.SUCCESS)} className="c-login__form-success" />}
            <LoginForm
              useStackedControls
              apiFault={this.props.apiFault}
              shouldCaptureEmailAsLogin={this.props.shouldCaptureEmailAsLogin}
              handleSubmit={this.handleSubmit}
              password={password}
              push={this.props.history.push}
              showForgotPassword={this.props.showForgotPassword}
              updateUserId={this.props.updateUserId}
              userId={login}
            />
          </AuthenticationPanel>
        </div>
      );
    }
}

Login.displayName = 'Login';
Login.propTypes = {
  /** Function to be called after login has completed */
  afterSubmit: PropTypes.func,
  /** A fault object representing an error that occurred attempting to login.  Must have a translatedMessage attribute. */
  apiFault: PropTypes.object,
  /** Action used to clear the api fault when toggling between forms on the screen. */
  clearApiFault: PropTypes.func.isRequired,
  /** Clears the prospect data after user logins. */
  clearProspect: PropTypes.func.isRequired,
  /** method that to close the modal */
  closeModal: PropTypes.func,
  /** Callback which will be executed when a user submits the login form. */
  createSession: PropTypes.func.isRequired,
  /** The current session token if logged in */
  currentSession: PropTypes.string,
  /** Boolean indicating if we are surrounded by a modal (which gives us padding) */
  fromModal: PropTypes.bool,
  /** The location object provided by the router */
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string
  }),
  /** True if the user has already purchased the play product. */
  hasPennyPlayProduct: PropTypes.bool,
  /** True if calculate order quote call contains the play offer. */
  hasPennyPlayInCart: PropTypes.bool,
  /** The Prospect customer being loaded currently. */
  isPropectCustomer: PropTypes.bool.isRequired,
  /** Boolean indicating whether the retrieveSubscriber action is in progress */
  isSubscriberLoading: PropTypes.bool,
  /** Navigation function used to change the browser url. */
  history: PropTypes.object.isRequired,
  /** Action used to fetch user accounts */
  retrieveAccounts: PropTypes.func.isRequired,
  /** Action used to fetch metadata */
  retrieveCodes: PropTypes.func.isRequired,
  /** Method to save the prospect's cart to the newly signed in user. */
  saveCart: PropTypes.func.isRequired,
  /** The loading indicator will be displayed until the session is created. */
  sessionCreatingLoadingIndicator: PropTypes.bool.isRequired,
  /** Whether or not the API utilizes the subscriber's email as the login field */
  shouldCaptureEmailAsLogin: PropTypes.bool,
  /** Modal function to show the forgot password component */
  showForgotPassword: PropTypes.func,
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

export const NakedLogin = Login;
export default compose(
  withI18n(),
  withRouter
)(Login);
