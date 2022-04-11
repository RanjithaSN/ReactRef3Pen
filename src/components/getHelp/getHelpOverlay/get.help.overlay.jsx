import LocaleKeys from '../../../locales/keys';
import GetHelpLanding from '../get.help.landing.contextual';
import ViewArticle from '../viewArticle/view.article.contextual';
import ViewCategory from '../viewCategory/view.category.contextual';
import ViewGuide from '../viewGuide/view.guide.contextual';
import ViewTopic from '../viewTopic/view.topic.contextual';
import ViewVideo from '../viewVideo/view.video.contextual';
import { withI18n } from 'react-i18next';
import React from 'react';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import './get.help.overlay.scss';

const GetHelpOverlay = ({ subpage, primaryId, t }) => {
  let content;
  switch (subpage) {
  case t(LocaleKeys.ROUTES.GET_HELP_ARTICLE):
    content = <ViewArticle articleId={primaryId} />;
    break;
  case t(LocaleKeys.ROUTES.GET_HELP_GUIDE):
    content = <ViewGuide guideId={primaryId} />;
    break;
  case t(LocaleKeys.ROUTES.GET_HELP_VIDEO):
    content = <ViewVideo videoId={primaryId} />;
    break;
  default:
    if (subpage && primaryId) {
      content = <ViewTopic categorySlug={subpage} topicSlug={primaryId} />;
    } else if (subpage) {
      content = <ViewCategory categorySlug={subpage} />;
    } else {
      content = <GetHelpLanding changeTitle={false} />;
    }
  }

  return (
    <div className="c-get-help-overlay">
      <div className="c-get-help-overlay__container">
        <div className="c-get-help-overlay__content">
          {content}
        </div>
      </div>
    </div>
  );
};

GetHelpOverlay.displayName = 'GetHelpOverlay';
GetHelpOverlay.propTypes = {
  /** The Get Help overlay primary id needed by the subpage or category */
  primaryId: PropTypes.string,
  /** The Get Help overlay subpage or categorySlug */
  subpage: PropTypes.string,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n()
)(GetHelpOverlay);
