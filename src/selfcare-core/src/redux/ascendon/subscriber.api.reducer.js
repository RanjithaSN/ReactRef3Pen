import { combineReducers } from 'redux';
import activation from '../activation/activation.reducer';
import address from '../address/address.reducer';
import catalog from '../catalog/catalog.reducer';
import convergentBiller from '../convergentBilling/convergent.billing.reducer';
import fault from '../fault/fault.reducer';
import feasibility from '../feasibility/feasibility.reducer';
import locker from '../locker/locker.reducer';
import messages from '../messages/messages.reducer';
import ordering from '../ordering/ordering.reducer';
import paymentInstrument from '../paymentInstrument/payment.instrument.reducer';
import physicalInventory from '../physicalInventory/physical.inventory.reducer';
import portIn from '../portIn/portin.reducer';
import productContext from '../productContext/product.context.reducer';
import searchInventory from '../searchInventory/search.inventory.reducer';
import offering from '../searchOffers/search.offers.reducer';
import searchOrders from '../searchOrders/search.orders.reducer';
import searchServices from '../searchServices/search.services.reducer';
import searchTransactions from '../searchTransactions/search.transactions.reducer';
import session from '../session/session.reducer';
import oneTimePayment from '../submitOneTimePayment/submit.one.time.payment.reducer';
import subscriber from '../subscriber/subscriber.reducer';
import subscriberInformation from '../subscriberInformation/subscriber.information.reducer';
import subscriberInventory from '../subscriberInventory/subscriber.inventory.reducer';
import subscriberOfferings from '../subscriberOfferings/subscriber.offerings.reducer';
import supportRequest from '../supportRequest/support.request.reducer';
import wallet from '../wallet/wallet.reducer';

export default combineReducers({
  activation,
  address,
  catalog,
  convergentBiller,
  fault,
  feasibility,
  locker,
  messages,
  offering,
  oneTimePayment,
  ordering,
  paymentInstrument,
  physicalInventory,
  portIn,
  productContext,
  searchInventory,
  searchOrders,
  searchServices,
  searchTransactions,
  session,
  subscriber,
  subscriberInformation,
  subscriberOfferings,
  subscriberInventory,
  supportRequest,
  wallet
});
