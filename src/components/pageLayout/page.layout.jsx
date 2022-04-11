import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import pathOr from 'ramda/src/pathOr';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import { ErrorBoundaryWithRouter } from 'selfcare-ui/src/components/errorBoundary/error.boundary';
import ErrorZeroState from 'selfcare-ui/src/components/errorBoundary/error.zero.state';
import Heading from 'selfcare-ui/src/components/heading/heading';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import Notice from 'selfcare-ui/src/components/notice/notice';
import LocaleKeys from '../../locales/keys';
import { getSupportRequestsDetails } from '../../navigation/sitemap.selectors';
import GetHelpActionButton from '../getHelp/getHelpActionButton/get.help.action.button.contextual';
import Header from '../header/header.contextual';
import SupportRequestDetailsHeader from '../supportRequest/details/support.request.details.header.contextual';
import { GlobalStyle, PageLayoutContainer, PageLayoutContent, PageLayoutFooter, CookieCard, CookieCardHeading, CookieCardInfo, CookieCardLink } from './page.layout.styled';

const CookiePolicyURL = 'https://www.penny.se/hj%C3%A4lp/artikel/827';

class PageLayout extends React.Component {
    state = {
      isContentReady: Boolean(
        this.props.footerContent &&
        this.props.headerContent &&
        this.props.navigatorContent
      )
    };

    componentDidMount() {
      this.scrollPaneRef = React.createRef();
      this.historyUnsubscribe = this.props.history.listen(() => {
        if (this.scrollPaneRef && this.scrollPaneRef.current) {
          this.scrollPaneRef.current.scrollTop = 0;
        }
      });
    }

    componentDidUpdate(_, prevState) {
      if (
        this.props.footerContent &&
        this.props.headerContent &&
        this.props.navigatorContent &&
        !prevState.isContentReady
      ) {
        this.setState({
          isContentReady: true
        });
      }
    }

    componentWillUnmount() {
      this.historyUnsubscribe();
    }

    get customHeaders() {
      return [
        {
          url: getSupportRequestsDetails().url,
          component: <SupportRequestDetailsHeader />
        }
      ];
    }

    goToCookieInfo = () => {
      window.location.href = CookiePolicyURL;
    };

    render() {
      const location = this.props.location;

      const {
        isShopRoute,
        isHelpRoute,
        isLoggedIn,
        navigatorContent,
        shouldShowCookieInfo,
        shouldShowSessionExpiration,
        shouldShowGetHelpOverlay,
        t,
        updateShouldShowCookieInfo,
        updateShouldShowExpiration,
        updateShouldShowGetHelpOverlay
      } = this.props;
      const isRenderingMobileView = this.context.media.includes(
        MEDIA_CONTEXT_SIZES.SMALL
      );
      const headerTitle = pathOr(
        '',
        ['navigatorContent', 'currentNavItem', 'display'],
        this.props
      );
      return (
        <PageLayoutContainer className={this.props.className}>
          <GlobalStyle />
          {this.state.isContentReady && (
            <React.Fragment>
              {shouldShowSessionExpiration && (
                <Notice
                  fullWidth
                  type="error"
                  onClose={() => updateShouldShowExpiration(false)}
                  heading={t(LocaleKeys.LOGIN_FORM.SESSION_EXPIRATION_MESSAGE)}
                />
              )}
              {shouldShowCookieInfo && (
                <Notice
                  fullWidth
                  inline
                  type="info"
                  onClose={() => updateShouldShowCookieInfo(false)
                  }
                >
                  <CookieCard appearance="seamless">
                    <CookieCardHeading
                      category="major"
                      tone="quiet"
                    >
                      {t && t(LocaleKeys.COOKIES.HEADING)}
                    </CookieCardHeading>
                    <CookieCardInfo
                      category="minor"
                      tone="normal"
                    >
                      {t && t(LocaleKeys.COOKIES.BODY)}
                    </CookieCardInfo>
                    <CookieCardLink
                      onClick={this.goToCookieInfo}
                    >
                      <Heading category="minor" tone="normal">
                        {t && t(LocaleKeys.COOKIES.LINK_TEXT)}
                      </Heading>
                    </CookieCardLink>
                  </CookieCard>
                </Notice>
              )}
              <Header
                {...this.props.headerContent}
                currentNavItem={navigatorContent.currentNavItem}
                navigatorContent={navigatorContent}
                overlayOpen={shouldShowGetHelpOverlay}
              />
              <PageLayoutContent>
                <div ref={this.scrollPaneRef} className="scroll-pane" id="scrollable-element">
                  <div
                    className={classNames(
                      'main',
                      {
                        'c-page-layout__main__back-button':
                          !pathOr(
                            false,
                            [
                              'currentNavItem',
                              'hideBackButton'
                            ],
                            navigatorContent
                          ) &&
                          location.pathname.lastIndexOf(
                            '/'
                          ) > 0
                      }
                    )}
                  >
                    <ErrorBoundaryWithRouter
                      faultContent={(
                        <ErrorZeroState
                          title={t(
                            LocaleKeys.NAVIGATOR
                              .COMPONENT_ERROR_TITLE,
                            {
                              headerTitle
                            }
                          )}
                        />
                      )}
                    >
                      {this.props.children}
                    </ErrorBoundaryWithRouter>
                  </div>
                  {(!isShopRoute || (!isRenderingMobileView && isShopRoute)) && (
                    <PageLayoutFooter
                      brandMark={
                        this.props.headerContent.brandMark
                      }
                      brandText={
                        this.props.headerContent.brandText
                      }
                      {...this.props.footerContent}
                    />
                  )}
                </div>
                {isLoggedIn && !isHelpRoute && (
                  <GetHelpActionButton
                    shouldShowGetHelpOverlay={
                      shouldShowGetHelpOverlay
                    }
                    updateShouldShowGetHelpOverlay={
                      updateShouldShowGetHelpOverlay
                    }
                  />
                )}
              </PageLayoutContent>
              <div id="offer-summary-overlay-root" />
            </React.Fragment>
          )}
        </PageLayoutContainer>
      );
    }
}

PageLayout.displayName = 'PageLayout';
PageLayout.propTypes = {
  /** The contents of the PageLayout, any children will be rendered within a Container between the Header and Footer. */
  children: PropTypes.node,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Set of options to display in the Footer.  Use the FooterContent  to populate in most scenarios. */
  footerContent: PropTypes.object,
  /** Set of options to display in the Header.  Use the HeaderContent  to populate in most scenarios. */
  headerContent: PropTypes.object,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Flag to determine if it is a getHelp route */
  isHelpRoute: PropTypes.bool,
  /** Determins if there is a logged in user */
  isLoggedIn: PropTypes.bool.isRequired,
  /** Flag to determine if it is a shop route */
  isShopRoute: PropTypes.bool,
  /** Set of options to display in the Navigation component.  Use the NavigationContent  to populate in most scenarios. */
  navigatorContent: PropTypes.object,
  /** Whether or not the message stating that we use cookies in the app */
  shouldShowCookieInfo: PropTypes.bool,
  /** Whether or not the get help overlay should be shown */
  shouldShowGetHelpOverlay: PropTypes.bool,
  /** Whether or not the message stating that a subscriber has been logged off as a result of a session expiration */
  shouldShowSessionExpiration: PropTypes.bool,
  /** translate */
  t: PropTypes.func,
  /** The function to update the state of whether or not the cookie information banner should be visible */
  updateShouldShowCookieInfo: PropTypes.func.isRequired,
  /** The function to update the state of whether or not the get help overlay should be visible */
  updateShouldShowGetHelpOverlay: PropTypes.func.isRequired,
  /** The function to update the state of whether or not the session expiration banner should be visible */
  updateShouldShowExpiration: PropTypes.func.isRequired
};

export default compose(withI18n(), withRouter)(PageLayout);
PageLayout.contextType = AppContext;
