import LocaleKeys from '../../../../locales/keys';
import {
  ShopBenifyExternalDisplayNames,
  ShopExternalDisplayNames
} from 'selfcare-core/src/redux/offeringContext/offering.context.constants';

export const isStudentRoute = (history, t) => history.location.pathname.includes(t(LocaleKeys.ROUTES.STUDENT));

export const aboutPageKeyToTemplateTypes = (key, t) => {
  const withStudentRoute = (route) => `${route}/${t(LocaleKeys.ROUTES.STUDENT)}`;
  switch (key) {
  case t(LocaleKeys.ROUTES.ABOUT_BROADBAND_KEY):
    return [ShopExternalDisplayNames.BROADBAND];
  case t(LocaleKeys.ROUTES.ABOUT_MOBILE_KEY):
    return [ShopExternalDisplayNames.MOBILE];
  case t(LocaleKeys.ROUTES.ABOUT_BENIFY_DEALS_KEY):
    return [ShopBenifyExternalDisplayNames.BENIFY];
  case withStudentRoute(t(LocaleKeys.ROUTES.ABOUT_MOBILE_KEY)):
    return [ShopExternalDisplayNames.STUDENT_MOBILE];
  case withStudentRoute(t(LocaleKeys.ROUTES.ABOUT_BROADBAND_KEY)):
    return [ShopExternalDisplayNames.STUDENT_BROADBAND];
  case withStudentRoute(t(LocaleKeys.ROUTES.ABOUT_BUNDLE_KEY)):
    return [
      ShopExternalDisplayNames.STUDENT_MOBILE,
      ShopExternalDisplayNames.STUDENT_BROADBAND
    ];
  default:
    return [
      ShopExternalDisplayNames.MOBILE,
      ShopExternalDisplayNames.BROADBAND
    ];
  }
};

export const aboutPageKeyToCampaignType = (t, key) => {
  switch (key) {
  case t(LocaleKeys.ROUTES.ABOUT_BROADBAND_KEY):
    return [ShopExternalDisplayNames.CAMPAIGN_BROADBAND];
  case t(LocaleKeys.ROUTES.ABOUT_MOBILE_KEY):
    return [ShopExternalDisplayNames.CAMPAIGN_MOBILE];
  default:
    return [ShopExternalDisplayNames.CAMPAIGN_MOBILE, ShopExternalDisplayNames.CAMPAIGN_BROADBAND];
  }
};
