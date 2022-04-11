import { AreAddressesLoading } from '@selfcare/core/redux/address/address.selectors';
import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { ClearAddresses, FetchAddressesByPostalCode, RetrieveSubscriberOffers } from '@selfcare/core/redux/feasibility/feasibility.actions';
import { AddressList, FeasibilityAttributeData, FeasibilityIsLoaded, FeasibilityIsLoading } from '@selfcare/core/redux/feasibility/feasibility.selectors';
import { UpdateAddressAndSearchOffers } from '@selfcare/core/redux/searchOffers/search.offers.actions';
import { SearchOffersAddress } from '@selfcare/core/redux/searchOffers/search.offers.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DismissEligibilityModalAction } from '../../redux/searchOffers/search.offers.actions';
import { EligibilityModalDismissed } from '../../redux/searchOffers/search.offers.selectors';
import EligibilityModal from './eligibility.modal';


const mapStateToProps = createStructuredSelector({
  addressList: AddressList,
  apiFault: Fault,
  areAddressesLoading: AreAddressesLoading,
  autoLaunchDismissed: EligibilityModalDismissed,
  defaultAddress: SearchOffersAddress,
  feasibilityIsLoaded: FeasibilityIsLoaded,
  feasibilityIsLoading: FeasibilityIsLoading,
  feasibilityAttributeData: FeasibilityAttributeData
});

const mapActionsToProps = {
  clearApiFault: ClearApiFault,
  clearAddresses: ClearAddresses,
  fetchAddresses: FetchAddressesByPostalCode,
  onClose: DismissEligibilityModalAction,
  onSubmit: UpdateAddressAndSearchOffers,
  retrieveSubscriberOffers: RetrieveSubscriberOffers
};

export default connect(mapStateToProps, mapActionsToProps)(EligibilityModal);
