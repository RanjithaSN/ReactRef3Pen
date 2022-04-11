import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { CurrentlyInSweden } from '@selfcare/core/redux/session/session.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectedProductMobileEntitlements } from '../../../redux/products/products.selectors';
import ProductInfoBox from './product.info.box';

const mapStateToProps = createStructuredSelector({
  inSweden: CurrentlyInSweden,
  selectedLocale: SelectedLocale,
  selectedProductEntitlements: SelectedProductMobileEntitlements
});

export default connect(mapStateToProps, null)(ProductInfoBox);
