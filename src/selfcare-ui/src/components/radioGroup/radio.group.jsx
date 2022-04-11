import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Radio from '../radio/radio';
import './radio.group.scss';

export const NakedRadioGroup = ({ className, children, onChange, name, label, disabled, readOnly, error, style, inlineView }, ref) => (
  <div
    className={classNames('c-radio-group',
      {
        'c-radio-group-inline': inlineView
      },
      className)}
    role="radiogroup"
    aria-labelledby={label}
    ref={ref}
    style={style}
  >
    {React.Children.map(children, (child) => {
      if (!child) {
        return null;
      }
      return React.cloneElement(child, {
        name,
        className: classNames('c-radio-group__radio', child.props.className),
        onChange: onChange || child.props.onChange,
        disabled: disabled || child.props.disabled,
        readOnly: readOnly || child.props.readOnly,
        error: error || child.props.error
      });
    })}
  </div>
);
const RadioGroup = React.forwardRef(NakedRadioGroup);

RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = {
  /** The child components to render */
  children: PropTypes.arrayOf(PropTypes.objectOf(Radio)),
  /** A classname wanted to be appended to the main element */
  className: PropTypes.string,
  /** The HTML disabled attribute to be applied to each radio button within the group. */
  disabled: PropTypes.bool,
  /** The error attribute to be passed to each radio button in the group. */
  error: PropTypes.string,
  /** Whether to render with options in one row */
  inlineView: PropTypes.bool,
  /** Aria label attribute to be applied to the radio button group. */
  label: PropTypes.string,
  /** The name attribute which will be applied to the HTML input element for the radio buttons in the group. */
  name: PropTypes.string.isRequired,
  /** Callback function which will be called whenever the values of the group are updated. */
  onChange: PropTypes.func,
  /** The HTML readOnly attribute to be applied to each radio button within the group. */
  readOnly: PropTypes.bool
};

export default RadioGroup;
