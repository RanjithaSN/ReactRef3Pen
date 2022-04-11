import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';
import './outline.button.scss';

const OutlineButton = ({ className, variant, ...props }) => (
  <Button className={classNames('c-outline-button', [`c-outline-button--${variant}`], className)} {...props} />
);

OutlineButton.displayName = 'OutlineButton';
OutlineButton.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Theme variant: outline style */
  variant: PropTypes.oneOf(['inverted', 'standard', 'simple'])
};

OutlineButton.defaultProps = {
  variant: 'standard'
};

export default OutlineButton;
