import { Location } from '../redux/router/router.selectors';
import { createSelector } from 'reselect';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';
import SiteMap from './sitemap';

const generateSiteMapWithUrls = (siteSection, rootUrl = '') => {
  Object.keys(siteSection).forEach((key) => {
    if (siteSection[key] && siteSection[key].id) {
      const url = `${rootUrl}/${siteSection[key].id}`;
      siteSection[key].url = url; // eslint-disable-line no-param-reassign
      generateSiteMapWithUrls(siteSection[key], url);
    }
  });

  if (!enableDiscounts()) {
    delete siteSection['student'];
  }

  return siteSection;
};

/* Extracts properties for a nav item, often removing children from parent nodes */
export const extract = ({ display, hideBackButton, id, url, uid }) => ({
  display,
  hideBackButton,
  id,
  url,
  uid
});

export const getSiteMap = createSelector(
  SiteMap,
  (siteMap) => generateSiteMapWithUrls(siteMap)
);

const findNode = (newSiteMap, path) => {
  if (path.length > 0) {
    const keys = Object.keys(newSiteMap);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < keys.length; i += 1) {
      if (newSiteMap[keys[i]].id === path[0]) {
        return findNode(newSiteMap[keys[i]], path.slice(1));
      }
    }

    // No node found in current layer - undefined
    return undefined;
  }

  // No more path left, we found our node
  return newSiteMap;
};

export const findPageByUrl = (url = '') => {
  const noDigitsRegex = /^\d+-?\d*$/;

  const paths = url.split('/').filter((path) => path !== '' && !(noDigitsRegex.test(path)));
  const siteMap = getSiteMap();
  let node;

  if (paths.length) {
    node = findNode(siteMap, paths);
  }

  if (node) {
    return extract(node);
  }
  return node;
};

export const getAboutNavItem = createSelector(
  getSiteMap,
  (siteMap) => extract(siteMap.about)
);

export const getAboutBroadbandNavItem = createSelector(
  getSiteMap,
  (siteMap) => extract(siteMap.about.broadband)
);

export const getAboutStudentBroadbandNavItem = createSelector(
  getSiteMap,
  (siteMap) => {
    const broadNav = extract(siteMap.about.broadband.student);
    return broadNav;
  }
);

export const getAboutBundleNavItem = createSelector(
  getSiteMap,
  (siteMap) => extract(siteMap.about.bundle)
);

export const getAboutStudentBundleNavItem = createSelector(
  getSiteMap,
  (siteMap) => extract(siteMap.about.bundle.student)
);

export const getAboutMobileNavItem = createSelector(
  getSiteMap,
  (siteMap) => {
    const mobileNav = extract(siteMap.about.mobile);
    return mobileNav;
  }
);

export const getAboutStudentMobileNavItem = createSelector(
  getSiteMap,
  (siteMap) => {
    const mobileNav = extract(siteMap.about.mobile.student);
    return mobileNav;
  }
);

export const getAboutPennyNavItem = createSelector(
  getSiteMap,
  (siteMap) => extract(siteMap.about.penny)
);

export const getAboutPennyPlayNavItem = createSelector(
  getSiteMap,
  (siteMap) => extract(siteMap.about.pennyPlay)
);

export const getEntireAccountNavItem = createSelector(
  getSiteMap,
  (siteMap) => siteMap.account
);

export const getBillingNavItem = createSelector(
  getEntireAccountNavItem,
  (account) => account.payments
);

export const getEntireProductsNavItem = createSelector(
  getEntireAccountNavItem,
  (account) => account.products
);

export const getProductsNavItem = createSelector(
  getEntireProductsNavItem,
  (products) => extract(products)
);

export const getHierarchyNavItem = () => (extract(getEntireAccountNavItem().hierarchy));

const getEntireSupportRequestsNavItem = createSelector(
  getEntireAccountNavItem,
  (account) => account.supportRequests
);

export const getSupportRequestsNavItem = createSelector(
  getEntireSupportRequestsNavItem,
  (supportRequests) => extract(supportRequests)
);

export const getSupportRequestsCreate = () => {
  return getEntireSupportRequestsNavItem().create;
};

export const getSupportRequestsDetails = () => {
  return getEntireSupportRequestsNavItem().details;
};

export const getManageNavItem = () => (extract(getEntireAccountNavItem().manage));

export const getAccountNavItem = createSelector(
  getEntireAccountNavItem,
  (account) => {
    return {...extract(account), exact: true};
  }
);

export const getPaymentMethodsNavItem = createSelector(
  getEntireAccountNavItem,
  (account) => account.paymentMethods
);

export const getAddPaymentMethodNavItem = createSelector(
  getPaymentMethodsNavItem,
  (paymentMethods) => paymentMethods.add
);

export const getEditPaymentMethodNavItem = createSelector(
  getPaymentMethodsNavItem,
  (paymentMethods) => paymentMethods.edit
);

export const getSearchNavItem = () => {
  return getSiteMap().search;
};

export const getCartNavItem = () => {
  return getSiteMap().cart;
};

export const getNotificationNavItem = () => {
  return getSiteMap().notification;
};

export const getProfileNavItem = () => {
  return getSiteMap().profile;
};

export const getPrivacyNavItem = () => {
  return getSiteMap().privacy;
};

export const getLegalNoticesNavItem = () => {
  return getSiteMap()['legal-notices'];
};

export const getReturnPolicyNavItem = () => {
  return getSiteMap()['return-policy'];
};

export const getSiteMapNavItem = () => {
  return getSiteMap().sitemap;
};

export const getEntireShopNavItem = createSelector(
  getSiteMap,
  (siteMap) => siteMap.shop
);

export const getShopNavItem = createSelector(
  getEntireShopNavItem,
  (shop) => extract(shop)
);

export const getEntireNewOfferNavItem = () => {
  return getEntireShopNavItem().newOffer;
};

export const getEntireOfferNavItem = () => {
  return getEntireShopNavItem().offer;
};

export const getOfferDetailstNavItem = () => {
  return getEntireOfferNavItem().details;
};

export const getEntirePurchasedOfferNavItem = () => {
  return getEntireShopNavItem().purchasedOffer;
};

export const getEditNewOfferNavItem = () => {
  return getEntireNewOfferNavItem().edit;
};

export const getEditPurchasedOfferNavItem = () => {
  return getEntirePurchasedOfferNavItem().edit;
};

export const getAddNewOfferNavItem = () => {
  return getEntireNewOfferNavItem().add;
};

export const getConfigureOfferNavItem = () => {
  return getEntireShopNavItem().configure;
};

export const getUpdatePurchasedOfferNavItem = () => {
  return getEntirePurchasedOfferNavItem().update;
};

export const getUpdateTransitionOfferNavItem = () => {
  return getEntirePurchasedOfferNavItem().transition;
};

export const getShoppingCartNavItem = () => {
  return getEntireShopNavItem().cart;
};

export const getSubscriberInformationNavItem = () => {
  return getEntireShopNavItem().subscriberInformation;
};

export const getCheckoutNavItem = () => {
  return getEntireShopNavItem().checkout;
};

export const getCreateSubscriberNavItem = () => {
  return getEntireShopNavItem().createSubscriber;
};

export const getFinancingNavItem = () => {
  return getEntireShopNavItem().financing;
};

export const getGetHelpNavItem = createSelector(
  getSiteMap,
  (siteMap) => siteMap.getHelp
);

export const getViewArticleNavItem = () => {
  return getGetHelpNavItem().article;
};

export const getViewCategoryNavItem = () => {
  return getGetHelpNavItem().category;
};

export const getViewGuideNavItem = () => {
  return getGetHelpNavItem().guide;
};

export const getViewTopicNavItem = () => {
  return getGetHelpNavItem().topic;
};

export const getViewVideoNavItem = () => {
  return getGetHelpNavItem().video;
};

export const getDirectLivepersonNavItem = () => {
  return getGetHelpNavItem().directHelp;
};

export const getTroubleshooterNavItem = () => {
  return getGetHelpNavItem().troubleshooter;
};

export const getConfirmationNavItem = () => {
  return getEntireShopNavItem().confirmation;
};

export const getLoginNavItem = () => {
  return getSiteMap().login;
};

export const getMobileLogoutNavItem = () => {
  return getSiteMap().mobileAppLogout;
};

export const getSignUpNavItem = () => {
  return getSiteMap().signup;
};

export const getEnvironmentNavItem = () => {
  return getSiteMap().environment;
};

export const getForgotPasswordNavItem = () => {
  return getSiteMap().forgotPassword;
};

export const getPennyPlayNavItem = () => {
  return getSiteMap().pennyPlay;
};

export const shouldShowStorefrontToggle = createSelector([
  Location
],
(location) => {
  const siteMap = getSiteMap();
  return siteMap.about.mobile.url === location.pathname ||
    siteMap.about.bundle.url === location.pathname ||
    siteMap.about.broadband.url === location.pathname ||
    location.pathname.includes('/student');
});

export const getRoamingDetailsNavItem = () => {
  return getSiteMap().roamingDetails;
};

export const getNotFoundNavItem = () => {
  return getSiteMap().notFound;
};

export const getStudentNavItem = createSelector(
  getSiteMap,
  (siteMap) => {
    return siteMap.student;
  }
);
