import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { DefaultPaymentInstrument } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UpdateAddOn } from '../../../redux/addOns/add.ons.actions';
import { SubmitOrder } from '../../../redux/checkout/checkout.actions';
import { AvailableTopUps, TopUpId } from '../../../redux/products/serviceFeatures/product.service.feature.selectors';
import ProductTopUp from './product.top.up';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  defaultPaymentInstrument: DefaultPaymentInstrument,
  topUpId: TopUpId,
  topUps: AvailableTopUps
});

const mapActionsToProps = {
  submitOrder: SubmitOrder,
  updateAddOn: UpdateAddOn
};

export default connect(mapStateToProps, mapActionsToProps)(ProductTopUp);
