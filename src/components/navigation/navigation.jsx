import classNames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import Button from 'selfcare-ui/src/components/button/button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import IconArrowThinLeft from 'selfcare-ui/src/icons/react-icons/arrow-thin-left';
import IconBars from 'selfcare-ui/src/icons/react-icons/bars';
import IconClose from 'selfcare-ui/src/icons/react-icons/close';
import LocaleKeys from '../../locales/keys';
import { getMobileNavItemSiblings, getNavItemAncestor } from '../../navigation/navigation';
import { getLoginNavItem } from '../../navigation/sitemap.selectors';
import './navigation.scss';


const linkShape = {
  display: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  id: PropTypes.string,
  url: PropTypes.string
};

const MobileNavigation = ({ isLoggedIn, items, currentNavItem, onDeepClick, t }) => (
  <React.Fragment>
    <div className="c-navigation__list">
      {items.map((item) => item && (
        <div
          key={item.id}
          className={classNames('c-navigation__list-item', {
            'c-navigation__list-item--with-children': item.children,
            'c-navigation__list-item--current': currentNavItem.id === item.id
          })}
        >
          <Link className="c-navigation__list-item-link" to={item.url} onClick={(e) => onDeepClick(e, item)}>
            <Heading category="brand" tone="quiet">{item.display}</Heading>
          </Link>
        </div>
      ))}
      <div className="c-navigation__list-item c-mobile-navigation__login">
        {!isLoggedIn ?
        // Render Login or Logout depending on their state
          <Link className="c-navigation__list-item-link" to={getLoginNavItem().url}><Heading category="brand" tone="quiet">{t(LocaleKeys.HEADER_CONTENT.LOGIN_LABEL)}</Heading></Link> :
          <Link className="c-navigation__list-item-link" to="/logout"><Heading category="brand" tone="quiet">{t(LocaleKeys.USER_MENU.LOGOUT_LABEL)}</Heading></Link>
        }
      </div>

    </div>

  </React.Fragment>
);

MobileNavigation.displayName = 'MobileNavigation';
MobileNavigation.propTypes = {
  /** The currently selected page for the Navigation component. */
  currentNavItem: PropTypes.shape(linkShape),
  /** The list of available navigation items to display */
  items: PropTypes.arrayOf(PropTypes.shape(linkShape)),
  /** Whether the user is logged in or not */
  isLoggedIn: PropTypes.bool.isRequired,
  /** Event handler deep clicking into parts of the navigation */
  onDeepClick: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

const DeepMobileNavigation = ({ items, currentNavHeading, currentNavItem, onClickMainMenu, onClickNavItem, t }) => (
  <React.Fragment>
    <Button className="c-navigation__back" onClick={onClickMainMenu}>
      <IconArrowThinLeft className="c-navigation__back-icon" />
      <span className="c-navigation__back-label">
        {t(LocaleKeys.NAVIGATOR.MAIN_MENU)}
      </span>
    </Button>
    <div className="c-navigation__heading">
      {currentNavHeading}
    </div>
    <div className="c-navigation__list">
      {items.map((item) => (
        <div
          key={item.id}
          className={classNames('c-navigation__list-item', {
            'c-navigation__list-item--current': currentNavItem.id === item.id
          })}
        >
          <Link className="c-navigation__list-item-link" to={item.url} onClick={onClickNavItem}>
            {item.display}
          </Link>
        </div>
      ))}
    </div>
  </React.Fragment>
);

DeepMobileNavigation.displayName = 'DeepMobileNavigation';
DeepMobileNavigation.propTypes = {
  /** The heading to describe the navigation menu options */
  currentNavHeading: PropTypes.string,
  /** The currently selected page for the Navigation component. */
  currentNavItem: PropTypes.shape(linkShape),
  /** The list of available navigation items to display */
  items: PropTypes.arrayOf(PropTypes.shape(linkShape)),
  /** Event handler for the main menu return link */
  onClickMainMenu: PropTypes.func.isRequired,
  /** Event handler for when a navItem is clicked */
  onClickNavItem: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

class Navigation extends React.Component {
    state = {
      navOpen: false
    };

    static getDerivedStateFromProps(nextProps, state) {
      return {
        mobilePagingReference: state.mobilePagingReference || nextProps.currentNavItem
      };
    }

    setMobileNavItemToParent = () => {
      this.setState((prevState) => {
        const mobileNavItemParent = getNavItemAncestor(
          this.props.mobileSiteMap,
          prevState.mobilePagingReference
        );
        return {
          mobilePagingReference: mobileNavItemParent
        };
      });
    };

    setMobileNavItemToChild = (e, navItem) => {
      // Set to the first child of the nav item, otherwise fallback to default event behavior.
      // mobilePagingReference is just a placeholder, after all
      if (navItem.children && navItem.children.length) {
        e.preventDefault();
        this.setState({
          mobilePagingReference: navItem.children[0]
        });
      } else {
        this.toggleNavOpen();
      }
    };

    toggleNavOpen = () => {
      this.setState((prevState) => ({
        navOpen: !prevState.navOpen
      }));
      this.props.onNavIconClick();
    };

    renderMobileView() {
      const { currentNavItem, isLoggedIn, mobileSiteMap, t } = this.props;
      const { mobilePagingReference } = this.state;
      const mobileNavItems = getMobileNavItemSiblings(mobileSiteMap, mobilePagingReference);
      const mobileNavParent = getNavItemAncestor(mobileSiteMap, mobilePagingReference);
      const isTopLevelMobileMenu = !mobileNavParent;

      return (
        <div className="c-navigation__page c-navigation__page--children c-navigation__page--active">
          {isTopLevelMobileMenu ?
            (
              <MobileNavigation
                isLoggedIn={isLoggedIn}
                items={mobileSiteMap}
                currentNavItem={currentNavItem}
                onDeepClick={this.setMobileNavItemToChild}
                t={t}
              />
            ) :
            (
              <DeepMobileNavigation
                items={mobileNavItems}
                currentNavItem={currentNavItem}
                currentNavHeading={mobileNavParent.display}
                onClickMainMenu={this.setMobileNavItemToParent}
                onClickNavItem={this.toggleNavOpen}
                t={t}
              />
            )
          }
        </div>
      );
    }

    render() {
      const { media } = this.context;
      const { brandMark, brandText, isRunningMobile } = this.props;
      return (!media.includes(MEDIA_CONTEXT_SIZES.LARGE) || isRunningMobile) && (
        <div className="c-navigation">
          <div
            className={classNames('c-navigation__proper', {
              'c-navigation__proper--open': this.state.navOpen
            })}
          >
            {this.renderMobileView()}
          </div>
          <div
            className={classNames('c-navigation__toggle', {
              'c-navigation__toggle--open': this.state.navOpen
            })}
          >
            <Button className="unset-button-min-width" onClick={this.toggleNavOpen}>
              {!this.state.navOpen ? <IconBars /> : <IconClose />}
            </Button>
          </div>
          {this.state.navOpen ?
            (
              <div className="c-navigation__brand">
                <a href="/">
                  <div className="c-navigation__brandMark">
                    <img src={brandMark} alt={brandText} />
                  </div>
                </a>
              </div>
            ) : ''}
        </div>
      );
    }
}

Navigation.displayName = 'Navigation';
Navigation.propTypes = {
  /** The image for the brand */
  brandMark: PropTypes.node,
  /** The text to be appended to the brand mark */
  brandText: PropTypes.string,
  /** The currently selected page */
  currentNavItem: PropTypes.shape(linkShape),
  /** Whether the user is logged in or not */
  isLoggedIn: PropTypes.bool.isRequired,
  /** Whether we are inside of our app or not */
  isRunningMobile: PropTypes.bool.isRequired,
  /** The entire site map to use for mobile views. There is no guarantee this site map looks like the desktop one. */
  mobileSiteMap: PropTypes.arrayOf(PropTypes.shape(linkShape)),
  /** Callback to change header backgorund color */
  onNavIconClick: PropTypes.func,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};
Navigation.defaultProps = {
  currentNavItem: {
    display: '',
    id: '',
    url: ''
  }
};

export default compose(
  withI18n(),
  withRouter
)(Navigation);
Navigation.contextType = AppContext;
