import { Client } from '../../client.selectors';
import { getCdnLinkFromFullURL, mapUSPObjectPropsToArray, sanitizeArticleContent } from '../cdn.helpers';
import { ActiveCampaign } from '../campaigns/campaigns.selectors';
import pathOr from 'ramda/src/pathOr';
import { createSelector } from 'reselect';

const Base = createSelector([
  Client
], (client) => {
  return pathOr(null, ['landingPage'], client);
});

export const LandingPageContent = createSelector([
  Base,
  ActiveCampaign
], (landingPage, activeCampaign) => {
  const landingPageContent = pathOr(null, ['landingPage'], landingPage);
  const archivedLandingPage = pathOr(null, ['custom_fields'], activeCampaign || landingPageContent);

  return {
    hero: {
      actionLabel: pathOr('', ['hero', 'action_label'], archivedLandingPage),
      actionLink: pathOr('', ['hero', 'action_link'], archivedLandingPage),
      header: sanitizeArticleContent(pathOr('', ['hero', 'header'], archivedLandingPage)),
      description: pathOr('', ['hero', 'description'], archivedLandingPage),
      heroImage: getCdnLinkFromFullURL(pathOr('', ['hero', 'hero_image'], archivedLandingPage))
    },
    shop: {
      uniqueSellingPoints: mapUSPObjectPropsToArray(pathOr({}, ['shop', 'unique_selling_points'], archivedLandingPage))
    },
    marketingCallouts: [
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_1', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_1', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_1', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_1', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_1', 'action_link'], archivedLandingPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_2', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_2', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_2', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_2', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_2', 'action_link'], archivedLandingPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_3', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_3', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_3', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_3', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_3', 'action_link'], archivedLandingPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_4', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_4', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_4', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_4', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_4', 'action_link'], archivedLandingPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_5', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_5', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_5', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_5', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_5', 'action_link'], archivedLandingPage)
      }
    ].filter(({ title }) => title),
    crossSellUpsellSection: {
      header: sanitizeArticleContent(pathOr('', ['cross-sell_upsell_section', 'header'], archivedLandingPage)),
      description: pathOr('', ['cross-sell_upsell_section', 'description'], archivedLandingPage),
      heroImage: getCdnLinkFromFullURL(pathOr('', ['cross-sell_upsell_section', 'hero_image'], archivedLandingPage)),
      actionLink: pathOr('', ['cross-sell_upsell_section', 'action_link'], archivedLandingPage)
    }
  };
});

export const StudentLandingPageContent = createSelector([
  Base
], (landingPage) => {
  const archivedLandingPage = pathOr(null, ['studentLandingPage', 'custom_fields'], landingPage);

  return {
    hero: {
      actionLabel: pathOr('', ['hero', 'action_label'], archivedLandingPage),
      actionLink: pathOr('', ['hero', 'action_link'], archivedLandingPage),
      header: sanitizeArticleContent(pathOr('', ['hero', 'header'], archivedLandingPage)),
      description: pathOr('', ['hero', 'description'], archivedLandingPage),
      heroImage: getCdnLinkFromFullURL(pathOr('', ['hero', 'hero_image'], archivedLandingPage))
    },
    shop: {
      uniqueSellingPoints: mapUSPObjectPropsToArray(pathOr({}, ['shop', 'unique_selling_points'], archivedLandingPage))
    },
    marketingCallouts: [
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_1', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_1', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_1', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_1', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_1', 'action_link'], archivedLandingPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_2', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_2', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_2', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_2', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_2', 'action_link'], archivedLandingPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_3', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_3', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_3', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_3', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_3', 'action_link'], archivedLandingPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_4', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_4', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_4', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_4', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_4', 'action_link'], archivedLandingPage)
      },
      {
        title: sanitizeArticleContent(pathOr('', ['marketing_callout_5', 'title'], archivedLandingPage)),
        content: sanitizeArticleContent(pathOr('', ['marketing_callout_5', 'content'], archivedLandingPage)),
        imageUrl: getCdnLinkFromFullURL(pathOr('', ['marketing_callout_5', 'image_url'], archivedLandingPage)),
        actionLabel: pathOr('', ['marketing_callout_5', 'action_label'], archivedLandingPage),
        actionLink: pathOr('', ['marketing_callout_5', 'action_link'], archivedLandingPage)
      }
    ].filter(({ title }) => title),
    crossSellUpsellSection: {
      header: sanitizeArticleContent(pathOr('', ['cross-sell_upsell_section', 'header'], archivedLandingPage)),
      description: pathOr('', ['cross-sell_upsell_section', 'description'], archivedLandingPage),
      heroImage: getCdnLinkFromFullURL(pathOr('', ['cross-sell_upsell_section', 'hero_image'], archivedLandingPage)),
      actionLink: pathOr('', ['cross-sell_upsell_section', 'action_link'], archivedLandingPage)
    }
  };
});

export const IsLandingPageLoading = createSelector([
  Base
], (landingPage) => {
  return landingPage.isLoading;
});

export const IsLandingPageLoaded = createSelector([
  Base
], (landingPage) => {
  return landingPage.isLoaded;
});
