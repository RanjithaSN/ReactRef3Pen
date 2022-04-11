import ApiFaultCodes from '@selfcare/core/constants/api.fault.codes';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import FormErrors from 'selfcare-ui/src/components/formErrors/form.errors';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import Link from 'selfcare-ui/src/components/link/link';
import Notice from 'selfcare-ui/src/components/notice/notice';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LocaleKeys from '../../locales/keys';
import ChatButton from '../getHelp/troubleshooter/directHelp/chat.button';
import { buildHistoryNodeFromKeyValue, initializeDirectHelp, UNAUTHENTICATED_SECTIONS } from '../getHelp/troubleshooter/directHelp/direct.help.helpers';

export class LoginForm extends React.Component {
    state = {
      error: this.props.apiFault ? this.props.apiFault.translatedMessage : null,
      errorCode: this.props.apiFault ? this.props.apiFault.Subcode : null
    };

    componentDidMount() {
      window.__initZenDesk();
    }

    componentDidUpdate(prevProps) {
      if (this.props.apiFault !== prevProps.apiFault) {
        this.setState({
          error: this.props.apiFault ? this.props.apiFault.translatedMessage : null,
          errorCode: this.props.apiFault ? this.props.apiFault.Subcode : null
        });
      }
    }

    navigateToForgotPassword = () => {
      this.props.updateUserId(this.props.values.login);
      // checks if this instance is coming from the modal
      if (this.props.showForgotPassword) {
        this.props.showForgotPassword();
      } else {
        this.props.push(`/${this.props.t(LocaleKeys.ROUTES.FORGOT_PASSWORD)}`);
      }
    };

    renderFormErrors() {
      let formErrors;
      if (this.state.error) {
        if (this.state.errorCode === ApiFaultCodes.REVOKED_LOGIN) {
          formErrors = (
            <>
              <Notice apiFault={this.props.apiFault} type="error" className="c-login__form-errors">
                {this.state.error}
                <Link
                  onClick={() => {
                    initializeDirectHelp([
                      buildHistoryNodeFromKeyValue('Action', UNAUTHENTICATED_SECTIONS)
                    ]);
                  }}
                >
                  <Heading className="c-login__error-link" category="minor" tone="normal">{this.props.t(LocaleKeys.FORGOT_PASSWORD.CUSTOMER_SERVICE)}</Heading>
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
                        className="c-login__form-errors"
                      />
                    );
        }
      }
      if ((this.props.errors.login && this.props.touched.login) || (this.props.errors.password && this.props.touched.password)) {
        formErrors = <FormErrors className="c-login__form-errors" />;
      }

      return formErrors;
    }

    render() {
      const { t } = this.props;

      const COMMON_FIELD_PROPS = {
        onBlur: this.props.handleBlur,
        onChange: this.props.handleChange,
        required: true,
        size: 'full'
      };

      return (
        <React.Fragment>
          {this.renderFormErrors()}
          <form onSubmit={this.props.handleSubmit} autoComplete="off">
            <InputField
              error={this.props.touched.login && this.props.errors.login}
              labelText={this.props.showLabels ?
                t(this.props.shouldCaptureEmailAsLogin ? LocaleKeys.SUBSCRIBER.EMAIL : LocaleKeys.LOGIN_FORM.USERNAME) :
                undefined
              }
              input={(
                <Input
                  id="login"
                  type="email"
                  value={this.props.values.login}
                  className={classNames({
                    'c-input-innerLabel': !this.props.showLabels
                  })}
                  placeholder={this.props.showLabels ?
                    null :
                    t(this.props.shouldCaptureEmailAsLogin ? LocaleKeys.SUBSCRIBER.EMAIL : LocaleKeys.LOGIN_FORM.USERNAME)
                  }
                  autoComplete="username"
                />
              )}
              {...COMMON_FIELD_PROPS}
            />
            <InputField
              error={this.props.touched.password && this.props.errors.password}
              labelText={this.props.showLabels ? t(LocaleKeys.LOGIN_FORM.PASSWORD) : undefined}
              input={(
                <Input
                  id="password"
                  type="password"
                  value={this.props.values.password}
                  className={classNames({
                    'c-input-innerLabel': !this.props.showLabels
                  })}
                  placeholder={this.props.showLabels ?
                    null :
                    t(LocaleKeys.LOGIN_FORM.PASSWORD)
                  }
                  autoComplete="current-password"
                />
              )}
              {...COMMON_FIELD_PROPS}
            />
            <div
              className={classNames('c-login__button-group', {
                'c-login__button-group--stacked': this.props.useStackedControls
              })}
            >
              <FilledButton className="c-login__button" type="submit">
                {t(LocaleKeys.LOGIN_FORM.SUBMIT)}
              </FilledButton>
              <Link className="c-login__link" onClick={this.navigateToForgotPassword}>
                {t(LocaleKeys.LOGIN_FORM.FORGOT_PASSWORD_LABEL)}
              </Link>
              {this.props.isRunningMobile && (
                <Paragraph className="c-login__link">
                  {t(LocaleKeys.LOGIN_FORM.NEED_ACCOUNT_PROMPT_PT_1)}
                  <Link href={t(LocaleKeys.PENNY_WEBSITE.URL)} target="_blank" key="penny_login_account_link">
                    {t(LocaleKeys.PENNY_WEBSITE.LABEL)}
                  </Link>
                  {t(LocaleKeys.LOGIN_FORM.NEED_ACCOUNT_PROMPT_PT_2)}
                </Paragraph>
              )}
            </div>
          </form>
        </React.Fragment>
      );
    }
}

const getFormShape = (typeFn) => PropTypes.shape({
  login: typeFn,
  password: typeFn
}).isRequired;

LoginForm.displayName = 'LoginForm';
LoginForm.propTypes = {
  /** The result of an unsuccessful API call */
  apiFault: PropTypes.object,
  /** The list of business units to select from */
  businessUnits: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  /** Form errors */
  errors: getFormShape(PropTypes.string),
  /** Callback for when a user blurs an input element */
  handleBlur: PropTypes.func.isRequired,
  /** Callback for when a user changes an input element */
  handleChange: PropTypes.func.isRequired,
  /** Callback for when a user submits the login form */
  handleSubmit: PropTypes.func.isRequired,
  /** Boolean indicating whether we are in the mobile app or not */
  isRunningMobile: PropTypes.bool,
  /** Push function to be performed when the user is being redirected */
  push: PropTypes.func.isRequired,
  /** Whether or not the API requires the login to be the email address */
  shouldCaptureEmailAsLogin: PropTypes.bool,
  /** Modal call to show forgot password page */
  showForgotPassword: PropTypes.func,
  /** The currently selected environment */
  showLabels: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Object representing which fields have been touched */
  touched: getFormShape(PropTypes.bool),
  /** A callback to be called when the user updates the user ID */
  updateUserId: PropTypes.func.isRequired,
  /** The currently entered user ID */
  userId: PropTypes.string,
  /** Indicates the form's buttons should use a full-width column layout */
  useStackedControls: PropTypes.bool,
  /** [[IgnoreDoc]] Validate Form Function provided by Formik */
  validateForm: PropTypes.func.isRequired,
  /** The values of the form fields */
  values: getFormShape(PropTypes.string)
};
LoginForm.defaultProps = {
  businessUnits: [],
  showLabels: false
};

export default withI18n()(LoginForm);
