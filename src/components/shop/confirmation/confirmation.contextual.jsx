import { RetrieveAddresses } from '@selfcare/core/redux/address/address.actions';
import { ClearConvergentBillerAccounts } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { FetchAddressById } from '@selfcare/core/redux/feasibility/feasibility.actions';
import { FeasibilityAttributeData, SubscriberFeasibilityAddress } from '@selfcare/core/redux/feasibility/feasibility.selectors';
import { UpdateIsBenifyDistributionChannel } from '@selfcare/core/redux/settings/settings.actions';
import { ClearSubmittedOrderData } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import { Subscriber, SubscriberDisplayMobilePhone, SubscriberFullName, SubscriberIsLoading, SubscriberSSN } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { CreateSupportRequest } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { PortInCurrentMSISDNField, PortInDateField, PortInPortToMSISDNField, PortInSsnField } from '@selfcare/core/redux/supportRequest/support.request.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ServiceIdentifierFromCart } from '../../../redux/cart/cart.selectors';
import { QuoteHasPlay, SubmitOrderProductList } from '../../../redux/checkout/checkout.selectors';
import { LeaveOrderConfirmationPage } from '../../../redux/convergentBiller/convergent.biller.actions';
import { OrderIsPortIn } from '../../../redux/orderFlow/attributes/attributes.order.flow.selectors';
import { HasPennyPlayProduct, PortInDateFromAttributesOrCart, PortInNumberFromAttributesOrCart, SubmittedShoppingCartIsPortIn } from '../../../redux/products/products.selectors';
import { SetAndValidateSection } from '../../../redux/progressStepper/progress.stepper.actions';
import { IsRunningMobile } from '../../../redux/site/site.selectors';
import { RefreshSubscriberOfferings } from '../../../redux/subscriberOfferings/subscriber.offerings.actions';
import { RecentlyClosedPortInRequest, RecentlyNewOrOpenPortInRequest } from '../../../redux/supportRequest/support.request.selectors';
import Confirmation from './confirmation';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  feasibilityData: FeasibilityAttributeData,
  hasPennyPlayInCart: QuoteHasPlay,
  hasPennyPlayProduct: HasPennyPlayProduct,
  isPortInOrder: OrderIsPortIn,
  isRunningMobile: IsRunningMobile,
  isSubscriberLoading: SubscriberIsLoading,
  portInCurrentMSISDNField: PortInCurrentMSISDNField,
  portInDate: PortInDateFromAttributesOrCart,
  portInDateField: PortInDateField,
  portInNumber: PortInNumberFromAttributesOrCart,
  portInPortToMSISDNField: PortInPortToMSISDNField,
  portInSsnField: PortInSsnField,
  productList: SubmitOrderProductList,
  recentlyClosedPortInRequest: RecentlyClosedPortInRequest,
  recentlyNewOrOpenPortInRequest: RecentlyNewOrOpenPortInRequest,
  serviceIdentifierFromCart: ServiceIdentifierFromCart,
  subscriber: Subscriber,
  subscriberFeasibilityAddress: SubscriberFeasibilityAddress,
  subscriberMobilePhone: SubscriberDisplayMobilePhone,
  subscriberName: SubscriberFullName,
  subscriberSSN: SubscriberSSN,
  SubmittedShoppingCartIsPortIn: SubmittedShoppingCartIsPortIn
});

const mapActionsToProps = {
  createSupportRequest: CreateSupportRequest,
  clearSubmittedOrderData: ClearSubmittedOrderData,
  ensureDashboardReload: ClearConvergentBillerAccounts,
  fetchAddressById: FetchAddressById,
  leaveOrderConfirmationPage: LeaveOrderConfirmationPage,
  retrieveAddresses: RetrieveAddresses,
  refreshOffers: RefreshSubscriberOfferings,
  setSectionId: SetAndValidateSection,
  updateIsBenifyDistributionChannel: UpdateIsBenifyDistributionChannel
};

export default connect(mapStateToProps, mapActionsToProps)(Confirmation);
