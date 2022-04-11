import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withStandardSize } from '../withStandardSize/with.standard.size';
import './input.scss';


export const INPUT_SIZE = {
  FULL: 'full',
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  X_SMALL: 'x-small',
  XX_SMALL: 'xx-small'
};

const NakedInput = ({ className, type, id, forwardRef, ...props }) => {
  const { placeholder, value, ...rest } = props;
  return placeholder ? (
    <div className="c-input-group">
      <input
        id={id}
        ref={forwardRef}
        {...rest}
        type={type}
        value={value}
        className={
          classNames(
            `c-input c-input--${type}`,
            className, 'c-input-control',
            {
              'c-input-null': (value === '' || !value)
            }
          )}
      />
      <label className="c-input-control-placeholder" htmlFor={id}>{placeholder}</label>
    </div>
  ) : (
    <input
      className={
        classNames(
          `c-input c-input--${type}`,
          className
        )}
      type={type}
      id={id}
      ref={forwardRef}
      {...props}
    />
  );
};

const inputSizes = Object.values(INPUT_SIZE);

NakedInput.displayName = 'Input';
NakedInput.propTypes = {
  className: PropTypes.string,
  /** The value of the id property will be set as the HTML ID attribute on the input. */
  id: PropTypes.string.isRequired,
  /** The value of the type property will be set as the HTML type attribute on the input. */
  type: PropTypes.string,
  /** Forwarded ref, optional */
  forwardRef: PropTypes.object,
  /** Placeholder, optional */
  placeholder: PropTypes.string,
  /** Permitted, pre-defined component sizes. */
  size: PropTypes.oneOf([...inputSizes]),
  /** Value of input */
  value: PropTypes.string
};

NakedInput.defaultProps = {
  type: 'text'
};

const Input = withStandardSize(NakedInput);

export { NakedInput };
export default Input;
