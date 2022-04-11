import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import './floating.action.button.scss';

const FloatingActionButton = ({ children, className, ...props }) => {
  return (
    <FilledButton className={classNames('c-floating-action-button unset-button-min-width', className)} variant="standard" {...props}>
      {children}
    </FilledButton>
  );
};

FloatingActionButton.displayName = 'FloatingActionButton';
FloatingActionButton.propTypes = {
  /** The contents of the FloatingActionButton, should be some sort of icon */
  children: PropTypes.node,
  /** Class name passed down from parent */
  className: PropTypes.string
};

export default FloatingActionButton;
