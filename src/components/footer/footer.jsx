import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import Container from 'selfcare-ui/src/components/container/container';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import LocaleKeys from '../../locales/keys';
import './footer.scss';
import ReferenceLogo from './reference.logo.svg';


const Footer = ({ brandMark, brandText, className, isLoggedIn, isRunningMobile, navItems, openLoginModal, t }) => {
  return isRunningMobile ? null : (
    <footer className={classNames('t-footer c-footer', className)}>
      <Container>
        <div className="c-footer-proper">
          <div className="c-footer-brand">
            <a href="/">
              <div className="c-footer-brandMark">
                <img src={brandMark} alt={brandText} width="75" height="24" />
              </div>
            </a>
          </div>
          {navItems && navItems.map((item) => (
            item.href ?
              (
                <Link href={item.href} target="_blank" key={item.id} className="c-footer-navItem">
                  <Heading category="minor" tone="normal">{item.display}</Heading>
                </Link>
              ) :
              (
                <Link to={item.url} key={item.id} className="c-footer-navItem">
                  <Heading category="minor" tone="normal">{item.display}</Heading>
                </Link>
              )
          ))}
          {isLoggedIn ?
            (
              <Link to="/logout" className="c-footer-navItem">
                <Heading category="minor" tone="normal">

                  {t(LocaleKeys.USER_MENU.LOGOUT_LABEL)}
                </Heading>
              </Link>
            ) : (
              <Link
                onMouseDown={openLoginModal}
                className="c-footer-navItem"
              >
                <Heading category="minor" tone="normal">{t(LocaleKeys.HEADER_CONTENT.LOGIN_LABEL)}</Heading>
              </Link>
            )}
        </div>
      </Container>
    </footer>
  );
};

Footer.displayName = 'Footer';
Footer.propTypes = {
  /** The image for the brand */
  brandMark: PropTypes.node,
  /** The text to be appended to the brand mark */
  brandText: PropTypes.string,
  /** Any classnames you want applied to the footer */
  className: PropTypes.string,
  /** Whether or not a subscriber is logged in */
  isLoggedIn: PropTypes.bool,
  /** Whether or not this is the mobile app */
  isRunningMobile: PropTypes.bool,
  /** The navigable items to be displayed */
  navItems: PropTypes.arrayOf(PropTypes.object),
  /** Function to pop up the login modal */
  openLoginModal: PropTypes.func,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func
};
Footer.defaultProps = {
  brandMark: ReferenceLogo
};

export default withI18n()(Footer);
