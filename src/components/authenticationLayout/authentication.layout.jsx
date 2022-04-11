import PropTypes from 'prop-types';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LocaleKeys from '../../locales/keys';
import PageLayout from '../pageLayout/page.layout.contextual';
import './authentication.layout.scss';

const AuthenticationLayout = ({ children, headerContent, isHelpRoute, isShopRoute, footerContent, navigatorContent, t }) => (
  <PageLayout
    className="c-authenticationLayout"
    headerContent={headerContent}
    isHelpRoute={isHelpRoute}
    isShopRoute={isShopRoute}
    footerContent={footerContent}
    navigatorContent={navigatorContent}
  >
    <div className="c-authenticationLayout-content">
      <div className="c-authenticationLayout-marketingColumn">
        <div className="c-authenticationLayout-marketingMessage">
          <Heading category="brand">{t(LocaleKeys.AUTHENTICATION_LAYOUT.PRIMARY_MARKETING_MESSAGE)}</Heading>
        </div>
        <div className="c-authenticationLayout-marketingMessage c-authenticationLayout-marketingMessage--secondary">
          <Paragraph>{t(LocaleKeys.AUTHENTICATION_LAYOUT.SECONDARY_MARKETING_MESSAGE)}</Paragraph>
        </div>
      </div>
      <div className="c-authenticationLayout-panelColumn">{children}</div>
    </div>
  </PageLayout>
);

AuthenticationLayout.displayName = 'AuthenticationLayout';
AuthenticationLayout.propTypes = {
  /** Any children will be rendered on the right side of the layout */
  children: PropTypes.node.isRequired,
  /** Set of options to display in the Footer.  Use the FooterContent  to populate in most scenarios. */
  footerContent: PropTypes.object,
  /** Set of options to display in the Header.  Use the HeaderContent  to populate in most scenarios. */
  headerContent: PropTypes.object,
  /** Flag to determine if it is a help route */
  isHelpRoute: PropTypes.bool,
  /** Flag to determine if it is a shop route */
  isShopRoute: PropTypes.bool,
  /** Set of options to display in the Navigation component.  Use the NavigationContentSelector to populate in most scenarios. */
  navigatorContent: PropTypes.object,
  /** Push function for redirection */
  history: PropTypes.object.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default withRouter(withI18n()(AuthenticationLayout));
