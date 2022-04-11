import ApiFaultCodes from '@selfcare/core/constants/api.fault.codes';
import classNames from 'classnames';
import { withFormik } from 'formik';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import FormErrors from 'selfcare-ui/src/components/formErrors/form.errors';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import Link from 'selfcare-ui/src/components/link/link';
import Notice from 'selfcare-ui/src/components/notice/notice';
import LocaleKeys from '../../locales/keys';
import ChatButton from '../getHelp/troubleshooter/directHelp/chat.button';
import { buildHistoryNodeFromKeyValue, initializeDirectHelp, UNAUTHENTICATED_SECTIONS } from '../getHelp/troubleshooter/directHelp/direct.help.helpers';
import ReCAPTCHA from 'react-google-recaptcha';
import AppConfig from 'AppConfig';
import './forgot.password.scss';

class ForgotPasswordForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      errorCode: this.props.apiFault ? this.props.apiFault.Subcode : null,
      captchaResponse: null
    };
  }

  componentDidMount() {
    window.__initZenDesk();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.apiFault !== nextProps.apiFault) {
      this.setState({
        error: nextProps.apiFault ? nextProps.apiFault.translatedMessage : null,
        errorCode: this.props.apiFault ? this.props.apiFault.Subcode : null
      });
    }
    if (this.props.errors !== nextProps.errors) {
      if ((nextProps.errors.login && nextProps.touched.login)) {
        this.setState({
          error: null
        });
      }
    }
  }

  backToLogin = () => {
    if (this.props.showLogin) {
      this.props.showLogin();
    } else {
      this.props.push(`/${this.props.t(LocaleKeys.ROUTES.LOGIN)}`);
    }
  };


  onInputChange = (event) => {
    this.setState({
      error: null
    });
    this.props.handleChange(event);
  };

  renderFormErrors() {
    let formErrors;
    if (this.state.error) {
      if (this.state.errorCode === ApiFaultCodes.REVOKED_LOGIN) {
        formErrors = (
          <>
            <Notice apiFault={this.props.apiFault} type="error" className="c-forgot-password__form-errors">
              {this.state.error}
              <Link
                onClick={() => {
                  initializeDirectHelp([
                    buildHistoryNodeFromKeyValue('Action', UNAUTHENTICATED_SECTIONS)
                  ]);
                }}
              >
                <Heading className="c-forgot-password__error-link" category="minor" tone="normal">{this.props.t(LocaleKeys.FORGOT_PASSWORD.CUSTOMER_SERVICE)}</Heading>
              </Link>
            </Notice>
            <ChatButton unauthenticated />
          </>
        );
      } else {
        formErrors =
          (
            <Notice
              apiFault={this.props.apiFault}
              type="error"
              heading={this.state.error}
              className="c-forgot-password__form-errors"
            />
          );
      }
    }

    if ((this.props.errors.login && this.props.touched.login)) {
      formErrors = <FormErrors className="c-forgot-password__form-errors" />;
    }

    return formErrors;
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        {this.renderFormErrors()}
        <div className="c-forgot-password__banner">
          {this.props.t(LocaleKeys.FORGOT_PASSWORD.STEPS)}
        </div>
        <InputField
          onBlur={this.props.handleBlur}
          required
          onChange={this.onInputChange}
          error={this.props.touched.login && this.props.errors.login}
          input={(
            <Input
              id="login"
              type="email"
              value={this.props.values.login}
              autoComplete="off"
              placeholder={this.props.t(LocaleKeys.SUBSCRIBER.EMAIL)}
            />
          )}
          size="full"
        />
        {AppConfig.USE_RECAPTCHA && <div className="c-recaptcha">
          <ReCAPTCHA
            id="recaptcha"
            sitekey={AppConfig.GOOGLE_API_PUBLIC_SITE_KEY}
            onChange={(response) => {
              this.props.setReCaptchaResponse(response);
              this.setState({
                captchaResponse: response
              });
            }}
          />
        </div>}
        <div
          className={classNames('c-forgot-password__button-group', {
            'c-forgot-password__button-group--stacked': this.props.useStackedControls
          })}
        >
          <FilledButton
            className="c-forgot-password__submit"
            type="submit"
            disabled={(AppConfig.USE_RECAPTCHA && !this.state.captchaResponse) || (this.props.touched.login && this.props.errors.login)}
          >
            {this.props.t(LocaleKeys.FORGOT_PASSWORD.SUBMIT)}
          </FilledButton>
          <Link className="c-forgot-password__return" onClick={this.backToLogin}>
            {this.props.t(LocaleKeys.FORGOT_PASSWORD.RETURN_TO_LOGIN)}
          </Link>
        </div>
      </form>
    );
  }
}

ForgotPasswordForm.displayName = 'ForgotPasswordForm';
ForgotPasswordForm.propTypes = {
  /** A fault object representing an error that occurred attempting to generate temporary password. */
  apiFault: PropTypes.object,
  /** A errors object for the validations messages of the forgot password form. */
  errors: PropTypes.object.isRequired,
  /** Function used to get Google's captcha response and pass it as a state */
  setReCaptchaResponse: PropTypes.func,
  /** Function to handle onblur event when the input field is touched or visited. */
  handleBlur: PropTypes.func.isRequired,
  /** Function used to update the react state on every keystroke. */
  handleChange: PropTypes.func.isRequired,
  /** Function used to trigger action to generate temporary password with login id. */
  handleSubmit: PropTypes.func.isRequired,
  /** Navigation function used to change the browser url. */
  push: PropTypes.func.isRequired,
  /** Modal function to return to the login page */
  showLogin: PropTypes.func,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** An object that represents each field in the form that has been touched or visited. */
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  /** The user id entered from the login page. */
  userId: PropTypes.string,
  /** Indicates the form's buttons should use a full-width column layout */
  useStackedControls: PropTypes.bool,
  /** Callback which will be executed when a user updated the user id. */
  updateUserId: PropTypes.func.isRequired,
  /** An object that represents the form values. */
  values: PropTypes.object.isRequired
};

export default compose(
  withI18n(),
  withFormik({
    mapPropsToValues(props) {
      return ({
        login: props.userId ? props.userId : ''
      });
    },
    validate(values) {
      const errors = {};
      if (!values.login) {
        errors.login = i18next.t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
          field: i18next.t(LocaleKeys.FORGOT_PASSWORD.USER_ID)
        });
      }
      return errors;
    },
    handleSubmit({ login }, { props }) {
      props.updateUserId(login);
      props.handleResetPassword(login);
    }
  })
)(ForgotPasswordForm);
