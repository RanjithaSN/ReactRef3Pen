import { RetrieveFaqs } from '../../redux/aws/faq/faq.actions';
import { GetFaqs, IsFaqsLoaded, IsFaqsLoading } from '../../redux/aws/faq/faq.selectors';
import { RetrieveLandingPage } from '../../redux/aws/landingPage/landing.page.actions';
import { IsLandingPageLoading, LandingPageContent, IsLandingPageLoaded } from '../../redux/aws/landingPage/landing.page.selectors';
import { UpdateShouldShowSessionExpiration } from '../../redux/login/login.actions';
import { UpdateForDefaultMobilePurchase } from '../../redux/orderFlow/order.flow.actions';
import { getAboutBroadbandNavItem, getAboutBundleNavItem, getAboutMobileNavItem } from '../../navigation/sitemap.selectors';
import withAuth from '../withAuth/with.auth.contextual';
import LocaleKeys from '../../locales/keys';
import LandingPageBase from '../landingPageBase/landing.page.base.contextual';
import { RetrieveCampaigns } from '../../redux/aws/campaigns/campaigns.actions';
import { ActiveCampaign, IsCampaignLoaded, IsCampaignLoading } from '../../redux/aws/campaigns/campaigns.selectors';
import isNil from 'ramda/src/isNil';
import compose from 'ramda/src/compose';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import React, { useCallback } from 'react';
import { withI18n } from 'react-i18next';

const LandingPage =
    withAuth(compose(
      withI18n(),
      withRouter
    )(
      (props) => {
        const history = props.history;
        const navigateToBroadbandAbout = useCallback(() => {
          history.push(getAboutBroadbandNavItem().url);
        }, [history]);

        const navigateToBundleAbout = useCallback(() => {
          history.push(getAboutBundleNavItem().url);
        }, [history]);
        const navigateToMobileAbout = useCallback(() => {
          history.push(getAboutMobileNavItem().url);
        }, [history]);

        const cards = [
          {
            cardInfo: !isNil(props.activeCampaign) ? LocaleKeys.CAMPAIGN_GUIDED_SHOPPING_SELECTION.MOBILE_CARD : LocaleKeys.GUIDED_SHOPPING_SELECTION.MOBILE_CARD,
            onClick: () => {
              navigateToMobileAbout();
            }
          },
          {
            cardInfo: !isNil(props.activeCampaign) ? LocaleKeys.CAMPAIGN_GUIDED_SHOPPING_SELECTION.BROADBAND_CARD : LocaleKeys.GUIDED_SHOPPING_SELECTION.BROADBAND_CARD,
            onClick: () => {
              navigateToBroadbandAbout();
            }
          },
          {
            cardInfo: !isNil(props.activeCampaign) ? LocaleKeys.CAMPAIGN_GUIDED_SHOPPING_SELECTION.BUNDLE_CARD : LocaleKeys.GUIDED_SHOPPING_SELECTION.BUNDLE_CARD,
            onClick: () => {
              navigateToBundleAbout();
            }
          }
        ];

        return <LandingPageBase {...props} cards={cards} />;
      }
    ), {
      allowAccessWithoutAuth: true
    });

const mapStateToProps = createStructuredSelector({
  activeCampaign: ActiveCampaign,
  isCampaignLoading: IsCampaignLoading,
  isCampaignLoaded: IsCampaignLoaded,
  faqs: GetFaqs,
  isFaqsLoading: IsFaqsLoading,
  isFaqsLoaded: IsFaqsLoaded,
  landingPage: LandingPageContent,
  isLandingPageLoading: IsLandingPageLoading,
  isLandingPageLoaded: IsLandingPageLoaded
});

const mapActionsToProps = {
  purchaseDefaultMobile: UpdateForDefaultMobilePurchase,
  retrieveFaqs: RetrieveFaqs,
  retrieveLandingPage: RetrieveLandingPage,
  retrieveCampaigns: RetrieveCampaigns,
  updateShouldShowExpiration: UpdateShouldShowSessionExpiration
};

export default connect(mapStateToProps, mapActionsToProps)(LandingPage);
