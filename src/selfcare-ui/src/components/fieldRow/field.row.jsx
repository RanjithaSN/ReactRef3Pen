import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './field.row.scss';

const FieldRow = ({ className, children }) => (
  <div className={classNames('c-field-row', className)}>
    {children}
  </div>
);

FieldRow.displayName = 'FieldRow';
FieldRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
};
FieldRow.defaultProps = {};

export default FieldRow;
