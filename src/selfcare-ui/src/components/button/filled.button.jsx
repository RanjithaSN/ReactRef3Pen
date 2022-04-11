import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';
import './filled.button.scss';

const FilledButton = ({ className, height, variant, ...props }) => (
  <Button
    className={classNames('c-filled-button',
      [`c-filled-button--${variant}`],
      [`c-filled-button--${height}`],
      className)}
    {...props}
  />
);

FilledButton.displayName = 'FilledButton';
FilledButton.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Optional height parameters. `short` renders a small button */
  height: PropTypes.oneOf(['auto', 'short']),
  /** Theme variant: affects the fill color */
  variant: PropTypes.oneOf(['standard', 'high-contrast', 'subtle', 'info', 'success', 'warning', 'error'])
};

FilledButton.defaultProps = {
  height: 'auto',
  variant: 'standard'
};

export default FilledButton;
