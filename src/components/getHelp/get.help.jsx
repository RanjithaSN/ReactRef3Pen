import GetHelpLanding from './get.help.landing.contextual';
import './get.help.scss';
import DirectLiveperson from './troubleshooter/direct.help';
import Troubleshooter from './troubleshooter/troubleshooter.contextual';
import ViewArticle from './viewArticle/view.article.contextual';
import ViewCategory from './viewCategory/view.category.contextual';
import ViewGuide from './viewGuide/view.guide.contextual';
import ViewTopic from './viewTopic/view.topic.contextual';
import ViewVideo from './viewVideo/view.video.contextual';
import useSSRAction from '../../hooks/useSSRAction';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router';
import withAuth from '../withAuth/with.auth.contextual';
import PageContent, { Main } from '../pageContent/page.content';
import { getDirectLivepersonNavItem, getGetHelpNavItem, getNotFoundNavItem, getTroubleshooterNavItem, getViewArticleNavItem, getViewGuideNavItem, getViewVideoNavItem } from '../../navigation/sitemap.selectors';
import { withI18n } from 'react-i18next';


const GetHelp = ({ retrieveHelpContent, updateIsBenifyDistributionChannel, setShowInaccountHelpList, showInaccountHelpList }) => {
  useSSRAction(() => {
    if (showInaccountHelpList) {
      setShowInaccountHelpList(false);
    }
    retrieveHelpContent();
    updateIsBenifyDistributionChannel(false);
  }, [retrieveHelpContent, updateIsBenifyDistributionChannel, showInaccountHelpList, setShowInaccountHelpList]);

  return (
    <PageContent variant="flush">
      <Main>
        <Switch>
          <Route exact component={ViewArticle} path={`${getViewArticleNavItem().url}/:articleId`} />
          <Route exact component={ViewCategory} path={`${getGetHelpNavItem().url}/:categorySlug`} />
          <Route exact component={ViewGuide} path={`${getViewGuideNavItem().url}/:guideId`} />
          <Route exact component={ViewVideo} path={`${getViewVideoNavItem().url}/:videoId`} />
          <Route exact component={DirectLiveperson} path={`${getDirectLivepersonNavItem().url}/:troubleshooterReason/:troubleshooterSection?`} />
          <Route exact component={Troubleshooter} path={`${getTroubleshooterNavItem().url}/:troubleshooterId`} />
          <Route exact component={GetHelpLanding} path={getGetHelpNavItem().url} />
          <Route exact component={ViewTopic} path={`${getGetHelpNavItem().url}/:categorySlug/:topicSlug`} />
          <Redirect to={getNotFoundNavItem().url} />
        </Switch>
      </Main>
    </PageContent>
  );
};

GetHelp.displayName = 'GetHelp';
GetHelp.propTypes = {
  /** Retrieve all categories, articles, guides, and videos and load into redux store */
  retrieveHelpContent: PropTypes.func.isRequired,
  /** Update if it is the benify distribution channel */
  updateIsBenifyDistributionChannel: PropTypes.func.isRequired,
  setShowInaccountHelpList: PropTypes.func.isRequired,
  showInaccountHelpList: PropTypes.bool.isRequired
};

export const NakedGetHelp = GetHelp;
export default withAuth(withI18n()(GetHelp), {
  allowAccessWithoutAuth: true
});
