import StudentLandingPage from './student.landing.page';
import { ActiveCampaign, IsCampaignLoaded } from '../../redux/aws/campaigns/campaigns.selectors';
import { RetrieveFaqs } from '../../redux/aws/faq/faq.actions';
import { GetFaqs, IsFaqsLoaded } from '../../redux/aws/faq/faq.selectors';
import { RetrieveLandingPage } from '../../redux/aws/landingPage/landing.page.actions';
import { RetrieveCampaigns } from '../../redux/aws/campaigns/campaigns.actions';
import { IsLandingPageLoading, StudentLandingPageContent, IsLandingPageLoaded } from '../../redux/aws/landingPage/landing.page.selectors';
import { UpdateShouldShowSessionExpiration } from '../../redux/login/login.actions';
import { UpdateForDefaultMobilePurchase } from '../../redux/orderFlow/order.flow.actions';
import { RetrieveDecisionsForOffers } from '../../redux/ordering/ordering.actions';
import { RetrieveCodes } from 'selfcare-core/src/redux/metadata/codes/codes.actions';
import { Fault } from 'selfcare-core/src/redux/fault/fault.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const mapStateToProps = createStructuredSelector({
  activeCampaign: ActiveCampaign,
  isCampaignLoaded: IsCampaignLoaded,
  apiFault: Fault,
  faqs: GetFaqs,
  isFaqsLoaded: IsFaqsLoaded,
  isLandingPageLoading: IsLandingPageLoading,
  landingPage: StudentLandingPageContent,
  isLandingPageLoaded: IsLandingPageLoaded
});

const mapActionsToProps = {
  purchaseDefaultMobile: UpdateForDefaultMobilePurchase,
  retrieveCodes: RetrieveCodes,
  retrieveDecisionsForOffers: RetrieveDecisionsForOffers,
  retrieveFaqs: RetrieveFaqs,
  retrieveLandingPage: RetrieveLandingPage,
  retrieveCampaigns: RetrieveCampaigns,
  updateShouldShowExpiration: UpdateShouldShowSessionExpiration
};

export default connect(mapStateToProps, mapActionsToProps)(StudentLandingPage);
