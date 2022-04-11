import { Parser } from 'html-to-react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import { USABILITY } from '../../../constants/usability.constants';
import LocaleKeys from '../../../locales/keys';
import { getGetHelpNavItem } from '../../../navigation/sitemap.selectors';
import { getHelpProcessingInstructions } from '../parser.helper';
import { assumeCategoryAndTopicNamesFromPost, findPostByKeyOrId } from '../post.helper';
import RelatedArticles from '../relatedArticles/related.articles.contextual';
import './view.article.scss';

const ViewArticle = ({ articleId, categoriesAndTopics, generalArticles, history, match, navigateInHelp, t }) => {
  const htmlParser = new Parser();
  const articleParam = match.params.articleId || articleId;
  const article = findPostByKeyOrId(generalArticles, articleParam);

  useEffect(() => {
    // Update the rendered component to include the usabillla feedback
    window.usabilla.load('w.usabilla.com', USABILITY.accountKey);
  }, []);

  if (generalArticles.length > 0 && !article) {
    history.replace(getGetHelpNavItem().url);
  }

  if (!article) {
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
    [currentCategoryName, currentTopicName, currentCategorySlug, currentTopicSlug] = assumeCategoryAndTopicNamesFromPost(categoriesAndTopics, article);
  }

  return (
    <div className="c-view-article">
      <Heading className="c-view-article__breadcrumb" category="minor" tone="quiet">
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
      <h1>{article.name}</h1>
      <div className="c-view-article__content">
        <Paragraph html>{htmlParser.parseWithInstructions(article.content, () => (true), processingInstructions)}</Paragraph>
      </div>
      {article.relatedArticles.length > 0 &&
        <RelatedArticles articleIds={article.relatedArticles} />
      }
      <div ub-in-page={USABILITY.inPageId} ub-in-page-item={getGetHelpNavItem().url} />
    </div>
  );
};

ViewArticle.displayName = 'ViewArticle';
ViewArticle.propTypes = {
  /** Article id parameter provided if in get help overlay */
  articleId: PropTypes.string,
  /** The master list of all categories */
  categoriesAndTopics: PropTypes.arrayOf(PropTypes.object),
  /** Array of all general articles from redux */
  generalArticles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })),
  /** Router history */
  history: PropTypes.object.isRequired,
  /** Router articleId URL parameter */
  match: PropTypes.shape({
    params: PropTypes.shape({
      articleId: PropTypes.string
    })
  }),
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func
};

export default compose(
  withI18n(),
  withRouter
)(ViewArticle);
