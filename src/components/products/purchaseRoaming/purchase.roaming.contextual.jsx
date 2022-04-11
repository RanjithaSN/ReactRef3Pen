import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { DefaultPaymentInstrument } from '@selfcare/core/redux/paymentInstrument/payment.instrument.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UpdateAddOn } from '../../../redux/addOns/add.ons.actions';
import { SubmitOrder } from '../../../redux/checkout/checkout.actions';
import { AvailableInternationalRoaming, AvailableRoamLikeHome, InternationalRoamingId, RoamingByServiceId, RoamLikeHomeId } from '../../../redux/products/serviceFeatures/product.service.feature.selectors';
import PurchaseRoaming from './purchase.roaming';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  availableRoamLikeHome: AvailableRoamLikeHome,
  availableInternationalRoaming: AvailableInternationalRoaming,
  defaultPaymentInstrument: DefaultPaymentInstrument,
  roamingByServiceId: RoamingByServiceId,
  internatinalRoamingId: InternationalRoamingId,
  roamLikeHomeId: RoamLikeHomeId
});

const mapActionsToProps = {
  submitOrder: SubmitOrder,
  updateAddOn: UpdateAddOn
};

export default connect(mapStateToProps, mapActionsToProps)(PurchaseRoaming);
