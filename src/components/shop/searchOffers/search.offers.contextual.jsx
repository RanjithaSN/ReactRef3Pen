import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { FetchOfferExternalIdMetaData } from '@selfcare/core/redux/metadata/offerings/offerings.actions';
import { ClearCalculateOrderQuote } from '@selfcare/core/redux/quote/quote.actions';
import { ClearSavedCart } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import { ClearSearchOfferings } from '@selfcare/core/redux/searchOffers/search.offers.actions';
import { CurrentSession } from '@selfcare/core/redux/session/session.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ClearApiFault } from 'selfcare-core/src/redux/fault/fault.actions';
import { DisplayOverlayedOfferSummaryPreview } from '../../../redux/orderFlow/offeringContext/offering.context.selectors';
import { CheckForAttributes } from '../../../redux/orderFlow/order.flow.actions';
import { RetrieveDecisionsForOffers } from '../../../redux/ordering/ordering.actions';
import SearchOffersComponent from './search.offers';
import { ClearAddresses } from 'selfcare-core/src/redux/feasibility/feasibility.actions';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  displayOverlayedOfferSummary: DisplayOverlayedOfferSummaryPreview,
  session: CurrentSession
});

const mapActionsToProps = {
  checkForAttributes: CheckForAttributes,
  clearCart: ClearSavedCart,
  clearOrderQuote: ClearCalculateOrderQuote,
  clearApiFault: ClearApiFault,
  clearSearchOffer: ClearSearchOfferings,
  clearAddresses: ClearAddresses,
  fetchOfferExternalIdMetaData: FetchOfferExternalIdMetaData,
  retrieveDecisionsForOffers: RetrieveDecisionsForOffers
};

export default connect(mapStateToProps, mapActionsToProps)(SearchOffersComponent);
