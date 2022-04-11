import { withFormik } from 'formik';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import FormErrors from 'selfcare-ui/src/components/formErrors/form.errors';
import Input from 'selfcare-ui/src/components/input/input';
import InputField from 'selfcare-ui/src/components/inputField/input.field';
import Link from 'selfcare-ui/src/components/link/link';
import Notice from 'selfcare-ui/src/components/notice/notice';
import LocaleKeys from '../../locales/keys';
import { MAX_PASSWORD_FIELD_LENGTH } from '../../constants/validation.constants';
import { HARDCODED_PW_REQUIREMENT } from '../loginInfoModal/loginInfoForm/login.info.form';
import './reset.password.scss';

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.apiFault !== nextProps.apiFault) {
      this.setState({
        error: nextProps.apiFault ? nextProps.apiFault.translatedMessage : null
      });
    }
  }

    backToLogin = () => {
      this.props.push('/logout');
    };

    onInputChange = (event) => {
      this.setState({
        error: null
      });
      this.props.handleChange(event);
    };

    getFormErrorElement = (errors) => {
      return <FormErrors errors={errors} className="c-resetPassword-formErrors" />;
    };

    render() {
      const { passwordRequirements, t } = this.props;
      let formErrors;
      // Banner notification is always shown when there is an error form the api response or form validation messages.
      if (this.state.error) {
        formErrors = <Notice apiFault={this.props.apiFault} type="error" heading={this.state.error} className="c-resetPassword-formErrors" />;
      }
      // Form errors messages are shown when the input field is touched an left empty.
      if ((this.props.errors.password && this.props.touched.password) ||
            (this.props.errors.confirmPassword && this.props.touched.confirmPassword)) {
        formErrors = this.getFormErrorElement();
      }
      // Form error messages with errors attribute show errors when the password and confirm password input fields do now match.
      if (this.props.touched.password && this.props.touched.confirmPassword) {
        if (this.props.errors.validatePassword) {
          const errors = [t(LocaleKeys.RESET_PASSWORD.PASSWORD_MATCH_ERROR)];
          formErrors = this.getFormErrorElement(errors);
        }
        if (this.props.errors.validatePasswordLength) {
          const errors = [t(LocaleKeys.RESET_PASSWORD.PASSWORD_LENGTH_ERROR)];
          formErrors = this.getFormErrorElement(errors);
        }
      }

      return (
        <form onSubmit={this.props.handleSubmit}>
          {formErrors}
          <InputField
            required
            onBlur={this.props.handleBlur}
            onChange={this.onInputChange}
            error={this.props.touched.password && this.props.errors.password}
            input={(
              <Input
                id="password"
                type="password"
                className="c-input-innerLabel"
                value={this.props.values.password}
                autoComplete="off"
                placeholder={t(LocaleKeys.RESET_PASSWORD.PASSWORD)}
              />
            )}
            size="full"
            info={(
              <ul className="c-resetPassword__password-requirement-list">
                {passwordRequirements.map((req, idx) => {
                  const key = `requirement_${idx}`;
                  return (
                    <li key={key}>
                      {req}
                    </li>
                  );
                })}
              </ul>
            )}
          />
          <InputField
            required
            onBlur={this.props.handleBlur}
            onChange={this.onInputChange}
            error={this.props.touched.confirmPassword && this.props.errors.confirmPassword}
            input={(
              <Input
                id="confirmPassword"
                type="password"
                className="c-input-innerLabel"
                value={this.props.values.confirmPassword}
                autoComplete="off"
                placeholder={t(LocaleKeys.RESET_PASSWORD.CONFIRM_PASSWORD)}
              />
            )}
            size="full"
          />
          <FilledButton className="c-resetPassword-submit" type="submit">{t(LocaleKeys.RESET_PASSWORD.SUBMIT)}</FilledButton>
          <div className="c-resetPassword-returnLoginLink">
            <Link onClick={this.backToLogin}>
              {t(LocaleKeys.RESET_PASSWORD.RETURN_TO_LOGIN)}
            </Link>
          </div>
        </form>
      );
    }
}

ResetPasswordForm.displayName = 'ResetPasswordForm';
ResetPasswordForm.propTypes = {
  /** A fault object representing an error that occurred */
  apiFault: PropTypes.object,
  /** A errors object for the validations messages of the forgot password form. */
  errors: PropTypes.object.isRequired,
  /** Function to handle onblur event when the input field is touched or visited. */
  handleBlur: PropTypes.func.isRequired,
  /** Function used to update the react state on every keystroke. */
  handleChange: PropTypes.func.isRequired,
  /** Function used to trigger action to update password */
  handleSubmit: PropTypes.func.isRequired,
  /** The list of password requirements to render on the page */
  passwordRequirements: PropTypes.arrayOf(PropTypes.string),
  /** Function to push url to browser */
  push: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** An object that represents each field in the form that has been touched or visited. */
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  /** An object that represents the form values. */
  values: PropTypes.object.isRequired
};
ResetPasswordForm.defaultProps = {
  passwordRequirements: [HARDCODED_PW_REQUIREMENT]
};

export default compose(
  withI18n(),
  withFormik({
    mapPropsToValues() {
      return ({
        temporaryPassword: '',
        password: '',
        confirmPassword: '',
        validatePassword: false,
        validatePasswordLength: false
      });
    },
    validate(values) {
      const errors = {};
      if (!values.password) {
        errors.password = i18next.t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
          field: i18next.t(LocaleKeys.RESET_PASSWORD.PASSWORD)
        });
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = i18next.t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
          field: i18next.t(LocaleKeys.RESET_PASSWORD.CONFIRM_PASSWORD)
        });
      }
      if (values.confirmPassword !== values.password) {
        errors.validatePassword = true;
      }
      if (values.password.length > MAX_PASSWORD_FIELD_LENGTH) {
        errors.validatePasswordLength = true;
      }
      return errors;
    },
    handleSubmit({ password }, { props }) {
      props.handleResetPassword(password);
    }
  })
)(ResetPasswordForm);
