import { CdnApiUrl } from '@selfcare/core/redux/settings/settings.selectors';

export const WP_TAGS = {
  INTERNAL: 'internal',
  PRIVATE: 'private',
  PUBLIC: 'public',
  PRIVATE_MOBILE: 'private-mobile',
  PRIVATE_COAX: 'private-coax',
  PRIVATE_OLAN: 'private-olan',
  SEARCH_ONLY: 'search'
};

export const WP_POST_TYPES = {
  GENERAL_ARTICLES: 'general_articles',
  GUIDES: 'guides',
  VIDEOS: 'videos'
};

const containsNonEmptyPropertyValues = (obj) => {
  return Object.values(obj).reduce((result, propertyValue) => result || !!propertyValue, false);
};

export const getCdnLinkFromFullURL = (fullUrl) => {
  // Quick check to make sure we are working with strings, then do regex work
  const safeUrl = typeof fullUrl === 'string' ? fullUrl : '';
  const regex = /.*(uploads.*)\?/;
  const imageMatch = safeUrl.match(regex);
  return imageMatch && imageMatch.length === 2 ? `${CdnApiUrl}/media/${imageMatch[1]}` : '';
};

export const mapUSPObjectPropsToArray = (obj) => {
  const itemKeys = Object.keys(obj || {}).sort();
  return itemKeys.reduce((result, itemKey) => {
    if (containsNonEmptyPropertyValues(obj[itemKey])) {
      result.push(obj[itemKey]);
    }
    return result;
  }, []);
};

export const sanitizeArticleContent = (content) => {
  const safeContent = typeof content === 'string' ? content : '';
  /*
    BasicRegex = replace links and images that use the normal src and href links
    SrcSetRegex = grab any srcset quoted attributes - we use this to split and replace
    SrcSetItemRegex = look at each item in the srcset and grab the real part of the URL
    */
  const basicRegex = /(href="|src=")(.(?!"))*?(uploads.*?)\?.*?"/g;
  const srcSetRegex = /srcset=".*?"/g;
  const srcSetItemRegex = /.*(https.*(uploads.*?)\?.*)\s\d+w/;
  const srcSetMatches = safeContent.match(srcSetRegex) || [];
  const srcSetReplacements = {};
  srcSetMatches.forEach((match) => {
    const pieces = match.split(',');
    pieces.forEach((srcSetItem) => {
      const itemMatch = srcSetItem.match(srcSetItemRegex);
      if (itemMatch && itemMatch.length === 3) {
        srcSetReplacements[itemMatch[1]] = `${CdnApiUrl}/media/${itemMatch[2]}`;
      }
    });
  });
  const srcSetTransformedString = srcSetReplacements === {} ?
    safeContent :
    Object.keys(srcSetReplacements).reduce((prev, current) => {
      return prev.replace(current, srcSetReplacements[current]);
    }, safeContent);
  return srcSetTransformedString
    .replace(basicRegex, `$1${CdnApiUrl}/media/$3"`);
};

export const shouldSubscriberSeeContent = (subscriber, tags, fromSearch = false) => {
  let subscriberHasAccess = false;
  let isInternal = false;
  let isPrivate = false;
  let isPrivateMobile = false;
  let isPrivateBroadband = false;
  let isSearchOnly = false;

  if (Array.isArray(tags)) {
    isInternal = tags.some((tag) => {
      return tag.name === WP_TAGS.INTERNAL;
    });

    isPrivate = tags.some((tag) => {
      return tag.name === WP_TAGS.PRIVATE;
    });

    isPrivateMobile = tags.some((tag) => {
      return tag.name === WP_TAGS.PRIVATE_MOBILE;
    });

    isPrivateBroadband = tags.some((tag) => {
      return tag.name === WP_TAGS.PRIVATE_COAX || tag.name === WP_TAGS.PRIVATE_OLAN;
    });

    isSearchOnly = tags.some((tag) => {
      return tag.name === WP_TAGS.SEARCH_ONLY;
    });
  } else {
    isInternal = tags === WP_TAGS.INTERNAL;
    isPrivateBroadband = tags === WP_TAGS.PRIVATE_COAX || tags === WP_TAGS.PRIVATE_OLAN;
    isPrivateMobile = tags === WP_TAGS.PRIVATE_MOBILE;
    isSearchOnly = tags === WP_TAGS.SEARCH_ONLY;
    isPrivate = tags === WP_TAGS.PRIVATE;
  }

  // If the articles are tagged search hide them if not searching
  if (isSearchOnly && !fromSearch) {
    return subscriberHasAccess;
  }
  const isPrivateContent = isPrivate || isPrivateMobile || isPrivateBroadband;
  const allAccessPass = subscriber.isLoggedIn && subscriber.hasMobileOffers && subscriber.hasBroadbandOffers;
  const mobilePass = subscriber.isLoggedIn && subscriber.hasMobileOffers;
  const broadbandPass = subscriber.isLoggedIn && subscriber.hasBroadbandOffers;
  // Should only show articles that are not internal for subscriber without an agent flag
  if (!isInternal) {
    if ((!isPrivateContent || allAccessPass)) {
      subscriberHasAccess = true;
    } else if (isPrivateMobile && mobilePass) {
      subscriberHasAccess = true;
    } else if (isPrivateBroadband && broadbandPass) {
      subscriberHasAccess = true;
    }
  }
  // TODO subscriber flag to show internal articles

  return subscriberHasAccess;
};
