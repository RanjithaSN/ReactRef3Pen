import { withFormik } from 'formik';
import i18next from 'i18next';
import PureLoginForm from './login.form';
import LocaleKeys from '../../locales/keys';

export default withFormik({
  displayName: 'LoginForm',
  mapPropsToValues: ({ userId, password }) => {
    return {
      login: userId || '',
      password: password || ''
    };
  },
  validate(values, props) {
    const errors = {};
    if (!values.login) {
      errors.login = i18next.t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
        field: i18next.t(props.shouldCaptureEmailAsLogin ? LocaleKeys.SUBSCRIBER.EMAIL : LocaleKeys.LOGIN_FORM.USERNAME)
      });
    }
    if (!values.password) {
      errors.password = i18next.t(LocaleKeys.VALIDATION.REQUIRED_FIELD_TEMPLATE, {
        field: i18next.t(LocaleKeys.LOGIN_FORM.PASSWORD)
      });
    }
    return errors;
  },
  handleSubmit({ login, password }, { props }) {
    props.handleSubmit(login, password);
  },
  enableReinitialize: true
})(PureLoginForm);
