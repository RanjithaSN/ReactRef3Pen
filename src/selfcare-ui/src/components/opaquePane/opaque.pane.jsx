import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './opaque.pane.scss';


const OpaquePane = ({ children, className, isLight }) => (
  <div
    className={classNames('c-opaque-pane', className, {
      'c-opaque-pane--light': isLight,
      'c-opaque-pane--dark': !isLight
    })}
  >
    {children}
  </div>
);

OpaquePane.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Whether the overlay should use its light theme */
  isLight: PropTypes.bool
};
OpaquePane.defaultProps = {
  isLight: true
};

export default OpaquePane;
