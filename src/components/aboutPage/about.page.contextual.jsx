import { FetchOfferExternalIdMetaData } from '@selfcare/core/redux/metadata/offerings/offerings.actions';
import { OfferingExternalReferenceData } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import { UpdateIsBenifyDistributionChannel } from '@selfcare/core/redux/settings/settings.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RetrieveAboutPages } from '../../redux/aws/aboutPages/about.pages.actions';
import { GetAboutPages, IsAboutPagesLoading, IsAboutPagesLoaded } from '../../redux/aws/aboutPages/about.pages.selectors';
import { RetrieveVersionInformation } from '../../redux/aws/version/version.actions';
import { VersionInformation } from '../../redux/aws/version/version.selectors';
import { CartHasPlay } from '../../redux/cart/cart.selectors';
import {
  CreateCartForPlayPurchase,
  UpdateForDefaultBenifyPurchase,
  UpdateForDefaultMobilePurchase
} from '../../redux/orderFlow/order.flow.actions';
import { SetIsInBundleOrderFlow } from '../../redux/ordering/ordering.actions';
import { HasPennyPlayProduct } from '../../redux/products/products.selectors';
import { RetrieveCampaigns } from '../../redux/aws/campaigns/campaigns.actions';
import { ActiveCampaign, IsCampaignLoaded, IsCampaignLoading } from '../../redux/aws/campaigns/campaigns.selectors';
import { IsRunningIOS, IsRunningMobile, ShouldScroll, ScrollPosition } from '../../redux/site/site.selectors';
import AboutPage from './about.page';
import { shouldShowStorefrontToggle } from '../../navigation/sitemap.selectors';
import { ClearCalculateOrderQuote } from 'selfcare-core/src/redux/quote/quote.actions';

import { SetScroll } from '../../redux/site/site.actions';

const mapStateToProps = createStructuredSelector({
  aboutPages: GetAboutPages,
  activeCampaign: ActiveCampaign,
  externalRefId: OfferingExternalReferenceData,
  hasPennyPlayInCart: CartHasPlay,
  hasPennyPlayProduct: HasPennyPlayProduct,
  isAboutPagesLoading: IsAboutPagesLoading,
  isAboutPagesLoaded: IsAboutPagesLoaded,
  isCampaignLoading: IsCampaignLoading,
  isCampaignLoaded: IsCampaignLoaded,
  isRunningIOS: IsRunningIOS,
  isRunningMobile: IsRunningMobile,
  versionInfo: VersionInformation,
  shouldShowStorefrontToggle,
  shouldScroll: ShouldScroll,
  scrollPosition: ScrollPosition
});

const mapActionsToProps = {
  clearOrderQuote: ClearCalculateOrderQuote,
  purchasePlay: CreateCartForPlayPurchase,
  fetchOfferExternalIdMetaData: FetchOfferExternalIdMetaData,
  retrieveAboutPages: RetrieveAboutPages,
  retrieveCampaigns: RetrieveCampaigns,
  retrieveVersionInformation: RetrieveVersionInformation,
  purchaseDefaultMobile: UpdateForDefaultMobilePurchase,
  purchaseDefaultBenify: UpdateForDefaultBenifyPurchase,
  setIsInBundleOrderFlow: SetIsInBundleOrderFlow,
  updateIsBenifyDistributionChannel: UpdateIsBenifyDistributionChannel,
  setScroll: SetScroll
};

export default connect(mapStateToProps, mapActionsToProps)(AboutPage);
