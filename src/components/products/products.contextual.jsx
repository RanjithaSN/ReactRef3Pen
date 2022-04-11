import { RetrieveConvergentBillerSummary } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { IsOfferingExternalReferenceDataLoading } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { CurrentlyInSweden } from '@selfcare/core/redux/session/session.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { IsSubmitOrderLoaded, IsSubmittingOrder } from '@selfcare/core/redux/submitOrder/submit.order.selectors';
import { SubscriberOfferingsIsLoaded } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.selectors';
import { RetrieveSupportRequest } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Products from './products';
import { SetCurrentOfferAndRetrieveAttributes, UnpauseProductBeforeRenewal, UpdateSelectedProduct } from '../../redux/products/products.actions';
import { IsHandlingProductAction, MainProductsList, SelectedProduct, SelectedProductValue } from '../../redux/products/products.selectors';
import { FetchMobileProductAddOns, RetrieveProductAddOns } from '../../redux/products/serviceFeatures/product.service.feature.actions';
import { TopUpReadyToLoad } from '../../redux/products/serviceFeatures/product.service.feature.selectors';
import { Page2 } from '../../redux/inAccountHelp/in.accounthelp.selectors';
import { IsRunningMobile } from '../../redux/site/site.selectors';
import { RefreshSubscriberOfferings } from '../../redux/subscriberOfferings/subscriber.offerings.actions';
import { SetContextPageData } from '../../redux/inAccountHelp/in.accounthelp.actions';
import {
  ActivationRequestForSelectedProduct,
  ActivationRequestIdForOpenSelectedProduct,
  ActivationRequestIdForSelectedProduct,
  HasPaymentFailureRequestsForSelectedProduct,
  PaymentFailureRequestsForSelectedProduct
} from '../../redux/supportRequest/support.request.selectors';

const mapStateToProps = createStructuredSelector({
  activationRequestForSelectedProduct: ActivationRequestForSelectedProduct,
  activationRequestIdForSelectedProduct: ActivationRequestIdForSelectedProduct,
  activationRequestIdForOpenSelectedProduct: ActivationRequestIdForOpenSelectedProduct,
  apiFault: Fault,
  areSubscriberOfferingsLoaded: SubscriberOfferingsIsLoaded,
  hasPaymentFailure: HasPaymentFailureRequestsForSelectedProduct,
  isHandlingProductAction: IsHandlingProductAction,
  isOfferingReferenceDataLoading: IsOfferingExternalReferenceDataLoading,
  isRunningMobile: IsRunningMobile,
  isSubmittingOrder: IsSubmittingOrder,
  isSubmitOrderLoaded: IsSubmitOrderLoaded,
  paymentFailure: PaymentFailureRequestsForSelectedProduct,
  productList: MainProductsList,
  offersLoaded: SubscriberOfferingsIsLoaded,
  selectedLocale: SelectedLocale,
  selectedProduct: SelectedProduct,
  selectedProductId: SelectedProductValue,
  serviceFeaturesReadyToLoad: TopUpReadyToLoad,
  page2: Page2,
  inSweden: CurrentlyInSweden
});

const mapActionsToProps = {
  fetchCatalog: FetchMobileProductAddOns,
  fetchMobileServiceFeatures: RetrieveProductAddOns,
  restoreProduct: UnpauseProductBeforeRenewal,
  refreshOffers: RefreshSubscriberOfferings,
  retrieveCodes: RetrieveCodes,
  retrieveConvergentBillerSummary: RetrieveConvergentBillerSummary,
  retrieveSupportRequest: RetrieveSupportRequest,
  setCurrentOfferAndRetrieveAttributes: SetCurrentOfferAndRetrieveAttributes,
  updateSelectedProduct: UpdateSelectedProduct,
  setContextPageData: SetContextPageData
};

export default connect(mapStateToProps, mapActionsToProps)(Products);
