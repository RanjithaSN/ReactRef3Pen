import { MoreInformationItemProps } from './landing.page.base.helpers';
import { setSiteScrollPosition } from '../../helpers/site.scroll.helpers';
import LocaleKeys from '../../locales/keys';
import CrossSellUpSell from '../crossSellUpSell/cross.sell.up.sell';
import DashboardHero from '../dashboard/dashboardHero/dashboard.hero';
import Faq from '../getHelp/faq/faq.contextual';
import MarketingCallout from '../marketingCallout/marketing.callout';
import MoreInformationGrid from '../moreInformationGrid/more.information.grid';
import PageContent, { Main } from '../pageContent/page.content';
import MetaData from '../pageMetaData/meta.data.handler.contextual';
import GuidedShoppingSelection from '../shop/guidedShopSelection/guided.shopping.selection';
import { toggleOptions } from '../../hooks/storefrontModeHooks/storefront.mode.helpers';
import StorefrontToggle from '../storefrontToggle/storefront.toggle.contextual';
import Heading from 'ui/components/heading/heading';
import PageSection from 'ui/components/page/page-section';
import SectionWrapper from 'ui/components/page/section-wrapper';
import Stack from 'ui/components/stack/stack';
import React, { useEffect, useState } from 'react';
import path from 'ramda/src/path';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';
import './landing.page.base.scss';

const LandingPageBase = ({
  activeCampaign,
  isCampaignLoading,
  isCampaignLoaded,
  isLandingPageLoading,
  isLandingPageLoaded,
  isFaqsLoading,
  isFaqsLoaded,
  className,
  history,
  faqs,
  isStudentPage,
  landingPage,
  retrieveCampaigns,
  location,
  purchaseDefaultMobile,
  retrieveFaqs,
  retrieveLandingPage,
  t,
  updateShouldShowExpiration,
  cards,
  scrollPosition,
  setScroll,
  shouldScroll
}) => {
  const ShopSectionId = 'Shop';
  const BUY_MOBILE_ACTION = 'BuyMobile';

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  useEffect(() => {
    if (shouldScroll) {
      setSiteScrollPosition(scrollPosition);
      setScroll();
    }
  }, [shouldScroll]);

  useEffect(() => {
    if (faqs.length) {
      setFilteredFaqs(
        faqs.filter((faq) => faq.categories.includes('landing-page'))
      );
    }
  }, [faqs]);

  useEffect(() => {
    if (!isLandingPageLoading && !isLandingPageLoaded) {
      retrieveLandingPage();
    }
  }, [isLandingPageLoading, isLandingPageLoaded]);

  useEffect(() => {
    if (!isCampaignLoading && !isCampaignLoaded) {
      retrieveCampaigns();
    }
  }, [isCampaignLoading, isCampaignLoaded]);

  useEffect(() => {
    if (!isFaqsLoading && !isFaqsLoaded) {
      retrieveFaqs();
    }
  }, [isFaqsLoading, isFaqsLoaded]);

  useEffect(() => {
    if (location) {
      updateShouldShowExpiration(location.search.includes('sessionExpired'));
    }
  }, [location]);

  const scrollToShop = () => {
    document.getElementById(ShopSectionId).scrollIntoView({
      behavior: 'smooth'
    });
  };

  const landingPageAction = (action) => {
    if (action.indexOf(BUY_MOBILE_ACTION) !== -1) {
      purchaseDefaultMobile(history.push);
    } else {
      scrollToShop();
    }
  };

  const marketingCalloutAction = (action) => {
    if (action.indexOf(BUY_MOBILE_ACTION) !== -1) {
      purchaseDefaultMobile(history.push);
    } else {
      history.push(action);
    }
  };

  const HeroSection = () => (
    <DashboardHero
      actionLabel={landingPage.hero.actionLabel}
      action={() => landingPageAction(landingPage.hero.actionLink)}
      header={landingPage.hero.header}
      subHeader={landingPage.hero.description}
      imageUrls={{
        basic: landingPage.hero.heroImage,
        webp: `${landingPage.hero.heroImage}.webp`
      }}
    />
  );

  const ShopSection = () => (
    <SectionWrapper black>
      <PageSection as={Stack} id={ShopSectionId}>
        <MoreInformationGrid items={landingPage.shop.uniqueSellingPoints} />
        <Heading level={2}>
          {activeCampaign ? t(LocaleKeys.CAMPAIGN_GUIDED_SHOPPING_SELECTION.HEADER) : t(LocaleKeys.GUIDED_SHOPPING_SELECTION.HEADER)}
        </Heading>
        {enableDiscounts() && <StorefrontToggle options={toggleOptions(location.pathname, t)} />}
        <GuidedShoppingSelection cards={cards} />
      </PageSection>
    </SectionWrapper>
  );

  const CrossSellSection = () => (
    <div className="c-landing-page__section">
      <CrossSellUpSell
        actionLink={landingPage.crossSellUpsellSection.actionLink}
        description={landingPage.crossSellUpsellSection.description}
        header={landingPage.crossSellUpsellSection.header}
        imageUrls={{
          basic: landingPage.crossSellUpsellSection.heroImage,
          webp: `${landingPage.crossSellUpsellSection.heroImage}.webp`
        }}
      />
    </div>
  );

  const MarketingCalloutSection = () => landingPage.marketingCallouts.map((callout) => {
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
        action={
          callout.actionLink ?
            () => marketingCalloutAction(callout.actionLink) :
            undefined
        }
      />
    );
  });

  const FaqSection = () => (filteredFaqs.length ? (
    <div className="c-landing-page__faq-wrapper">
      <div className="c-landing-page__faq-container">
        <Faq
          category="landing-page"
          headingCategory="brand"
          faqs={filteredFaqs}
        />
      </div>
    </div>
  ) : null);

  return (
    <>
      <MetaData
        title={t(isStudentPage ? LocaleKeys.META_DATA.STUDENT_LANDING_PAGE.TITLE : LocaleKeys.META_DATA.LANDING_PAGE.TITLE)}
        description={t(isStudentPage ? LocaleKeys.META_DATA.STUDENT_LANDING_PAGE.DESCRIPTION : LocaleKeys.META_DATA.LANDING_PAGE.DESCRIPTION)}
      />
      {landingPage && HeroSection()}
      <PageContent
        variant="flush-no-max"
        className={classNames('c-landing-page', className)}
      >
        <Main>
          {landingPage && ShopSection()}
          <MarketingCalloutSection />
          {path(['crossSellUpsellSection', 'header'], landingPage) && (
            <CrossSellSection />
          )}
          {FaqSection()}
        </Main>
      </PageContent>
    </>
  );
};

LandingPageBase.displayName = 'LandingPageBase';
LandingPageBase.propTypes = {
  /** Application fault */
  apiFault: PropTypes.shape({
    translatedMessage: PropTypes.string
  }),
  /** Currently active campaign */
  activeCampaign: PropTypes.object,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Array of faq objects */
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
      id: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
      ]),
      title: PropTypes.string,
      uri: PropTypes.string
    })
  ),
  /** Use to determine if the landing page is loading for our spinner */
  isLandingPageLoading: PropTypes.bool.isRequired,
  /** Use to determine if the landing page is for student context */
  isStudentPage: PropTypes.bool,
  /** Landing Page object retrieved from cms */
  landingPage: PropTypes.shape({
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
    /** The hero portion of the CMS data */
    hero: PropTypes.shape({
      /** Label for action button */
      actionLabel: PropTypes.string,
      /** Path to be routed to when the marketing callout is clicked */
      actionLink: PropTypes.string,
      /** String description */
      description: PropTypes.string,
      /** String value for the header */
      header: PropTypes.string,
      /** The URL of the marketing image used on the hero section */
      heroImage: PropTypes.string
    }),
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
    /** The shop portion of the CMS data */
    shop: PropTypes.shape({
      /** Array of unique selling points */
      uniqueSellingPoints: PropTypes.arrayOf(MoreInformationItemProps)
    })
  }),
  /** The location object provided by the router */
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string
  }),
  /** Action to purchase the default mobile product */
  purchaseDefaultMobile: PropTypes.func.isRequired,
  /** Fetches the faq objects */
  retrieveFaqs: PropTypes.func.isRequired,
  /** Action to get the landing page from the s3 bucket */
  retrieveLandingPage: PropTypes.func.isRequired,
  /** Action to get the campaigns from the s3 bucket */
  retrieveCampaigns: PropTypes.func.isRequired,
  /** [Ignore Doc] translate */
  t: PropTypes.func,
  /** The function to update the state of whether or not the session expiration banner should be visible */
  updateShouldShowExpiration: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  scrollPosition: PropTypes.number.isRequired,
  shouldScroll: PropTypes.bool.isRequired,
  setScroll: PropTypes.func.isRequired
};

export default LandingPageBase;
