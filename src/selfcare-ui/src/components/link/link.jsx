import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Clickable from './clickable';
import './link.scss';


const Link = ({ appearance, className, disabled, ...props }) => (
  <Clickable className={classNames('c-link', 'unset-button-min-width', [`c-link--${appearance}`, disabled && 'c-link--disabled'], className)} disabled={Boolean(disabled)} {...props} />
);

Link.displayName = 'Link';
Link.propTypes = {
  /** Indicates the context in which this link is rendered */
  appearance: PropTypes.oneOf(['inline', 'standalone']),
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Indicates whether the link is disabled */
  disabled: PropTypes.bool
};
Link.defaultProps = {
  appearance: 'standalone'
};
export default Link;
