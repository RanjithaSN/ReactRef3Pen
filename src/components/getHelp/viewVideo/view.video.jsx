import { Parser } from 'html-to-react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import LocaleKeys from '../../../locales/keys';
import { getGetHelpNavItem } from '../../../navigation/sitemap.selectors';
import { getHelpProcessingInstructions } from '../parser.helper';
import { assumeCategoryAndTopicNamesFromPost, findPostByKeyOrId } from '../post.helper';
import RelatedArticles from '../relatedArticles/related.articles.contextual';
import './view.video.scss';

const ViewVideo = ({ categoriesAndTopics, history, videoId, videos, match, navigateInHelp, t }) => {
  const htmlParser = new Parser();
  const videoParam = match.params.videoId || videoId;
  const video = findPostByKeyOrId(videos, videoParam);

  if (videos.length > 0 && !video) {
    history.replace(getGetHelpNavItem().url);
  }

  if (!video) {
    return null;
  }

  const navigateToUrl = (url) => {
    navigateInHelp(history, url);
  };

  const processingInstructions = getHelpProcessingInstructions({
    helpPage: t(LocaleKeys.ROUTES.GET_HELP),
    helpSubpagesToExclude: [t(LocaleKeys.ROUTES.GET_HELP_TROUBLESHOOTER), t(LocaleKeys.ROUTES.GET_HELP_DIRECT_HELP)],
    navigateToUrl
  });

  let currentCategoryName;
  let currentTopicName;
  let currentCategorySlug;
  let currentTopicSlug;

  if (categoriesAndTopics.length > 0) {
    [currentCategoryName, currentTopicName, currentCategorySlug, currentTopicSlug] = assumeCategoryAndTopicNamesFromPost(categoriesAndTopics, video);
  }

  return (
    <div className="c-view-video">
      <Heading className="c-view-video__breadcrumb" category="minor" tone="quiet">
        <Link onClick={() => navigateToUrl(`${getGetHelpNavItem().url}`)}>
          {t(LocaleKeys.GET_HELP.GET_HELP_NAV)}
        </Link>
                /
        <Link onClick={() => navigateToUrl(`${getGetHelpNavItem().url}/${currentCategorySlug}`)}>
          {` ${currentCategoryName} `}
        </Link>
                /
        <Link onClick={() => navigateToUrl(`${getGetHelpNavItem().url}/${currentCategorySlug}/${currentTopicSlug}`)}>
          {` ${currentTopicName}`}
        </Link>
      </Heading>
      <Heading className="c-view-video__header" category="brand">{video.name}</Heading>
      <div className="c-view-video__intro">
        <Paragraph html>{htmlParser.parseWithInstructions(video.intro, () => (true), processingInstructions)}</Paragraph>
      </div>
      <video controls className="c-view-video__player" src={video.video} />
      {video.relatedArticles.length > 0 &&
                <RelatedArticles articleIds={video.relatedArticles} />
      }
    </div>
  );
};

ViewVideo.displayName = 'ViewVideo';
ViewVideo.propTypes = {
  /** The master list of all categories */
  categoriesAndTopics: PropTypes.arrayOf(PropTypes.object),
  /** Router history */
  history: PropTypes.object.isRequired,
  /** Router articleId URL parameter */
  match: PropTypes.shape({
    params: PropTypes.shape({
      videoId: PropTypes.string
    })
  }),
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** Video id parameter provided if in get help overlay */
  videoId: PropTypes.string,
  /** Array of all general articles from redux */
  videos: PropTypes.arrayOf(PropTypes.shape({
    /** ID of the video */
    id: PropTypes.number.isRequired,
    /** Name of the article */
    name: PropTypes.string.isRequired,
    /** Categories this video article falls under */
    categories: PropTypes.arrayOf(PropTypes.number),
    /** The intro WYSIWYG */
    intro: PropTypes.string.isRequired,
    /** Array of related articles */
    relatedArticles: PropTypes.arrayOf(PropTypes.number),
    /** The url of the video to show on this video article */
    video: PropTypes.string.isRequired
  }))
};

export default compose(
  withI18n(),
  withRouter
)(ViewVideo);
