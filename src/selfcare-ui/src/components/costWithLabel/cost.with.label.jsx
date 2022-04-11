import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'selfcare-ui/src/components/heading/heading';
import './cost.with.label.scss';


const CostWithLabel = ({ alternate, beforeDiscount, className, cost, label, note, quantity }) => (
  <div
    className={classNames('c-cost-with-label', {
      'c-cost-with-label--default': !alternate,
      'c-cost-with-label--alternate': alternate
    }, className)}
  >
    <div className="c-cost-with-label__main">
      {beforeDiscount && (
        <span className="c-cost-with-label__before-discount">
          {quantity && <span className="c-cost-with-label__quantity">{quantity}</span>}
          <span>{beforeDiscount}</span>
        </span>
      )}
      <div className="c-cost-with-label__cost">
        {quantity && <span className="c-cost-with-label__quantity">{quantity}</span>}
        <span>{cost}</span>
      </div>
      <Heading category="major" tone="quiet" className="c-cost-with-label__label">{label}</Heading>
    </div>
    {alternate && note && <div className="c-cost-with-label__note">{note}</div>}
  </div>
);

CostWithLabel.displayName = 'CostWithLabel';
CostWithLabel.propTypes = {
  /** Option to render the alternate horizontal layout */
  alternate: PropTypes.bool,
  /** Cost prior to discount; left of amount */
  beforeDiscount: PropTypes.node,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Cost amount to be presented. */
  cost: PropTypes.string.isRequired,
  /** The label for the cost amount presented below or beside the cost. */
  label: PropTypes.string.isRequired,
  /** Optional message, such as discount information, for the cost amount. */
  note: PropTypes.string,
  /** Quantity of times to apply the cost */
  quantity: PropTypes.number
};
CostWithLabel.defaultProps = {
  alternate: false
};

export default CostWithLabel;
