import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { BonusEntitlementData, UsageDetailsForSelectedProduct } from '../../../redux/products/products.selectors';
import { UnfilteredRoamingByServiceId } from '../../../redux/products/serviceFeatures/product.service.feature.selectors';
import { RetrieveConvergentBillerAccountUsageDetailsDbss } from '../../../redux/usage/usage.actions';
import { AllServiceEntitlements } from '../../../redux/usage/usage.selectors';
import ProductUsage from './product.usage';

const mapStateToProps = createStructuredSelector({
  bonusData: BonusEntitlementData,
  entitlements: AllServiceEntitlements,
  roamingByServiceId: UnfilteredRoamingByServiceId,
  usageDetails: UsageDetailsForSelectedProduct
});

const mapActionsToProps = {
  retrieveUsageDetails: RetrieveConvergentBillerAccountUsageDetailsDbss
};


export default connect(mapStateToProps, mapActionsToProps)(ProductUsage);
