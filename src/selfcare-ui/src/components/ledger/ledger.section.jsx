import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ledger.scss';

const LedgerSection = ({ borderless, className, children }) => (
  <div
    className={classNames('c-ledger__section', className, {
      'c-ledger__section--borderless': borderless
    })}
  >
    {children}
  </div>
);

LedgerSection.displayName = 'LedgerSection';
LedgerSection.propTypes = {
  /** Whether the section should render without borders */
  borderless: PropTypes.bool,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  children: PropTypes.node
};
LedgerSection.defaultProps = {
  borderless: false
};

export default LedgerSection;
