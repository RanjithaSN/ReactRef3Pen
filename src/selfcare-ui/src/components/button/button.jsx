import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './button.scss';


const Button = ({ className, innerRef, type, width, ...props }) => (
  <button className={classNames('c-button', [`c-button--${width}`], className)} type={type} ref={innerRef} {...props} />
);

Button.displayName = 'Button';
Button.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Forward `ref` down the component tree (SFCs don't otherwise support `ref` forwarding) */
  innerRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** Standard HTML type attribute for a button */
  type: PropTypes.string,
  /** Optional width parameters. `full` renders a button taking up 100% of its parent's width. `flex` will set flex-grow to 1 for mobile screens and 0 elsewhere */
  width: PropTypes.oneOf(['auto', 'full', 'flex', 'min'])
};

Button.defaultProps = {
  type: 'button',
  width: 'auto'
};

export default Button;
