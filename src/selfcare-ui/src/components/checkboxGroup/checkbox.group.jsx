import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './checkbox.group.scss';

const CheckboxGroup = ({ className, children, onChange, name, label, disabled, readOnly, error }) => (
  <div className={classNames('c-checkbox-group', className)} role="group" aria-labelledby={label}>
    {React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        className: classNames('c-checkbox-group__checkbox', child.props.className),
        name: `${name}[]`,
        onChange,
        disabled: disabled || child.props.disabled,
        readOnly: readOnly || child.props.readOnly,
        error: error || child.props.error
      });
    })}
  </div>
);

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.propTypes = {
  className: PropTypes.string,
  /** The HTML name attribute to be applied to the each checkbox within the group.  Each checkbox will have this name with an [] appended. */
  name: PropTypes.string.isRequired,
  /** Aria label attribute to be applied to the checkbox group. */
  label: PropTypes.string,
  /** The HTML disabled attribute to be applied to each checkbox within the group. */
  disabled: PropTypes.bool,
  /** The HTML readOnly attribute to be applied to each checkbox within the group. */
  readOnly: PropTypes.bool,
  /** The error attribute to be passed to each Checkbox component in the group. */
  error: PropTypes.string,
  /** Callback function which will be called whenever the values of the group are updated. */
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element) // TODO: Restrict to <Checkbox />
};

export default CheckboxGroup;
