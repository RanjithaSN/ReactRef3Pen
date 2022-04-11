import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ledger.scss';

const LedgerRow = ({ className, name, amount, note, beforeDiscount, subtext }) => (
  <div className={classNames('c-ledger__row', className)}>
    <div className="c-ledger__row-name">
      {name}
      {subtext && <em className="c-ledger__row-subtext">{subtext}</em>}
    </div>
    {note && <em className="c-ledger__row-note">{note}</em>}
    {beforeDiscount && <span className="c-ledger__row-note c-ledger__row-discount">{beforeDiscount}</span>}
    {amount && <div className="c-ledger__row-amount">{amount}</div>}
  </div>
);

LedgerRow.displayName = 'LedgerRow';
LedgerRow.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Total amount to display in the row; far right */
  amount: PropTypes.node,
  /** Amount prior to discount; left of amount */
  beforeDiscount: PropTypes.node,
  /** Name of the row's amount item; far left */
  name: PropTypes.node,
  /** Extra descriptive information about amount; right */
  note: PropTypes.node,
  /** Extra description information about name; left */
  subtext: PropTypes.node
};

export default LedgerRow;
