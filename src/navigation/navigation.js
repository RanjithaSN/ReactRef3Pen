import i18next from 'i18next';
import LocaleKeys from '../locales/keys';
import { findPageByUrl, getAboutBroadbandNavItem, getStudentNavItem, getAboutBundleNavItem, getAboutMobileNavItem, getAboutPennyNavItem, getAboutPennyPlayNavItem, getAccountNavItem, getBillingNavItem, getGetHelpNavItem, getLoginNavItem, getManageNavItem, getProductsNavItem, getRoamingDetailsNavItem } from './sitemap.selectors';

const getFooterNavigation = () => {
  return [
    getAboutPennyNavItem(),
    getGetHelpNavItem(),
    getRoamingDetailsNavItem(),
    // External press page
    {
      href: 'https://news.cision.com/se/penny',
      id: 'penny-press-link',
      display: i18next.t(LocaleKeys.NAVIGATOR.PRESS)
    }
  ];
};

const getLoginNavigation = () => {
  return [
    getLoginNavItem()
  ];
};

const getPrimaryNavigation = (currentSubscriber) => {
  if (currentSubscriber) {
    return [
      getAccountNavItem(),
      getBillingNavItem(),
      getProductsNavItem(),
      getManageNavItem(),
      getGetHelpNavItem()
    ];
  }
  return [
    getAboutMobileNavItem(),
    getAboutBroadbandNavItem(),
    getAboutBundleNavItem(),
    getStudentNavItem(),
    getAboutPennyPlayNavItem(),
    getAboutPennyNavItem(),
    getGetHelpNavItem()
  ];
};

const getMobileNavigationSiteMap = (forSubscriber = false) => {
  return getPrimaryNavigation(forSubscriber);
};

const getNavItemSiblings = (siteMap, currentNavItem) => {
  let result = null;

  siteMap.forEach((navItem) => {
    if (navItem) {
      const { id, children } = navItem;
      if (id === currentNavItem.id) {
        result = siteMap;
      } else if (children) {
        result = result || getNavItemSiblings(children, currentNavItem);
      }
    }
  });

  return result;
};

export const getNavItemAncestor = (siteMap, currentNavItem, parentNavItem = null) => {
  let result = null;

  siteMap.forEach((navItem) => {
    if (navItem) {
      const { id, children } = navItem;
      if (id === currentNavItem.id) {
        result = parentNavItem;
      } else if (children) {
        result = result || getNavItemAncestor(children, currentNavItem, navItem);
      }
    }
  });

  return result;
};

export const getMobileNavItemSiblings = (siteMap, navItem) => {
  return getNavItemSiblings(siteMap, navItem);
};

export const getDesktopNavItemSiblings = (siteMap, navItem) => {
  return getNavItemSiblings(siteMap, navItem);
};

export const getDesktopNavigationHeading = (navItems, navItem) => {
  const { display } = navItem;
  const parent = getNavItemAncestor(navItems, navItem);
  const header = parent ? parent.display : display;

  return header;
};

export const getCustomHeaderToDisplay = (currentNavHeading, customHeaderList) => {
  if (customHeaderList) {
    const header = customHeaderList.find((customHeader) => {
      return customHeader.url === currentNavHeading.url;
    });

    return header ? header.component : null;
  }
  return null;
};

export const buildFooterContent = () => {
  return {
    navItems: getFooterNavigation()
  };
};

export const buildHeaderContent = (selectedBusinessUnit, currentSubscriber) => {
  return {
    brandText: selectedBusinessUnit.name,
    navPrimary: getPrimaryNavigation(currentSubscriber),
    navAncillary: getLoginNavigation()
  };
};

export const buildNavigator = (currentLocation, isLoggedIn) => {
  const currentNavItem = findPageByUrl(currentLocation);
  return {
    currentNavItem,
    mobileSiteMap: getMobileNavigationSiteMap(isLoggedIn)
  };
};
