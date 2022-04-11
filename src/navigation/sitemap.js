import AuthenticationButton from '../components/login/authentication.button.contextual';
import CartPreview from '../components/shop/cartPreview/cart.preview.contextual';
import LocaleKeys from '../locales/keys';
import IconSearch from 'selfcare-ui/src/icons/react-icons/search';
import IconNotification from 'selfcare-ui/src/icons/react-icons/notification';
import React from 'react';
import i18next from 'i18next';

const withStudentRoute = ({ id, display }) => ({
  id,
  display,
  student: {
    id: i18next.t(LocaleKeys.ROUTES.STUDENT),
    display
  }
});

export default () => ({
  about: {
    id: i18next.t(LocaleKeys.ROUTES.ABOUT),
    uid: 'about',
    display: i18next.t(LocaleKeys.NAVIGATOR.ABOUT),
    broadband: withStudentRoute({
      id: i18next.t(LocaleKeys.ROUTES.ABOUT_BROADBAND_KEY),
      uid: 'about/broadband',
      display: i18next.t(LocaleKeys.NAVIGATOR.ABOUT_BROADBAND)
    }),
    bundle: withStudentRoute({
      id: i18next.t(LocaleKeys.ROUTES.ABOUT_BUNDLE_KEY),
      uid: 'about/bundle',
      display: i18next.t(LocaleKeys.NAVIGATOR.ABOUT_BUNDLE)
    }),
    mobile: withStudentRoute({
      id: i18next.t(LocaleKeys.ROUTES.ABOUT_MOBILE_KEY),
      uid: 'about/mobile',
      display: i18next.t(LocaleKeys.NAVIGATOR.ABOUT_MOBILE)
    }),
    penny: {
      id: i18next.t(LocaleKeys.ROUTES.ABOUT_PENNY_KEY),
      uid: 'about/penny',
      display: i18next.t(LocaleKeys.NAVIGATOR.ABOUT_PENNY)
    },
    pennyPlay: {
      id: i18next.t(LocaleKeys.ROUTES.PENNY_PLAY_KEY),
      uid: 'about/pennyPlay',
      display: i18next.t(LocaleKeys.NAVIGATOR.PENNY_PLAY)
    },
    benifyDeals: {
      id: i18next.t(LocaleKeys.ROUTES.ABOUT_BENIFY_DEALS_KEY),
      uid: 'about/benifyDeals',
      display: i18next.t(LocaleKeys.NAVIGATOR.ABOUT_BENIFY_DEALS)
    }
  },
  account: {
    id: i18next.t(LocaleKeys.ROUTES.ACCOUNT),
    uid: 'account',
    display: i18next.t(LocaleKeys.HEADER_CONTENT.MY_ACCOUNT),
    payments: {
      id: i18next.t(LocaleKeys.ROUTES.PAYMENTS),
      uid: 'account/payments',
      display: i18next.t(LocaleKeys.NAVIGATOR.PAYMENTS)
    },
    paymentMethods: {
      id: i18next.t(LocaleKeys.ROUTES.PAYMENTS_METHODS),
      uid: 'account/paymentMethods',
      add: {
        id: i18next.t(LocaleKeys.ROUTES.PAYMENTS_ADD),
        uid: 'account/paymentMethods/add',
        display: i18next.t(LocaleKeys.NAVIGATOR.EDIT_PAYMENT_INSTRUMENT)
      },
      display: i18next.t(LocaleKeys.NAVIGATOR.PAYMENT_METHODS),
      edit: {
        id: i18next.t(LocaleKeys.ROUTES.PAYMENTS_EDIT),
        uid: 'account/paymentMethods/edit',
        display: i18next.t(LocaleKeys.NAVIGATOR.EDIT_PAYMENT_INSTRUMENT)
      }
    },
    products: {
      id: i18next.t(LocaleKeys.ROUTES.PRODUCTS),
      uid: 'products',
      display: i18next.t(LocaleKeys.NAVIGATOR.PRODUCTS),
      manage: {
        id: i18next.t(LocaleKeys.ROUTES.PRODUCTS_MANAGE),
        uid: 'products/manage',
        display: i18next.t(LocaleKeys.NAVIGATOR.MANAGE)
      }
    },
    hierarchy: {
      id: 'accountHierarchy',
      uid: 'account/hierarchy',
      display: i18next.t(LocaleKeys.NAVIGATOR.HIERARCHY)
    },
    manage: {
      id: i18next.t(LocaleKeys.ROUTES.MANAGE),
      uid: 'manage',
      display: i18next.t(LocaleKeys.NAVIGATOR.MANAGE)
    },
    supportRequests: {
      id: 'accountSupportRequests',
      uid: 'account/supportRequests',
      display: i18next.t(LocaleKeys.NAVIGATOR.SUPPORT_REQUESTS),
      create: {
        id: 'supportRequestsCreate',
        uid: 'account/supportRequests/create',
        display: i18next.t(LocaleKeys.NAVIGATOR.SUPPORT_REQUESTS_MENU.CREATE_SUPPORT_REQUEST)
      },
      details: {
        id: 'supportRequestsDetails',
        uid: 'account/supportRequests/details',
        display: i18next.t(LocaleKeys.NAVIGATOR.SUPPORT_REQUESTS_MENU.DETAILS)
      }
    }
  },
  cart: {
    id: 'cart',
    uid: 'cart',
    display: <CartPreview />
  },
  forgotPassword: {
    id: i18next.t(LocaleKeys.ROUTES.FORGOT_PASSWORD),
    uid: 'environment',
    display: i18next.t(LocaleKeys.FORGOT_PASSWORD.FORGOT_PASSWORD)
  },
  'legal-notices': {
    id: 'legal',
    uid: 'legal',
    display: i18next.t(LocaleKeys.FOOTER_CONTENT.LEGAL_NOTICES)
  },
  getHelp: {
    id: i18next.t(LocaleKeys.ROUTES.GET_HELP),
    uid: 'help',
    display: i18next.t(LocaleKeys.HEADER_CONTENT.GET_HELP),
    article: {
      id: i18next.t(LocaleKeys.ROUTES.GET_HELP_ARTICLE),
      uid: 'help/article',
      display: i18next.t(LocaleKeys.GET_HELP.VIEW_ARTICLE)
    },
    category: {
      id: i18next.t(LocaleKeys.ROUTES.GET_HELP_CATEGORY),
      uid: 'help/category',
      display: i18next.t(LocaleKeys.GET_HELP.VIEW_CATEGORY)
    },
    guide: {
      id: i18next.t(LocaleKeys.ROUTES.GET_HELP_GUIDE),
      uid: 'help/guide',
      display: i18next.t(LocaleKeys.GET_HELP.VIEW_GUIDE)
    },
    topic: {
      id: i18next.t(LocaleKeys.ROUTES.GET_HELP_TOPIC),
      uid: 'help/topic',
      display: i18next.t(LocaleKeys.GET_HELP.VIEW_TOPIC)
    },
    directHelp: {
      id: i18next.t(LocaleKeys.ROUTES.GET_HELP_DIRECT_HELP),
      uid: 'help/directHelp',
      display: i18next.t(LocaleKeys.GET_HELP.DIRECT_HELP)
    },
    troubleshooter: {
      id: i18next.t(LocaleKeys.ROUTES.GET_HELP_TROUBLESHOOTER),
      uid: 'help/troubleshooter',
      display: i18next.t(LocaleKeys.GET_HELP.TROUBLESHOOTER)
    },
    video: {
      id: i18next.t(LocaleKeys.ROUTES.GET_HELP_VIDEO),
      uid: 'help/video',
      display: i18next.t(LocaleKeys.GET_HELP.VIEW_VIDEO)
    }
  },
  login: {
    id: i18next.t(LocaleKeys.ROUTES.LOGIN),
    uid: 'login',
    display: <AuthenticationButton />
  },
  mobileAppLogout: {
    id: 'appLogout',
    uid: 'logout'
  },
  notFound: {
    id: '404',
    uid: '404',
    display: i18next.t(LocaleKeys.NOT_FOUND.TITLE)
  },
  notification: {
    id: 'notification',
    uid: 'notification',
    display: <IconNotification />
  },
  pennyPlay: {
    id: i18next.t(LocaleKeys.ROUTES.PENNY_PLAY_KEY),
    uid: 'pennyPlay',
    display: i18next.t(LocaleKeys.NAVIGATOR.PENNY_PLAY)
  },
  privacy: {
    id: 'privacy',
    uid: 'privacy',
    display: i18next.t(LocaleKeys.FOOTER_CONTENT.PRIVACY)
  },
  profile: {
    id: 'profile',
    uid: 'profile',
    display: <AuthenticationButton />
  },
  'return-policy': {
    id: 'return',
    uid: 'return',
    display: i18next.t(LocaleKeys.FOOTER_CONTENT.RETURN_POLICY)
  },
  roamingDetails: {
    id: i18next.t(LocaleKeys.ROUTES.ROAMING),
    uid: 'roaming',
    display: i18next.t(LocaleKeys.ROAMING_DETAILS.TITLE)
  },
  search: {
    id: 'search',
    uid: 'search',
    display: <IconSearch />
  },
  shop: {
    id: i18next.t(LocaleKeys.ROUTES.SHOP),
    uid: 'shop',
    display: i18next.t(LocaleKeys.HEADER_CONTENT.SHOP),
    cart: {
      id: i18next.t(LocaleKeys.ROUTES.SHOP_CART),
      uid: 'shop/cart',
      display: i18next.t(LocaleKeys.CART.SHOPPING_CART)
    },
    checkout: {
      id: i18next.t(LocaleKeys.ROUTES.SHOP_CHECKOUT),
      uid: 'shop/checkout',
      display: i18next.t(LocaleKeys.ORDERING.ORDER_SUMMARY),
      hideBackButton: true
    },
    configure: {
      id: i18next.t(LocaleKeys.ROUTES.SHOP_CONFIGURE),
      uid: 'shop/configure',
      hideBackButton: true
    },
    confirmation: {
      id: i18next.t(LocaleKeys.ROUTES.SHOP_CONFIRMATION),
      uid: 'shop/confirmation',
      display: i18next.t(LocaleKeys.ORDERING.ORDER_CONFIRMED),
      hideBackButton: true
    },
    createSubscriber: {
      id: 'createSubscriber',
      uid: 'shop/createSubscriber',
      display: i18next.t(LocaleKeys.ORDERING.CUSTOMER_INFO),
      hideBackButton: true
    },
    financing: {
      id: 'financing',
      uid: 'shop/financing',
      display: i18next.t(LocaleKeys.FINANCING.FINANCING)
    },
    newOffer: {
      id: 'newOffer',
      uid: 'shop/newOffer',
      add: {
        id: 'add',
        uid: 'shop/newOffer/add'
      },
      edit: {
        id: 'edit',
        uid: 'shop/newOffer/edit'
      }
    },
    paymentInformation: {
      id: i18next.t(LocaleKeys.ROUTES.SHOP_PAYMENT_INFORMATION),
      uid: 'shop/paymentInformation',
      display: i18next.t(LocaleKeys.PAYMENT_INFORMATION.PAYMENT_INFORMATION),
      hideBackButton: true
    },
    offer: {
      id: 'offer',
      uid: 'shop/offer',
      details: {
        id: 'details',
        uid: 'shop/offer/details'
      }
    },
    purchasedOffer: {
      id: 'purchasedOffer',
      uid: 'shop/purchasedOffer',
      update: {
        id: 'update',
        uid: 'shop/purchasedOffer/update'
      },
      edit: {
        id: 'edit',
        uid: 'shop/purchasedOffer/edit'
      },
      transition: {
        id: 'transition',
        uid: 'shop/purchasedOffer/transition'
      }
    },
    subscriberInformation: {
      id: i18next.t(LocaleKeys.ROUTES.SUBSCRIBER_INFORMATION),
      uid: 'shop/subscriberInformation',
      hideBackButton: true
    }
  },
  signup: {
    id: 'signup',
    uid: 'signup',
    display: i18next.t(LocaleKeys.HEADER_CONTENT.SIGNUP_LABEL)
  },
  sitemap: {
    id: 'sitemap',
    uid: 'sitemap',
    display: i18next.t(LocaleKeys.FOOTER_CONTENT.SITE_MAP)
  },
  student: {
    id: i18next.t(LocaleKeys.ROUTES.STUDENT),
    uid: 'student',
    display: i18next.t(LocaleKeys.NAVIGATOR.STUDENT)
  }
});
