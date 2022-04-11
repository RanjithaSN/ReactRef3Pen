import { RetrieveConvergentBillerAccountUsageDetailsForWirelessProducts } from '@selfcare/core/redux/convergentBillerAccountUsageDetails/convergent.biller.account.usage.details.actions';
import { AllowancesAcrossProducts, AllProductsUsageLoading } from '@selfcare/core/redux/convergentBillerAccountUsageDetails/convergent.biller.account.usage.details.selectors';
import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { SubscriberOfferingsIsLoaded } from '@selfcare/core/redux/subscriberOfferings/subscriber.offerings.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CurrentManagedAccountSubscriberId } from '../../redux/account/account.selectors';
import { ActiveWirelessProducts, AllowancesForSelectedProduct } from '../../redux/products/products.selectors';
import Allowances from './allowance';

const mapStateToProps = createStructuredSelector({
  activeWirelessProducts: ActiveWirelessProducts,
  allowancesAcrossProducts: AllowancesAcrossProducts,
  allowancesForSelectedProduct: AllowancesForSelectedProduct,
  allProductsUsageIsLoading: AllProductsUsageLoading,
  currentManagedAccountSubscriberId: CurrentManagedAccountSubscriberId,
  locale: SelectedLocale,
  offeringsAreLoaded: SubscriberOfferingsIsLoaded
});

const mapActionsToProps = {
  retrieveAllProductsUsage: RetrieveConvergentBillerAccountUsageDetailsForWirelessProducts,
  retrieveCodes: RetrieveCodes
};

export default connect(mapStateToProps, mapActionsToProps)(Allowances);
