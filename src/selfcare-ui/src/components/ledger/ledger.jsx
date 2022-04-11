import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LedgerRow from './ledger.row';
import LedgerSection from './ledger.section';
import LedgerTitle from './ledger.title';
import LedgerTotal from './ledger.total';

import './ledger.scss';

const Ledger = ({ className, children }) => (
  <div className={classNames('c-ledger', className)}>
    {children}
  </div>
);

Ledger.displayName = 'Ledger';
Ledger.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  children: PropTypes.node
};

export default Ledger;
export { LedgerSection, LedgerRow, LedgerTitle, LedgerTotal };
