import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { CurrentlyInSweden } from '@selfcare/core/redux/session/session.selectors';
import { SubscriberOfferingsIsLoaded, SubscriberOfferingsIsLoading } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.selectors';
import { OfferingHasPaymentFailureSupportRequest } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MainProductsList, ProductMobileEntitlements } from '../../../redux/products/products.selectors';
import { FetchMobileProductAddOns, RetrieveProductAddOns } from '../../../redux/products/serviceFeatures/product.service.feature.actions';
import { TopUpReadyToLoad } from '../../../redux/products/serviceFeatures/product.service.feature.selectors';
import { GetActivationRequestIdForProduct } from '../../../redux/supportRequest/support.request.selectors';
import Products from './products';

const mapStateToProps = createStructuredSelector({
  allUsage: ProductMobileEntitlements,
  areSubscriberOfferingsLoaded: SubscriberOfferingsIsLoaded,
  getActivationRequestIdForProduct: GetActivationRequestIdForProduct,
  inSweden: CurrentlyInSweden,
  offers: MainProductsList,
  offersLoading: SubscriberOfferingsIsLoading,
  locale: SelectedLocale,
  serviceFeaturesReadyToLoad: TopUpReadyToLoad
});

const mapActionsToProps = {
  fetchCatalog: FetchMobileProductAddOns,
  fetchMobileServiceFeatures: RetrieveProductAddOns,
  offeringHasPaymentFailure: OfferingHasPaymentFailureSupportRequest,
  retrieveCodes: RetrieveCodes
};

export default connect(mapStateToProps, mapActionsToProps)(Products);
