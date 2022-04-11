import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OfferingsMetadata } from '@selfcare/core/redux/metadata/offerings/offerings.selectors';
import MarketingTemplates from './marketing.templates';
import { ActiveCampaign } from '../../../../redux/aws/campaigns/campaigns.selectors';
import { UpdateDecisionGroupForPurchase } from '../../../../redux/orderFlow/order.flow.actions';
import { UserIsAvailable } from '../../../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import {
  IsLoadingOfferingContextForDecision,
  MobileAndBroadbandAndBenifyMarketingTemplates
} from '../../../../redux/ordering/ordering.selectors';
import { StudentSsnCheck } from '../../../../redux/studentOffers/studentOffers.actions';
import { SubscriberSSN } from 'selfcare-core/src/redux/subscriber/subscriber.selectors';

const mapStateToProps = createStructuredSelector({
  activeCampaign: ActiveCampaign,
  isLoadingDecisions: IsLoadingOfferingContextForDecision,
  marketingTemplates: MobileAndBroadbandAndBenifyMarketingTemplates,
  haveUser: UserIsAvailable,
  offeringsMetadata: OfferingsMetadata,
  subscriberSSN: SubscriberSSN
});

const mapActionsToProps = {
  retrieveCodes: RetrieveCodes,
  updateDecisionGroupForPurchase: UpdateDecisionGroupForPurchase,
  studentSSNCheck: StudentSsnCheck
};

export default connect(mapStateToProps, mapActionsToProps)(MarketingTemplates);
