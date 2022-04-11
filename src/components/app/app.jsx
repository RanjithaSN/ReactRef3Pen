import FaultCodes from '@selfcare/core/constants/api.fault.codes';
import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';
import has from 'ramda/src/has';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AppContextProvider from 'selfcare-ui/src/components/appContext/app.context';
import { ErrorBoundaryWithState } from 'selfcare-ui/src/components/errorBoundary/error.boundary';
import { getLocationInfo, getPages, LIMIT_FOR_URL_INFO_FROM_ROUTER } from '../../helpers/inaccount.help.helpers';
import 'selfcare-ui/src/index.scss';
import { ThemeProvider } from 'styled-components';
import theme from 'ui/theme/theme';
import LocaleKeys from '../../locales/keys';
import { getAboutNavItem, getAccountNavItem, getForgotPasswordNavItem, getGetHelpNavItem, getLoginNavItem, getMobileLogoutNavItem, getNotFoundNavItem, getPennyPlayNavItem, getRoamingDetailsNavItem, getShopNavItem, getStudentNavItem } from '../../navigation/sitemap.selectors';
import { MobileSpacerTop } from './app.styled';
import { isClientSide } from '../../helpers/ssr.helpers';
import { dataLayerPush } from '@selfcare/core/analytics/analytics.helper';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';
import {
  AboutPage,
  Account,
  AuthenticationLayout,
  ForgotPassword,
  GetHelp,
  LandingPage,
  Login,
  LoginModal,
  Logout,
  MetaData,
  NotFound,
  PageLayout,
  PennyPlay,
  ResetPassword,
  RoamingDetails,
  Shop,
  StudentLandingPage
} from './chunks';


const AUTH_ROUTES = [
  '/login',
  '/logout',
  '/forgotPassword'
];

class Application extends React.Component {
  state = {
    isAuthRoute: this.props.currentLocation &&
          AUTH_ROUTES.includes(this.props.currentLocation.pathname),
    isHelpRoute: false,
    isShopRoute: false,
    isRaygunInitialized: false
  };

  async componentWillMount() {
    await this.props.retrieveConfiguration();

    if (isClientSide()) {
      this.setupKitewheelOnce(AppConfig.ENVIRONMENT_NAME);
    }

    this.props.updateBenefitsConfig();
  }

  componentDidUpdate(prevProps) {
    // The second render never happens on server side so the
    // window references are not an issue in this case.
    if (!prevProps.sessionExpired && this.props.sessionExpired) {
      if (this.props.currentLocation.pathname.includes('benifydeals')) {
        window.location.href = '/om/benifydeals?sessionExpired=true';
      } else {
        window.location.href = '/?sessionExpired=true';
      }
    }


    if (this.props.apiFault &&
        this.props.apiFault !== prevProps.apiFault) {
      // Make room for additional handling of api faults
      if (this.props.apiFault.Code === FaultCodes.INVALID_SYSTEM_ID) {
        console.error('Invalid system ID. Cached values have been cleared'); //eslint-disable-line
      }
    }

    if (this.props.currentLocation !== prevProps.currentLocation) {
      this.setState({
        isAuthRoute: AUTH_ROUTES.includes(this.props.currentLocation.pathname),
        isHelpRoute: this.props.currentLocation.pathname.startsWith(getGetHelpNavItem().url),
        isShopRoute: this.props.currentLocation.pathname.startsWith(getShopNavItem().url)
      });
      this.props.updateShouldShowGetHelpOverlay(false);
      this.props.resetOverlayState();
      dataLayerPush({
        event: 'siteRender'
      });
      // location changed, time to update inaccount help info
      this.updateUIContextPages();
    } else if (this.props.page1 === '') {
      // location didn't change, but it's a refresh, so update inaccount help info needed
      this.updateUIContextPages();
    }

    if (this.props.subscriberIsLoaded && !this.props.subscriberIsLoading) {
      const { Id } = this.props.subscriber;

      if (isClientSide()) {
        this.setSubscriberIdInKitewheel(Id, AppConfig.ENVIRONMENT_NAME);
      }

      if (Id && Id !== prevProps.subscriber) {
        rg4js('setUser', {
          identifier: Id,
          isAnonymous: false
        });
      }
    }

    // RAYGUN INIT
    if (!this.state.isRaygunInitialized && isClientSide()) {
      const raygunApiKey = AppConfig.RAYGUN_API_KEY;

      if (raygunApiKey) {
        window.rg4js('apiKey', raygunApiKey);
        window.rg4js('enableCrashReporting', true);
        window.rg4js('enablePulse', true);
        window.rg4js('logContentsOfXhrCalls', true);
        window.rg4js('options', {
          captureUnhandledRejections: false
        });
      }

      this.setState({
        isRaygunInitialized: true
      });
    }
  }

  setupKitewheelOnce() {
    if (!window._kw) {
      return;
    }
    /* eslint-disable no-underscore-dangle */
    const listenerId = AppConfig.KITEWHEEL_LISTENER_ID;

    window._kw.extras = {};
    window._kw.options = {
      listenerId,
      listenerHost: 'https://api2.csgjourney.com/api/v1/listener/',
      specifyCookieDomain: {
        enabled: false
      },
      doNotTrack: {
        enabled: false
      }
    };
    window._kw.events = {
      trackViews: {
        track: true
      },
      trackClicks: {
        track: true,
        noConflict: true
      },
      trackForms: {
        track: true,
        noConflict: true
      },
      trackDropdowns: {
        track: true
      },
      trackButtons: {
        track: true
      },
      trackBlurs: {
        track: true
      },
      trackDivs: {
        track: true
      },
      trackGeo: {
        track: false
      },
      trackFingerprint: {
        track: false
      }
    };
    window._kw.success = () => {
      // Handle returned data here
    };
    const head = document.getElementsByTagName('head')[0];
    const webTrackScript = document.createElement('script');
    webTrackScript.src = 'https://cdn.kitewheel.com/webTrack.v1.js';
    head.appendChild(webTrackScript);
    /* eslint-enable no-underscore-dangle */
  }

  setSubscriberIdInKitewheel = (subscriberId) => {
    /* eslint-disable no-underscore-dangle */
    if (subscriberId) {
      window._kw.extras = {
        'subscriber-id': subscriberId
      };
    } else {
      window._kw.extras = {};
    }
    /* eslint-enable no-underscore-dangle */
  };

  createRouterComponents = () => {
    const { isRunningMobile, footerContent, headerContent, navigatorContent, navigatorIsMobileOnly } = this.props;
    return React.createElement(
      this.state.isAuthRoute ? AuthenticationLayout : PageLayout,
      {
        footerContent,
        headerContent,
        isHelpRoute: this.state.isHelpRoute,
        isShopRoute: this.state.isShopRoute,
        navigatorContent,
        navigatorIsMobileOnly
      },
      <Switch>
        <Route exact component={AboutPage} path={`${getAboutNavItem().url}/:aboutPage*`} />
        <Route component={Account} path={getAccountNavItem().url} />
        <Route exact component={ForgotPassword} path={getForgotPasswordNavItem().url} />
        <Route component={GetHelp} path={getGetHelpNavItem().url} />
        <Route exact component={Login} path={getLoginNavItem().url} />
        <Route exact component={Logout} path="/logout" />
        <Route exact component={ResetPassword} path="/tokenReset/:token" />
        <Route exact component={RoamingDetails} path={getRoamingDetailsNavItem().url} />
        <Route component={Shop} path={getShopNavItem().url} />
        <Route component={PennyPlay} path={getPennyPlayNavItem().url} />
        <Route component={PennyPlay} path={getMobileLogoutNavItem().url} />
        <Route exact component={NotFound} path={getNotFoundNavItem().url} />
        {enableDiscounts() && <Route exact component={StudentLandingPage} path={getStudentNavItem().url} />}
        {isRunningMobile ?
          <Redirect path="/" to={getLoginNavItem().url} /> :
          <Route exact component={LandingPage} path="/" />
        }
        <Redirect to={getNotFoundNavItem().url} />
      </Switch>
    );
  };

  updateUIContextPages = () => {
    const { currentLocation: { pathname: location }, setInAccountHelpPages } = this.props;
    const locationParts = location.split('/');
    let locationInfo = '';
    const hasUid = has('uid');

    if (locationParts.length > LIMIT_FOR_URL_INFO_FROM_ROUTER) {
      locationInfo = getLocationInfo(`${locationParts[1]}/${locationParts[2]}`);
    } else {
      locationInfo = getLocationInfo(location);
    }

    if (locationInfo && hasUid(locationInfo)) {
      setInAccountHelpPages(getPages(locationInfo.uid));
    }
  };

  render() {
    const { isDbss, isModalOpen, t } = this.props;

    return (
      <ErrorBoundaryWithState>
        <ThemeProvider theme={theme}>
          <AppContextProvider isDbss={isDbss}>
            {t && <MetaData title={t(LocaleKeys.META_DATA.DEFAULT.TITLE)} description={t(LocaleKeys.META_DATA.DEFAULT.DESCRIPTION)} />}
            <MobileSpacerTop />
            {isModalOpen && <LoginModal />}
            {this.createRouterComponents()}
          </AppContextProvider>
        </ThemeProvider>
      </ErrorBoundaryWithState>
    );
  }
}

Application.propTypes = {
  /** An error response kicked back from an API call */
  apiFault: PropTypes.shape({
    Code: PropTypes.number.isRequired
  }),
  /** The currently selected locale to be used to initialize i18next */
  currentLocale: PropTypes.string,
  /** Set of options to display in the Footer. */
  footerContent: PropTypes.object,
  /** Set of options to display in the Header. */
  headerContent: PropTypes.object,
  /** Boolean to determine if we are in a DBSS or ITV businessUnit */
  isDbss: PropTypes.bool.isRequired,
  /** Boolean to determing if we are running in the mobile app proper or not. */
  isRunningMobile: PropTypes.bool.isRequired,
  /** Boolean to tell if the modal should be open */
  isModalOpen: PropTypes.bool,
  /** Set of options to display in the Navigation component. */
  navigatorContent: PropTypes.object,
  /** Whether the Navigation should only show on small-screen devices */
  navigatorIsMobileOnly: PropTypes.bool,
  /** Resets the get help overlay state */
  resetOverlayState: PropTypes.func.isRequired,
  /** Fetches the configuration file for the deployment */
  retrieveConfiguration: PropTypes.func.isRequired,
  /** The state of the session, whether it is expired or valid */
  sessionExpired: PropTypes.bool.isRequired,
  /** Subscriber object used for kitewheel script */
  subscriber: PropTypes.shape({
    Id: PropTypes.number
  }),
  /** Flag to tell us if the subscriber is loaded */
  subscriberIsLoaded: PropTypes.bool,
  /** Flag to tell us if the subscriber is loading */
  subscriberIsLoading: PropTypes.bool,
  /** [Ignore Doc] translate */
  t: PropTypes.func,
  /** The function to update the state of whether or not the get help overlay should be visible */
  updateShouldShowGetHelpOverlay: PropTypes.func.isRequired,
  /** The function to grab the benefits JSON data */
  updateBenefitsConfig: PropTypes.func.isRequired,
  setInAccountHelpPages: PropTypes.func.isRequired,
  page1: PropTypes.string.isRequired,
  /** Raygun Api Key for current environment */
  raygunApiKey: PropTypes.string
};

Application.defaultProps = {
  navigatorIsMobileOnly: false,
  raygunApiKey: null
};

export default Application;
