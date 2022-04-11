import { RetrieveBenefitsConfiguration } from '@selfcare/core/redux/benefits/benefits.actions';
import { RetrieveConfiguration } from '@selfcare/core/redux/configuration/configuration.actions';
import { SetInAccountHelpPages } from '../../redux/inAccountHelp/in.accounthelp.actions';
import { IsDbss } from '@selfcare/core/redux/configuration/configuration.selectors';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { CurrentSession, SessionIsExpired } from '@selfcare/core/redux/session/session.selectors';
import { Page1 } from '../../redux/inAccountHelp/in.accounthelp.selectors';
import { Subscriber, SubscriberIsLoaded, SubscriberIsLoading } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Analytics from '../../constants/analytics';
import { ResetOverlayState } from '../../redux/getHelp/get.help.actions';
import { IsLoginModalOpen } from '../../redux/login/login.selectors';
import { UpdateShouldShowGetHelpOverlay } from '../../redux/site/site.actions';
import { FooterContent, HeaderContent, IsRunningMobile, NavigatorContent, NavigatorIsMobileOnly } from '../../redux/site/site.selectors';
import Application from './app';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  currentLocale: SelectedLocale,
  currentSessionId: CurrentSession,
  footerContent: FooterContent,
  headerContent: HeaderContent,
  isDbss: IsDbss,
  isModalOpen: IsLoginModalOpen,
  isRunningMobile: IsRunningMobile,
  navigatorContent: NavigatorContent,
  navigatorIsMobileOnly: NavigatorIsMobileOnly,
  sessionExpired: SessionIsExpired,
  subscriber: Subscriber,
  subscriberIsLoaded: SubscriberIsLoaded,
  subscriberIsLoading: SubscriberIsLoading,
  page1: Page1
});
const mapActionsToProps = {
  resetOverlayState: ResetOverlayState,
  retrieveConfiguration: RetrieveConfiguration,
  updateShouldShowGetHelpOverlay: UpdateShouldShowGetHelpOverlay,
  updateBenefitsConfig: RetrieveBenefitsConfiguration,
  setInAccountHelpPages: SetInAccountHelpPages
};

const App = connect(mapStateToProps, mapActionsToProps)(Application);


export default (props) => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    ReactGA.initialize(Analytics.accountKey);
    ReactGA.set({
      [Analytics.environmentDimension]: props.environment
    });
    setInitialized(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInitialized]);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname);
    }
  }, [location.pathname, initialized]);

  return <App currentLocation={location} {...props} />;
};

