import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { OfferingContextsByInstanceId } from '@selfcare/core/redux/offeringContext/offering.context.selectors';
import { SearchSupportRequest } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ActiveOfferInstanceId, ProductIdentifier } from '../../../../redux/orderFlow/order.flow.selectors';
import { ModifyScheduledDate, RetrieveProductMetadata, updateFutureActivationDateInStore } from '../../../../redux/products/products.actions';
import { IsHandlingProductAction, ProductDefaultValues, SelectedProduct } from '../../../../redux/products/products.selectors';
import { ActivationRequestIdForOpenSelectedProduct } from '../../../../redux/supportRequest/support.request.selectors';
import ManageActivationDate from './manage.activation.date';


const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  isHandlingProductAction: IsHandlingProductAction,
  supportRequest: ActivationRequestIdForOpenSelectedProduct,
  selectedProduct: SelectedProduct,
  productDefaults: ProductDefaultValues,
  productIdentifier: ProductIdentifier,
  offeringContextsByInstanceId: OfferingContextsByInstanceId,
  activeOfferInstanceId: ActiveOfferInstanceId
});

const mapActionsToProps = {
  clearAPIFault: ClearApiFault,
  retrieveProductMetadata: RetrieveProductMetadata,
  searchSupportRequests: SearchSupportRequest,
  updateActivationDate: ModifyScheduledDate,
  updateFutureActivationDateInStore
};

export default connect(mapStateToProps, mapActionsToProps)(ManageActivationDate);
