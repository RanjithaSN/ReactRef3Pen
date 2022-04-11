import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UpcomingPaymentsAcrossProducts } from '../../redux/products/products.selectors';
import Billing from './billing';


const mapStateToProps = createStructuredSelector({
  locale: SelectedLocale,
  upcomingPaymentsAcrossProducts: UpcomingPaymentsAcrossProducts
});
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Billing);
