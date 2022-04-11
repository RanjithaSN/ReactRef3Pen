import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import IconAngleDown from '../../icons/react-icons/angle-down';
import { withStandardSize } from '../withStandardSize/with.standard.size';
import './select.scss';


const NakedSelect = ({ className, id, inputClassName, options, selected, placeholder, required, ...props }) => {
  return (
    <div className="c-input-group">
      <select
        className={
          classNames(
            'c-select',
            className,
            inputClassName,
            'c-input-control'
          )}
        id={id}
        value={selected}
        {...props}
        required
      >
        {placeholder && (
          <option value="" disabled={required}>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          opt instanceof Object ?
            (
              <option value={opt.value} key={`${opt.label}-${opt.value}`}>
                {opt.label}
              </option>
            ) : (
              <option value={opt} key={opt}>
                {opt}
              </option>
            )))}
      </select>
      <label className="c-input-control-placeholder" htmlFor={id}>{placeholder}</label>
      <span className="c-select__arrow">
        <IconAngleDown />
      </span>
    </div>
  );
};

NakedSelect.displayName = 'Select';
NakedSelect.propTypes = {
  className: PropTypes.string,
  /** The value of the id property will be set as the HTML ID attribute on the select. */
  id: PropTypes.string.isRequired,
  /** Callback for the value of the select changing. */
  onChange: PropTypes.func,
  /** An array of items that will be converted to options for the select. */
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ])).isRequired,
  /** The input classname for the select. */
  inputClassName: PropTypes.string,
  /** The value to show as a placeholder. Using this option forces the component to be a controlled component. */
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /** Whether or not the user's input is required. Used in conjunction with the placeholder. */
  required: PropTypes.bool,
  /** The selected item for the select. */
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ]),
  /** Permitted, pre-defined component sizes. */
  size: PropTypes.oneOf(['full', 'large', 'medium', 'small', 'x-small', 'xx-small'])
};
NakedSelect.defaultProps = {
  required: false,
  placeholder: ''
};

const Select = withStandardSize(NakedSelect);

export { NakedSelect };
export default Select;
