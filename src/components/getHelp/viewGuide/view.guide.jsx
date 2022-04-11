import { Parser } from 'html-to-react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import ExternalImage from 'selfcare-ui/src/components/externalImage/external.image';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import { USABILITY } from '../../../constants/usability.constants';
import LocaleKeys from '../../../locales/keys';
import { getGetHelpNavItem } from '../../../navigation/sitemap.selectors';
import { getHelpProcessingInstructions } from '../parser.helper';
import { assumeCategoryAndTopicNamesFromPost, findPostByKeyOrId } from '../post.helper';
import RelatedArticles from '../relatedArticles/related.articles.contextual';
import './view.guide.scss';

const ViewGuide = ({ categoriesAndTopics, guideId, guides, history, match, navigateInHelp, t }) => {
  const htmlParser = new Parser();
  const guideParam = match.params.guideId || guideId;
  const guide = findPostByKeyOrId(guides, guideParam);

  useEffect(() => {
    // Update the rendered component to include the usabillla feedback
    window.usabilla.load('w.usabilla.com', USABILITY.accountKey);
  }, []);


  if (guides.length > 0 && !guide) {
    history.replace(getGetHelpNavItem().url);
  }

  if (!guide) {
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
    [currentCategoryName, currentTopicName, currentCategorySlug, currentTopicSlug] = assumeCategoryAndTopicNamesFromPost(categoriesAndTopics, guide);
  }

  const renderStep = (step, index) => (
    <div className="c-view-guide__step" key={index}>
      <div className="c-view-guide__step-image">
        <ExternalImage
          altText={`Steg ${index + 1}-bild`}
          imageUrls={{
            basic: step.image,
            webp: `${step.image}.webp`
          }}
        />
      </div>
      <div>
        <Heading className="c-view-guide__step-text">
          {t(LocaleKeys.GET_HELP.STEP_HEADING, {
            stepNumber: index + 1,
            stepName: step.step_name
          })}
        </Heading>
        <Paragraph html>{htmlParser.parseWithInstructions(step.step_content, () => (true), processingInstructions)}</Paragraph>
      </div>
    </div>
  );

  return (
    <div className="c-view-guide">
      <Heading className="c-view-guide__breadcrumb" category="minor" tone="quiet">
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
      <Heading className="c-view-guide__header" category="brand">{guide.name}</Heading>
      <Heading category="minor">{guide.intro}</Heading>
      <div className="c-view-guide__steps">
        {guide.steps.map((step, idx) => renderStep(step, idx))}
      </div>
      <Heading className="c-view-guide__outro" category="minor">{guide.outro}</Heading>
      {
        guide.relatedArticles.length > 0 &&
                <RelatedArticles articleIds={guide.relatedArticles} />
      }
      <div ub-in-page={USABILITY.inPageId} ub-in-page-item={getGetHelpNavItem().url} />
    </div>
  );
};

ViewGuide.displayName = 'ViewGuide';
ViewGuide.propTypes = {
  /** The master list of all categories */
  categoriesAndTopics: PropTypes.arrayOf(PropTypes.object),
  /** Guide id parameter provided if in get help overlay */
  guideId: PropTypes.string,
  /** Array of all general articles from redux */
  guides: PropTypes.arrayOf(PropTypes.shape({
    /** ID of the guide */
    id: PropTypes.number.isRequired,
    /** Name (heading) of the guide */
    name: PropTypes.string.isRequired,
    /** Intro text */
    intro: PropTypes.string.isRequired,
    /** Outro text */
    outro: PropTypes.string.isRequired,
    /** The meat of the page -  the actual steps in the guide */
    steps: PropTypes.arrayOf(PropTypes.shape({
      /** URL to the image for this step */
      image: PropTypes.string,
      /** The WYSIWYG for this step */
      step_content: PropTypes.string,
      /** The name (heading) for this step */
      step_name: PropTypes.string
    }))
  })),
  /** Router history */
  history: PropTypes.object.isRequired,
  /** Router articleId URL parameter */
  match: PropTypes.shape({
    params: PropTypes.shape({
      guideId: PropTypes.string
    })
  }),
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(ViewGuide);
