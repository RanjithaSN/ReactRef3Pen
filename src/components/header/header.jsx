import LocaleKeys from '../../locales/keys';
import { getPennyPlayNavItem } from '../../navigation/sitemap.selectors';
import BackBanner from '../backBanner/back.banner';
import Navigation from '../navigation/navigation';
import ProgressStepper from '../shop/progressStepper/progress.stepper.contextual';
import BrandMark from '../brandMark/brand.mark';
import Button from 'selfcare-ui/src/components/button/button';
import Container from 'selfcare-ui/src/components/container/container';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconButton from 'selfcare-ui/src/components/iconButton/icon.button';
import Input from 'selfcare-ui/src/components/input/input';
import Link from 'selfcare-ui/src/components/link/link';
import { withMedia } from 'selfcare-ui/src/components/mediaContext/media.context';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import IconClose from 'selfcare-ui/src/icons/react-icons/close';
import IconPlayCircle from 'selfcare-ui/src/icons/react-icons/play-circle';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { isClientSide } from '../../helpers/ssr.helpers';
import './header.scss';

class Header extends React.Component {
  state = {
    searchEnabled: false,
    searchOpen: false,
    navOpen: false
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.navAncillary) {
      return {
        searchEnabled: nextProps.navAncillary.some((el) => el.id === 'search')
      };
    }
    return null;
  }

  toggleSearchOpen = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      searchOpen: !prevState.searchOpen
    }));
  };

  setHeaderBg = () => {
    this.setState((prevState) => ({
      navOpen: !prevState.navOpen
    }));
  };

  navigateToPennyPlay = () => {
    const { updateShouldShowOTTGuidedExperience, history } = this.props;
    updateShouldShowOTTGuidedExperience(false);
    history.push(getPennyPlayNavItem().url);
  };

  isOnNav = (url, exact) => {
    const startsWithNavUrl = this.props.history.location.pathname.startsWith(url);
    const endsWithNavUrl = this.props.history.location.pathname.endsWith(url);
    return startsWithNavUrl && (!exact || endsWithNavUrl);
  };

  render() {
    const {
      currentNavItem,
      brandText,
      hasPennyPlayProduct,
      overlayOpen,
      history,
      isLoggedIn,
      isRunningMobile,
      media,
      navPrimary,
      navAncillary,
      t,
      theme,
      ...props
    } = this.props;
    const { navOpen } = this.state;
    const toggleSearchOpen = props.toggleSearchOpen || this.toggleSearchOpen;
    const isRootPathname = isClientSide() ? history.location.pathname.lastIndexOf('/') <= 0 : false;
    const stepperHidden = !String(history.location.pathname).includes(
      `/${t(LocaleKeys.ROUTES.SHOP)}/`
    );
    const backButtonHidden =
      (currentNavItem && currentNavItem.hideBackButton) || overlayOpen;

    return (
      <header>
        <div
          className={classNames(`t-header c-header c-header--${theme}`, {
            'c-header__mobile':
              !media.includes(MEDIA_CONTEXT_SIZES.LARGE) || isRunningMobile,
            'c-header__desktop':
              media.includes(MEDIA_CONTEXT_SIZES.LARGE) && !isRunningMobile
          })}
        >
          <Container>
            <div
              className={classNames(
                'c-header-proper',
                {
                  'c-header-proper--reduced': !navAncillary
                },
                {
                  'c-header-proper--sm': navOpen
                }
              )}
            >
              {isRunningMobile && !isLoggedIn && (
                <div className="c-header__brand-centering-div" />
              )}
              <div
                className={`c-header-main ${
                  this.state.searchOpen ? 'is-searchOpen' : ''
                }`}
              >
                <BrandMark brandText={brandText} />
                {navPrimary && !(isRunningMobile && !isLoggedIn) && (
                  <div className="c-header-actions">
                    <div className="c-header-list">
                      {navPrimary.map((item, _) => item && (
                        <div key={item.id} className="c-header-listItem">
                          <Link to={item.url}>
                            <Heading category="major" bold={this.isOnNav(item.url, item.exact)} tone="normal">
                              {item.display}
                            </Heading>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {navAncillary && !(isRunningMobile && !isLoggedIn) && (
                <div
                  className={`c-header-ancillary ${
                    this.state.searchEnabled ? 'c-header-ancillary--search' : ''
                  }`}
                >
                  <Navigation
                    {...this.props.navigatorContent}
                    isLoggedIn={isLoggedIn}
                    isRunningMobile={isRunningMobile}
                    onNavIconClick={this.setHeaderBg}
                  />
                  <div className="c-header-actions">
                    <div className="c-header-list">
                      {navAncillary.map((item) => {
                        const isSearch =
                          this.state.searchEnabled && item.id === 'search';
                        const className = classNames('c-header-listItem', {
                          'is-visibleWhenSmall': item.id === 'cart',
                          'c-header-search': isSearch,
                          'is-open': isSearch && this.state.searchOpen
                        });
                        let actionsLink;
                        switch (item.id) {
                        case 'profile':
                          actionsLink = (
                            <Heading className="c-header-actionsLink">
                              {item.display}
                            </Heading>
                          );
                          break;
                        case 'search':
                          actionsLink = (
                            <Button
                              className="c-header-actionsLink"
                              onClick={toggleSearchOpen}
                            >
                              {item.display}
                            </Button>
                          );
                          break;
                        case 'cart':
                          actionsLink = (
                            <Link className="c-header-actionsLink">
                              {item.display}
                            </Link>
                          );
                          break;
                        case 'login':
                          actionsLink = (
                            <div className="c-header-actionsLink">
                              {item.display}
                            </div>
                          );
                          break;
                        default:
                          actionsLink = (
                            <Link
                              to={item.url}
                              className="c-header-actionsLink c-header-login-button"
                            >
                              {item.display}
                            </Link>
                          );
                        }
                        return (
                          <div key={item.id} className={className}>
                            {actionsLink}
                            {isSearch && (
                              <div className="c-header-searchInput">
                                <Input
                                  id="search"
                                  type="search"
                                  placeholder={t(
                                    LocaleKeys.HEADER_CONTENT.SEARCH_PLACEHOLDER
                                  )}
                                  size="full"
                                />
                                <Button
                                  className="c-header-searchClose"
                                  onClick={toggleSearchOpen}
                                >
                                  <IconClose />
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {isRunningMobile && hasPennyPlayProduct ? (
                <IconButton
                  icon={<IconPlayCircle />}
                  className="c-header-play-link"
                  onClick={this.navigateToPennyPlay}
                />
              ) : (
                <div className="c-header-play-link" />
              )}
            </div>
            {!isRootPathname && !backButtonHidden && isRunningMobile && (
              <BackBanner className="c-header-back-banner" />
            )}
          </Container>
        </div>
        <Container>
          {!isRootPathname && !stepperHidden && <ProgressStepper />}
        </Container>
      </header>
    );
  }
}

Header.displayName = 'Header';
Header.propTypes = {
  /** The text to be appended to the brand mark */
  brandText: PropTypes.string,
  /** Current sitemap navigation item */
  currentNavItem: PropTypes.shape({
    hideBackButton: PropTypes.bool
  }),
  /** Bool used to determine if this user has penny play on their list of products */
  hasPennyPlayProduct: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** State bool to determine if we are running in an app */
  isRunningMobile: PropTypes.bool.isRequired,
  /** State bool to determine if the user is logged in */
  isLoggedIn: PropTypes.bool.isRequired,
  /** [[IgnoreDoc]] Media object to do mobile styling */
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Set of options to display in the Navigation component.  Use the NavigationContent  to populate in most scenarios. */
  navigatorContent: PropTypes.object,
  /** List of primary navigation items that appear as link in the header. Can be modified in getPrimaryNavigation selector in navigation.js */
  navPrimary: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      url: PropTypes.string,
      id: PropTypes.string,
      exact: PropTypes.bool
    })
  ),
  /** Secondary navigation items that appear in the top right corner at full screen */
  navAncillary: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      url: PropTypes.string,
      id: PropTypes.string
    })
  ),
  /** Bool used to determine if overlay is open */
  overlayOpen: PropTypes.bool,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The theme of the header */
  theme: PropTypes.oneOf(['dark', 'light']),
  /** Function used to set the flag that the user does not need the guided experience anymore */
  updateShouldShowOTTGuidedExperience: PropTypes.func.isRequired
};
Header.defaultProps = {
  theme: 'light'
};

export const NakedHeader = Header;
export default compose(withI18n(), withRouter, withMedia)(Header);
