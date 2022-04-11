import { UpdateIsBenifyDistributionChannel } from '@selfcare/core/redux/settings/settings.actions';
import { RetrieveSupportRequestTypes, SearchSupportRequest } from '@selfcare/core/redux/supportRequest/support.request.actions';
import { RetrieveWallet } from '@selfcare/core/redux/wallet/wallet.actions';
import { WalletIsLoaded } from '@selfcare/core/redux/wallet/wallet.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RetrieveAddressesOnce } from '../../redux/address/address.actions';
import { IsSearchSupportLoaded } from '../../redux/supportRequest/support.request.selectors';
import Account from './account';

const mapStateToProps = createStructuredSelector({
  isWalletLoaded: WalletIsLoaded,
  isSearchSupportLoaded: IsSearchSupportLoaded
});

const mapActionsToProps = {
  retrieveAddressesOnce: RetrieveAddressesOnce,
  retrieveSupportRequestTypes: RetrieveSupportRequestTypes,
  searchSupportRequest: SearchSupportRequest,
  retrieveWallet: RetrieveWallet,
  updateIsBenifyDistributionChannel: UpdateIsBenifyDistributionChannel
};

export default connect(mapStateToProps, mapActionsToProps)(Account);
