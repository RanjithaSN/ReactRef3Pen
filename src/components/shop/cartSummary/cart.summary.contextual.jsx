import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { SavedShoppingCartCurrency } from '@selfcare/core/redux/savedCart/saved.cart.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CartHasSubscriberOffers } from '../../../redux/cart/cart.selectors';
import { CartSummaryDiscounts, CartSummaryItems, CartSummarySubTotalAmount, CartSummarySubTotals } from '../../../redux/orderFlow/summary/cart.summary.selectors';
import CartSummary from './cart.summary';

const mapStateToProps = createStructuredSelector({
  currencyCode: SavedShoppingCartCurrency,
  discounts: CartSummaryDiscounts,
  isEditingOffer: CartHasSubscriberOffers,
  items: CartSummaryItems,
  selectedLocale: SelectedLocale,
  subTotals: CartSummarySubTotals,
  subTotalDueToday: CartSummarySubTotalAmount
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(CartSummary);
