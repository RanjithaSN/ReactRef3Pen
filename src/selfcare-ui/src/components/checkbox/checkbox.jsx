import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './checkbox.scss';


const Checkbox = ({ className, id, children, error, labelClassName, large, ...props }) => (
  <label
    className={classNames('c-checkbox', {
      'c-checkbox--large': large
    }, className)}
    htmlFor={id}
  >
    <input
      type="checkbox"
      className={classNames('c-checkbox-input', {
        'c-checkbox-input--error': error
      })}
      id={id}
      {...props}
    />
    <label className={classNames('c-checkbox-label', labelClassName)} htmlFor={id}>{children}</label>
  </label>
);

Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  /** Additional DOM elements to display with the checkbox. */
  children: PropTypes.node,
  /** Used to customize style */
  className: PropTypes.string,
  /** If true display the checkbox error state */
  error: PropTypes.bool,
  /** The id attribute which will be applied to the HTML input element for the checkbox. */
  id: PropTypes.string.isRequired,
  /** The css class name which will be applied to the inner HTML label element for the checkbox. */
  labelClassName: PropTypes.string,
  /** Set checkboxes to show large format */
  large: PropTypes.bool
};
Checkbox.defaultProps = {
  error: false
};

export default Checkbox;
