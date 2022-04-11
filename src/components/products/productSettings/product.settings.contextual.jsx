import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrievePurchasedOfferingContextForModify } from '@selfcare/core/redux/offeringContext/offering.context.actions';
import { SearchServicesIfNotAvailable } from '@selfcare/core/redux/searchServices/search.services.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SubmitOrder } from '../../../redux/checkout/checkout.actions';
import { UpdateAttributeValue } from '../../../redux/orderFlow/attributes/attributes.order.flow.action';
import { DecisionCartUpdateForHideNumber } from '../../../redux/orderFlow/offeringContext/offering.context.actions';
import { UpdateCart } from '../../../redux/orderFlow/order.flow.actions';
import { ProductIdentifier } from '../../../redux/orderFlow/order.flow.selectors';
import { FilterOutPrimaryDecisionsForActiveContext } from '../../../redux/ordering/ordering.selectors';
import { RetrieveProductMetadata, UpdateBroadbandActivationDate } from '../../../redux/products/products.actions';
import { ProductDefaultValues, SelectedProductSetting } from '../../../redux/products/products.selectors';
import { HasPaymentFailureRequestsForSelectedProduct } from '../../../redux/supportRequest/support.request.selectors';
import ProductSettings from './product.settings';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  device: SelectedProductSetting,
  filteredDecisions: FilterOutPrimaryDecisionsForActiveContext,
  hasPaymentFailure: HasPaymentFailureRequestsForSelectedProduct,
  productDefaults: ProductDefaultValues,
  productIdentifier: ProductIdentifier
});
const mapActionsToProps = {
  retrieveProductMetadata: RetrieveProductMetadata,
  retrieveOfferingContextWithDecisions: RetrievePurchasedOfferingContextForModify,
  searchServices: SearchServicesIfNotAvailable,
  submitOrder: SubmitOrder,
  toggleDecisionCartUpdate: DecisionCartUpdateForHideNumber,
  updateAttributeValue: UpdateAttributeValue,
  updateBroadbandActivationDate: UpdateBroadbandActivationDate,
  updateCart: UpdateCart
};

export default connect(mapStateToProps, mapActionsToProps)(ProductSettings);
