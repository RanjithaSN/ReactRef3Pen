import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import LocaleKeys from '../../locales/keys';
import Notice from '../notice/notice';
import './form.errors.scss';

const FormErrors = (props) => {
  const errors = props.errors ? props.errors.map((error) => (error ? <li key={error}>{error}</li> : null)) : [];
  const errorList = errors.length > 0 ? (
    <ul className="c-formErrors-list">
      {errors}
    </ul>
  ) : null;

  return (
    <Notice
      type="error"
      heading={props.t(LocaleKeys.FORM_ERRORS.HEADING)}
      className={classNames('c-formErrors', props.className)}
    >
      {errorList}
    </Notice>
  );
};

FormErrors.displayName = 'FormErrors';
FormErrors.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** An array of error messages that will be rendered in a bulleted list in the FormErrors component. */
  errors: PropTypes.arrayOf(PropTypes.string),
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export const NakedFormErrors = FormErrors;
export default withI18n()(FormErrors);
