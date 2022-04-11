import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';
import './link.button.scss';


const LinkButton = ({ className, ...props }) => (
  <Button className={classNames('c-link-button', className)} {...props} />
);

LinkButton.displayName = 'FilledButton';
LinkButton.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string
};

export default LinkButton;
