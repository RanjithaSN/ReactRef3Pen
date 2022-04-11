import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './card.scss';


const CardBody = ({ className, children }) => (
  <div className={classNames('c-card__body', className)}>
    {children}
  </div>
);

CardBody.displayName = 'CardBody';
CardBody.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  children: PropTypes.node
};

export default CardBody;
