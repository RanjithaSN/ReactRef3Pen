import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './cost.scss';


const Cost = ({ alternate, beforeDiscount, className, cost, duration, note, quantity, smallerPrice }) => (
  <div
    className={classNames('c-cost', {
      'c-cost--alternate': alternate
    }, className)}
  >
    <div className="c-cost__main">
      {beforeDiscount && (
        <span className="c-cost__before-discount">
          {quantity && <span className="c-cost__quantity">{quantity}</span>}
          <span>{beforeDiscount}</span>
        </span>
      )}
      <div
        className={classNames('c-cost__cost', {
          'c-cost__cost-smaller-price': smallerPrice
        })}
      >
        {quantity && <span className="c-cost__quantity">{quantity}</span>}
        <span>{cost}</span>
        {duration && <span>{`/${duration}`}</span>}
      </div>
    </div>
    {alternate && note && <div className="c-cost__note">{note}</div>}
  </div>
);

Cost.displayName = 'Cost';
Cost.propTypes = {
  /** Option to render the alternate horizontal layout */
  alternate: PropTypes.bool,
  /** Cost prior to discount; left of amount */
  beforeDiscount: PropTypes.node,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Cost amount to be presented. */
  cost: PropTypes.node.isRequired,
  /** Discount duration to be presented. */
  duration: PropTypes.string,
  /** Optional message, such as discount information, for the cost amount. */
  note: PropTypes.string,
  /** Optional bool. determines if we should lower the font size to match discounted. */
  smallerPrice: PropTypes.bool,
  /** Quantity of times to apply the cost */
  quantity: PropTypes.number
};
Cost.defaultProps = {
  alternate: false,
  duration: ''
};

export default Cost;
