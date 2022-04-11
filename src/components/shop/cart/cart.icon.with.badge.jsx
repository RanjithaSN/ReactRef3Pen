import PropTypes from 'prop-types';
import React from 'react';
import NumericalBadge from 'selfcare-ui/src/components/numericalBadge/numerical.badge';
import IconCart from 'selfcare-ui/src/icons/react-icons/cart';
import './cart.icon.with.badge.scss';

class CartIconWithBadge extends React.Component {
  render() {
    const { quantity } = this.props;

    return (
      <div className="c-cart-icon-with-badge">
        <IconCart />
        {Boolean(quantity) && (
          <NumericalBadge className="c-cart-icon-with-badge__badge" badgeNumber={quantity} variant="small" />
        )}
      </div>
    );
  }
}

CartIconWithBadge.displayName = 'CartIconWithBadge';

CartIconWithBadge.defaultProps = {};

CartIconWithBadge.propTypes = {
  /** The number of items in the cart */
  quantity: PropTypes.number.isRequired
};

export default CartIconWithBadge;
