import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import LedgerRow from './ledger.row';
import './ledger.scss';


const LedgerTotal = ({ className, ...props }) => (
  <LedgerRow
    className={classNames('c-ledger__total', className)}
    {...props}
  />
);

LedgerTotal.displayName = 'LedgerTotal';
LedgerTotal.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string
};

export default LedgerTotal;
