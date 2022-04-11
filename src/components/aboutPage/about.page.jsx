import { ShopPlayExternalDisplayNames } from '@selfcare/core/redux/offeringContext/offering.context.constants';
import { Parser } from 'html-to-react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { withI18n } from 'react-i18next';
import { Redirect, withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import OutlineButton from 'selfcare-ui/src/components/button/outline.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconButton from 'selfcare-ui/src/components/iconButton/icon.button';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Modal from 'selfcare-ui/src/components/modal/modal';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import IconArrowThinRight from 'selfcare-ui/src/icons/react-icons/arrow-thin-right';
import PageSection from 'ui/components/page/page-section';
import Stack from 'ui/components/stack/stack';
import { setSiteScrollPosition } from '../../helpers/site.scroll.helpers';
import { toggleOptions } from '../../hooks/storefrontModeHooks/storefront.mode.helpers';
import useSSRAction from '../../hooks/useSSRAction';
import LocaleKeys from '../../locales/keys';
import {
  getAccountNavItem,
  getNotFoundNavItem,
  getPennyPlayNavItem,
  getViewArticleNavItem
} from '../../navigation/sitemap.selectors';
import CrossSellUpSell from '../crossSellUpSell/cross.sell.up.sell';
import DashboardHero from '../dashboard/dashboardHero/dashboard.hero';
import AppStoreBadge from '../downloadAppButton/app.store.badge';
import GooglePlayBadge from '../downloadAppButton/google.play.badge';
import { ARTICLES, findPostByKeyOrId } from '../getHelp/post.helper';
import { ProductBenefitsItemProps } from '../landingPageBase/landing.page.base.helpers';
import MarketingCallout from '../marketingCallout/marketing.callout';
import MoreInformationGrid from '../moreInformationGrid/more.information.grid';
import PageContent, { Main } from '../pageContent/page.content';
import MetaData from '../pageMetaData/meta.data.handler.contextual';
import SearchOffers from '../shop/searchOffers/search.offers.contextual';
import StorefrontToggle from '../storefrontToggle/storefront.toggle.contextual';
import withAuth from '../withAuth/with.auth.contextual';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';
import './about.page.scss';

const AboutPage = (props) => {
  const {
    aboutPages,
    activeCampaign,
    clearOrderQuote,
    externalRefId,
    fetchOfferExternalIdMetaData,
    hasPennyPlayInCart,
    hasPennyPlayProduct,
    history,
    isAboutPagesLoading,
    isAboutPagesLoaded,
    isCampaignLoading,
    isCampaignLoaded,
    isRunningIOS,
    isRunningMobile,
    match,
    purchasePlay,
    retrieveAboutPages,
    retrieveCampaigns,
    retrieveVersionInformation,
    purchaseDefaultMobile,
    purchaseDefaultBenify,
    setIsInBundleOrderFlow,
    t,
    updateIsBenifyDistributionChannel,
    shouldShowStorefrontToggle,
    versionInfo
  } = props;

  const { scrollPosition, shouldScroll, setScroll } = props;
  useEffect(() => {
    if (shouldScroll) {
      setSiteScrollPosition(scrollPosition);
      setScroll();
    }
  }, [scrollPosition, shouldScroll, setScroll]);

  useEffect(() => {
    if (!isAboutPagesLoading && !isAboutPagesLoaded) {
      retrieveAboutPages();
    }
  }, [isAboutPagesLoaded]);

  useEffect(() => {
    if (!isCampaignLoading && !isCampaignLoaded) {
      retrieveCampaigns();
    }
  }, [isCampaignLoading, isCampaignLoaded]);

  useSSRAction(() => {
    retrieveVersionInformation();
  }, [retrieveVersionInformation]);

  useEffect(() => {
    if (match.params.aboutPage === t(LocaleKeys.ROUTES.ABOUT_BENIFY_DEALS_KEY)) {
      if (versionInfo && !versionInfo.benifyEnabled) {
        history.replace('/');
      }
      updateIsBenifyDistributionChannel(true);
    } else {
      updateIsBenifyDistributionChannel(false);
    }
  }, [history, match.params.aboutPage, t, updateIsBenifyDistributionChannel, versionInfo]);

  useEffect(() => {
    if (match.params.aboutPage === t(LocaleKeys.ROUTES.ABOUT_BUNDLE_KEY)) {
      setIsInBundleOrderFlow(true);
    } else {
      setIsInBundleOrderFlow(false);
    }
  }, [match.params.aboutPage, setIsInBundleOrderFlow, t]);

  const htmlParser = new Parser();

  const PlayModalOpenModes = {
    closed: 'closed',
    hasPlayProduct: 'hasPlayProduct',
    isRunningIOS: 'isRunningIOS'
  };
  const BUY_PLAY_ACTION = 'BuyPlay';
  const BUY_MOBILE_ACTION = 'BuyMobile';
  const BUY_BENIFY_DEALS = 'BuyBenifyDeals';
  const [isLoading, setIsLoading] = useState(false);
  const [requestedPlayData, setRequestedPlayData] = useState(false);
  const [aboutPageParam, setAboutPageParam] = useState(null);
  const [aboutPage, setAboutPage] = useState(null);
  const [isInvalidRoute, setIsInvalidRoute] = useState(false);
  const [playModalOpenMode, setPlayModalOpenMode] = useState(PlayModalOpenModes.closed);

  const aboutPageMetadata = useMemo(() => {
    const aboutPage = match.params.aboutPage.includes('student') ?
      `STUDENT_ABOUT_${match.params.aboutPage.substring(0, match.params.aboutPage.indexOf('/'))}` :
      `ABOUT_${match.params.aboutPage}`;

    return {
      title: t(LocaleKeys.META_DATA[aboutPage.toUpperCase()].TITLE),
      description: t(LocaleKeys.META_DATA[aboutPage.toUpperCase()].DESCRIPTION)
    };
  }, [match.params.aboutPage, t]);

  const validAboutPages = [
    t(LocaleKeys.ROUTES.ABOUT_BROADBAND_KEY),
    t(LocaleKeys.ROUTES.ABOUT_BUNDLE_KEY),
    t(LocaleKeys.ROUTES.ABOUT_MOBILE_KEY),
    t(LocaleKeys.ROUTES.ABOUT_PENNY_KEY),
    t(LocaleKeys.ROUTES.PENNY_PLAY_KEY),
    t(LocaleKeys.ROUTES.ABOUT_BENIFY_DEALS_KEY)
  ];

  useEffect(() => {
    if (!validAboutPages.find((page) => page === match.params.aboutPage)) {
      setIsInvalidRoute(true);
      history.push(getNotFoundNavItem().url);
    } else {
      setAboutPageParam(match.params.aboutPage);
    }
  }, [match.params.aboutPage, validAboutPages]);

  const aboutOfferContexts = [
    t(LocaleKeys.ROUTES.ABOUT_BROADBAND_KEY),
    t(LocaleKeys.ROUTES.ABOUT_BUNDLE_KEY),
    t(LocaleKeys.ROUTES.ABOUT_MOBILE_KEY)
  ];

  useEffect(() => {
    if (!isLoading && aboutPages.length) {
      const isOfferAboutPage = aboutOfferContexts.includes(aboutPageParam);
      setAboutPage(
        findPostByKeyOrId(
          aboutPages,
          isOfferAboutPage && activeCampaign ? `${aboutPageParam}/campaign` : aboutPageParam
        )
      );
    }
  }, [isLoading, aboutOfferContexts, activeCampaign, aboutPages, aboutPage, aboutPageParam]);

  useEffect(() => {
    if (aboutPage) {
      clearOrderQuote();
    }
  }, [aboutPage, clearOrderQuote]);

  useEffect(() => {
    const playOfferId = path([ShopPlayExternalDisplayNames.PLAY, 'offerId'], externalRefId);
    if (
      path(['key'], aboutPage) === t(LocaleKeys.ROUTES.PENNY_PLAY_KEY) &&
      !playOfferId &&
      !isLoading &&
      !requestedPlayData
    ) {
      fetchOfferExternalIdMetaData(ShopPlayExternalDisplayNames, null);
      setIsLoading(true);
      setRequestedPlayData(true);
    }
  }, [aboutPage, externalRefId, fetchOfferExternalIdMetaData, isLoading, requestedPlayData, t]);

  useEffect(() => {
    const playOfferId = path([ShopPlayExternalDisplayNames.PLAY, 'offerId'], externalRefId);
    if (playOfferId) {
      setIsLoading(false);
    }
  }, [externalRefId]);

  useEffect(() => {
    if (hasPennyPlayProduct && hasPennyPlayInCart) {
      setPlayModalOpenMode(PlayModalOpenModes.hasPlayProduct);
    }
  }, [hasPennyPlayProduct, hasPennyPlayInCart, PlayModalOpenModes.hasPlayProduct]);

  const aboutPageAction = useCallback(
    (action) => {
      if (action.indexOf(BUY_PLAY_ACTION) !== -1) {
        if (hasPennyPlayProduct) {
          setPlayModalOpenMode(PlayModalOpenModes.hasPlayProduct);
        } else if (isRunningIOS) {
          setPlayModalOpenMode(PlayModalOpenModes.isRunningIOS);
        } else {
          setIsLoading(true);
          purchasePlay(history.push);
        }
      } else if (action.indexOf(BUY_MOBILE_ACTION) !== -1) {
        setIsLoading(true);
        purchaseDefaultMobile(history.push);
      } else if (action.indexOf(BUY_BENIFY_DEALS) !== -1) {
        setIsLoading(true);
        purchaseDefaultBenify(history.push);
      } else {
        history.push(action);
      }
    },
    [
      PlayModalOpenModes.hasPlayProduct,
      PlayModalOpenModes.isRunningIOS,
      isRunningIOS,
      purchasePlay,
      purchaseDefaultBenify,
      purchaseDefaultMobile,
      history,
      hasPennyPlayProduct,
      setIsLoading,
      setPlayModalOpenMode
    ]
  );

  const scrollIntoView = (element) => {
    document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    });
  };

  const renderHeroSection = () => (
    <DashboardHero
      actionLabel={aboutPage.hero.actionLabel}
      action={() => scrollIntoView('.c-about-page__wrapper')}
      header={aboutPage.hero.header}
      subHeader={aboutPage.information}
      imageUrls={{
        basic: aboutPage.hero.heroImage,
        webp: `${aboutPage.hero.heroImage}.webp`
      }}
    />
  );

  const MarketingCalloutSection = () =>
    aboutPage.marketingCallouts.map((callout) => {
      return (
        <MarketingCallout
          key={callout.title}
          content={callout.content}
          title={callout.title}
          imageUrls={{
            basic: callout.imageUrl,
            webp: `${callout.imageUrl}.webp`
          }}
          actionLabel={callout.actionLabel}
          action={callout.actionLink ? () => aboutPageAction(callout.actionLink) : undefined}
        />
      );
    });

  const CrossSellUpSellSection = () => (
    <CrossSellUpSell
      actionLink={aboutPage.crossSellUpsellSection.actionLink}
      description={aboutPage.crossSellUpsellSection.description}
      header={aboutPage.crossSellUpsellSection.header}
      imageUrls={{
        basic: aboutPage.crossSellUpsellSection.heroImage,
        webp: `${aboutPage.crossSellUpsellSection.heroImage}.webp`
      }}
    />
  );

  const generatePlayModal = () => {
    if (playModalOpenMode === PlayModalOpenModes.isRunningIOS) {
      return (
        <Modal
          onClose={() => setPlayModalOpenMode(PlayModalOpenModes.closed)}
          heading={t(LocaleKeys.ORDERING.WELCOME_IOS)}
          content={
            <>
              <Paragraph tone="normal">{t(LocaleKeys.ORDERING.WELCOME_IOS_TEXT)}</Paragraph>
              <div>
                <IconButton
                  orientation="reversed"
                  icon={<IconArrowThinRight />}
                  className="c-about-page__account-button"
                  onClick={() => setPlayModalOpenMode(PlayModalOpenModes.closed)}
                >
                  {t(LocaleKeys.ORDERING.WELCOME_IOS_ACCEPT)}
                </IconButton>
              </div>
            </>
          }
        />
      );
    }

    return (
      <Modal
        onClose={() => setPlayModalOpenMode(PlayModalOpenModes.closed)}
        heading={t(LocaleKeys.ORDERING.WELCOME_PLAY)}
        content={
          <>
            <Paragraph tone="normal">{t(LocaleKeys.ORDERING.WELCOME_TEXT_PLAY)}</Paragraph>
            {isRunningMobile && (
              <FilledButton
                className="c-about-page__play_button"
                onClick={() => history.push(getPennyPlayNavItem().url)}
              >
                {t(LocaleKeys.ORDERING.LAUNCH_PENNY_PLAY)}
              </FilledButton>
            )}
            {!isRunningMobile && (
              <>
                <Heading className="c-about-page__mobile_badge_header" category="major" tone="normal">
                  {t(LocaleKeys.ORDERING.MOBILE_APP)}
                </Heading>
                <Paragraph className="c-about-page__mobile_badge_text" tone="normal">
                  {t(LocaleKeys.ORDERING.MOBILE_APP_TEXT)}
                </Paragraph>
                <div className="c-about-page__badges">
                  <AppStoreBadge url={path(['appStoreLink'], versionInfo)} />
                  <GooglePlayBadge url={path(['playStoreLink'], versionInfo)} />
                </div>
                <div>
                  <OutlineButton
                    className="c-about-page__article-button"
                    onClick={() => history.push(`${getViewArticleNavItem().url}/${ARTICLES.LEARN_MORE_MOBILE_APP}`)}
                  >
                    {t(LocaleKeys.ORDERING.LEARN_MORE)}
                  </OutlineButton>
                </div>
                <div>
                  <IconButton
                    orientation="reversed"
                    icon={<IconArrowThinRight />}
                    className="c-about-page__account-button"
                    onClick={() => history.push(getAccountNavItem().url)}
                  >
                    {t(LocaleKeys.ORDERING.GO_TO_DASHBOARD)}
                  </IconButton>
                </div>
              </>
            )}
          </>
        }
      />
    );
  };

  if (isInvalidRoute) {
    return <Redirect to={getNotFoundNavItem().url} />;
  }

  const onSearchOfferLoading = (isSearchOfferLoading = false) => {
    setIsLoading(isSearchOfferLoading);
  };

  return (
    <>
      {aboutPage && renderHeroSection()}
      <PageContent className="c-about-page" variant="flush-no-max">
        <MetaData title={aboutPageMetadata.title} description={aboutPageMetadata.description} />
        <Main>
          {aboutPage && (
            <>
              <div className="c-about-page__wrapper">
                {!!aboutPage.productInformation.length && (
                  <PageSection className="c-about-page__section">
                    <MoreInformationGrid items={aboutPage.productInformation} />
                  </PageSection>
                )}
                <div className="c-about-page__offer-details c-about-page__section">
                  <>{htmlParser.parse(aboutPage.offerDetails)}</>
                </div>
                <PageSection as={Stack} id="Shop">
                  {shouldShowStorefrontToggle && enableDiscounts() && (
                    <StorefrontToggle options={toggleOptions(props.location.pathname, t)} />
                  )}
                </PageSection>
                {path(['key'], aboutPage) !== t(LocaleKeys.ROUTES.PENNY_PLAY_KEY) &&
                  path(['key'], aboutPage) !== t(LocaleKeys.ROUTES.ABOUT_PENNY_KEY) && (
                  <div className="c-about-page__section c-about-page__shop">
                    <SearchOffers
                      fromLandingPage
                      isCampaign={Boolean(activeCampaign)}
                      loadingHandler={(isSearchOfferLoading) => onSearchOfferLoading(isSearchOfferLoading)}
                      section={aboutPageParam}
                      productsMoreInformation={aboutPage.productsMoreInformation}
                    />
                  </div>
                )}
              </div>
              {Boolean(aboutPage.marketingCallouts.length) && <MarketingCalloutSection />}
              {path(['crossSellUpsellSection', 'header'], aboutPage) && <CrossSellUpSellSection />}
              {playModalOpenMode !== PlayModalOpenModes.closed && generatePlayModal()}
            </>
          )}
          <LoadingIndicator isLoading={isAboutPagesLoading || isLoading} />
        </Main>
      </PageContent>
    </>
  );
};

AboutPage.propTypes = {
  /** About Pages from redux */
  aboutPages: PropTypes.arrayOf(
    PropTypes.shape({
      /** ID of wordpress post */
      id: PropTypes.number.isRequired,
      /** Key used for pretty URLs */
      key: PropTypes.string.isRequired,
      /** The cross-sell/upsell section of the CMS data */
      crossSellUpsellSection: PropTypes.shape({
        /** String value for the header */
        header: PropTypes.string,
        /** String value for the description */
        description: PropTypes.string,
        /** URL of the image used in hero */
        heroImage: PropTypes.string,
        /** Path to be routed to when the marketing callout is clicked */
        actionLink: PropTypes.string
      }),
      /** Hero section details */
      hero: PropTypes.shape({
        /** Label for action button */
        actionLabel: PropTypes.string,
        /** Path to be routed to when the marketing callout is clicked */
        actionLink: PropTypes.string,
        /** Title of the aboutPage */
        header: PropTypes.string.isRequired,
        /** Image URL of the aboutPage */
        heroImage: PropTypes.string.isRequired
      }).isRequired,
      /** HTML string specifying additional details */
      offerDetails: PropTypes.string.isRequired,
      /** Details for moreInformationGrid */
      information: PropTypes.string.isRequired,
      /** Marketing callout sections. */
      marketingCallouts: PropTypes.arrayOf(
        PropTypes.shape({
          /** Label for action button */
          actionLabel: PropTypes.string,
          /** Path to be routed to when the marketing callout is clicked */
          actionLink: PropTypes.string,
          /** Html content */
          content: PropTypes.string,
          /** URL for the marketing callout image. */
          imageUrl: PropTypes.string,
          /** String value for the title */
          title: PropTypes.string
        })
      ),
      /** Details for productBenefits */
      productInformation: PropTypes.arrayOf(ProductBenefitsItemProps).isRequired
    })
  ).isRequired,
  /** Currently active campaign */
  activeCampaign: PropTypes.object,
  /** Func to reset order quote values. */
  clearOrderQuote: PropTypes.func.isRequired,
  /** External reference id */
  externalRefId: PropTypes.object,
  /** Function to get the metadata and offers */
  fetchOfferExternalIdMetaData: PropTypes.func.isRequired,
  /** Whether the user has the Play product in the cart or not. */
  hasPennyPlayInCart: PropTypes.bool.isRequired,
  /** Whether the user has purchased the Play product or not. */
  hasPennyPlayProduct: PropTypes.bool.isRequired,
  /** History object from router */
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  /** Whether you are in bundle or not */
  setIsInBundleOrderFlow: PropTypes.func.isRequired,
  /** Whether the user is running IOS or not. */
  isRunningIOS: PropTypes.bool.isRequired,
  /** Whether the user is running on our app. */
  isRunningMobile: PropTypes.bool.isRequired,
  /** AboutPages loading flag */
  isAboutPagesLoading: PropTypes.bool.isRequired,
  /** Match object from router */
  match: PropTypes.shape({
    params: PropTypes.shape({
      /** ID or key of destination aboutPage */
      aboutPage: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  /** Action to purchase the default mobile product */
  purchaseDefaultMobile: PropTypes.func.isRequired,
  /** Action to purchase the default benify product */
  purchaseDefaultBenify: PropTypes.func.isRequired,
  /** Allows user to start the shop flow to purchase play. */
  purchasePlay: PropTypes.func.isRequired,
  /** Retrieve AboutPages from S3 */
  retrieveAboutPages: PropTypes.func.isRequired,
  /** Retrieve campaigns from S3 */
  retrieveCampaigns: PropTypes.func.isRequired,
  /** Fetches the current version information from WP */
  retrieveVersionInformation: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Update if it is the benify distribution channel */
  updateIsBenifyDistributionChannel: PropTypes.func.isRequired,
  /** App and google store links */
  versionInfo: PropTypes.shape({
    /** link for the app store */
    appStoreLink: PropTypes.string,
    /** whether the benify route is enabled. */
    benifyEnabled: PropTypes.bool,
    /** link for the play store */
    playStoreLink: PropTypes.string
  }),
  shouldShowStorefrontToggle: PropTypes.bool,
  scrollPosition: PropTypes.number.isRequired,
  shouldScroll: PropTypes.bool.isRequired,
  setScroll: PropTypes.func.isRequired
};

export default withAuth(compose(withI18n(), withRouter)(AboutPage), {
  allowAccessWithoutAuth: true
});
