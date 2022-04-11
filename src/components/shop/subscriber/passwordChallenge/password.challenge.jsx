import { CODES } from '@selfcare/core/redux/metadata/codes/codes.constants';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Select from 'selfcare-ui/src/components/select/select';
import LocaleKeys from '../../../../locales/keys';
import './password.challenge.scss';


/**
 * Password challenges are slightly different than code.selector.jsx because the value needs to be
 * that of the label, not the underlying code value
 */
class PasswordChallenge extends React.PureComponent {
  componentDidMount() {
    this.props.retrieveCodes(CODES.DefaultPasswordChallenge);
  }

  render() {
    const { className, id, onChange, passwordChallengeOptions, selected, size, t } = this.props;

    return (
      <Select
        id={id}
        className={classNames('c-password-challenge', className)}
        options={passwordChallengeOptions}
        placeholder={t(LocaleKeys.SELECT)}
        onChange={onChange}
        selected={selected}
        size={size}
      />
    );
  }
}

PasswordChallenge.displayName = 'PasswordChallenge';
PasswordChallenge.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** ID of the child select component */
  id: PropTypes.string.isRequired,
  /** Function to propagate changes  */
  onChange: PropTypes.func.isRequired,
  /** The options to display to the end user */
  passwordChallengeOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  /** Action used to fetch metadata */
  retrieveCodes: PropTypes.func.isRequired,
  /** The selected value of the password challenge options */
  selected: PropTypes.string,
  /** The size of the field */
  size: PropTypes.string.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withI18n()(PasswordChallenge);
