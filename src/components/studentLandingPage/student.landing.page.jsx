import React, { useCallback } from 'react';
import { useHistory, withRouter } from 'react-router';
import { withI18n } from 'react-i18next';
import compose from 'ramda/src/compose';
import LocaleKeys from '../../locales/keys';
import withAuth from '../withAuth/with.auth.contextual';
import LandingPageBase from '../landingPageBase/landing.page.base.contextual';

import { getAboutStudentBroadbandNavItem, getAboutStudentBundleNavItem, getAboutStudentMobileNavItem } from '../../navigation/sitemap.selectors';

const StudentLandingPage = (props) => {
  const history = useHistory();
  const navigateToBroadbandAbout = useCallback(() => {
    history.push(getAboutStudentBroadbandNavItem().url);
  }, [history]);

  const navigateToBundleAbout = useCallback(() => {
    history.push(getAboutStudentBundleNavItem().url);
  }, [history]);
  const navigateToMobileAbout = useCallback(() => {
    history.push(getAboutStudentMobileNavItem().url);
  }, [history]);

  const cards = [
    {
      cardInfo: LocaleKeys.STUDENT_GUIDED_SHOPPING_SELECTION.MOBILE_CARD,
      onClick: () => {
        navigateToMobileAbout();
      }
    },
    {
      cardInfo: LocaleKeys.STUDENT_GUIDED_SHOPPING_SELECTION.BROADBAND_CARD,
      onClick: () => {
        navigateToBroadbandAbout();
      }
    },
    {
      cardInfo: LocaleKeys.STUDENT_GUIDED_SHOPPING_SELECTION.BUNDLE_CARD,
      onClick: () => {
        navigateToBundleAbout();
      }
    }
  ];

  return <LandingPageBase {...props} cards={cards} isStudentPage />;
};

export default withAuth(compose(
  withI18n(),
  withRouter
)(
  StudentLandingPage
), {
  allowAccessWithoutAuth: true
});
