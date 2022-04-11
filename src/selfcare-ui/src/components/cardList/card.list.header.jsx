import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './card.list.scss';

const CardListHeader = ({ className, children }) => (
  <div className={classNames('c-card-list-header', className)}>
    {children}
  </div>
);

CardListHeader.displayName = 'CardListHeader';

CardListHeader.propTypes = {
  /** Additional or custom header items */
  children: PropTypes.node,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string
};

CardListHeader.defaultProps = {};

export default CardListHeader;
