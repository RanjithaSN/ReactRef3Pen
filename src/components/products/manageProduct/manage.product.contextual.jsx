import { RetrieveConvergentBillerAccountDetails } from '@selfcare/core/redux/convergentBillerAccountDetails/convergent.biller.account.details.actions';
import { ConvergentBillerAccountDetailsIsLoaded, ConvergentBillerAccountDetailsIsLoading } from '@selfcare/core/redux/convergentBillerAccountDetails/convergent.biller.account.details.selectors';
import { ClearSubmittedOrderData } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import { SearchSupportRequest } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SetActiveOfferIds } from '../../../redux/orderFlow/order.flow.actions';
import { IsHandlingProductAction, SelectedProduct } from '../../../redux/products/products.selectors';
import ManageProduct from './manage.product';

const mapStateToProps = createStructuredSelector({
  isAccountDetailsLoaded: ConvergentBillerAccountDetailsIsLoaded,
  isAccountDetailsLoading: ConvergentBillerAccountDetailsIsLoading,
  isHandlingProductAction: IsHandlingProductAction,
  selectedProduct: SelectedProduct
});

const mapActionsToProps = {
  clearOrderData: ClearSubmittedOrderData,
  retrieveAccountDetails: RetrieveConvergentBillerAccountDetails,
  searchSupportRequest: SearchSupportRequest,
  setActiveOfferIds: SetActiveOfferIds
};

export default connect(mapStateToProps, mapActionsToProps)(ManageProduct);
