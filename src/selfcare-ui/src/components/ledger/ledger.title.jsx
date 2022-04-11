import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from '../heading/heading';
import './ledger.scss';


const LedgerTitle = ({ className, children }) => (
  <Heading category="major" className={classNames('c-ledger__title', className)}>{children}</Heading>
);

LedgerTitle.displayName = 'LedgerTitle';
LedgerTitle.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  children: PropTypes.node
};

export default LedgerTitle;
