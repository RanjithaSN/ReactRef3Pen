import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import CardList from 'selfcare-ui/src/components/cardList/card.list';
import ClickableBand from 'selfcare-ui/src/components/clickableBand/clickable.band';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import ZeroState from 'selfcare-ui/src/components/zeroState/zero.state';
import LocaleKeys from '../../../locales/keys';
import { getGetHelpNavItem } from '../../../navigation/sitemap.selectors';
import './view.topic.scss';


const ViewTopic = ({ articles, categories, categorySlug, history, match, navigateInHelp, t, topics, topicSlug }) => {
  const navigateToUrl = (url) => {
    navigateInHelp(history, url);
  };
  const navigateToItem = (item) => {
    navigateToUrl(`${item.url}/${item.id}`);
  };

  const categoryParam = match.params.categorySlug || categorySlug;
  const topicParam = match.params.topicSlug || topicSlug;
  const currentCategory = categories.find((c) => c.slug === categoryParam);
  const currentTopic = topics.find((top) => top.slug === topicParam);
  const categoryName = path(['name'], currentCategory);
  const topicName = path(['name'], currentTopic);

  const filteredArticles = articles.filter((c) => c.categories.includes(path(['id'], currentCategory))).filter((a) => a.categories.includes(path(['id'], currentTopic)));

  return (
    <div>
      <Heading className="c-view-topic__breadcrumb" category="minor" tone="quiet">
        <Link onClick={() => navigateToUrl(`${getGetHelpNavItem().url}`)}>
          {t(LocaleKeys.GET_HELP.GET_HELP_NAV)}
        </Link>
                /
        <Link onClick={() => navigateToUrl(`${getGetHelpNavItem().url}/${categoryParam}`)}>
          {` ${categoryName} `}
        </Link>
                /
        {` ${topicName}`}
      </Heading>
      <Heading className="c-view-topic__heading" category="brand">{topicName}</Heading>
      {
        filteredArticles.length > 0 && (
          <CardList>
            {filteredArticles.map((article) => (
              <ClickableBand key={article.id} title={article.name} onClickFunc={() => navigateToItem(article)} category="medium"/>
            ))}
          </CardList>
        )
      }
      {
        filteredArticles.length === 0 && (
          <ZeroState
            title={t(LocaleKeys.GET_HELP.NO_ARTICLES)}
          />
        )
      }
    </div>
  );
};

ViewTopic.displayName = 'ViewTopic';
ViewTopic.propTypes = {
  /** The list of articles for this current category */
  articles: PropTypes.arrayOf(PropTypes.shape({
    /** Short description of the article */
    description: PropTypes.string,
    /** ID used for navigation */
    id: PropTypes.number,
    /** Name of the article */
    name: PropTypes.string,
    /** The type of article */
    url: PropTypes.string
  })),
  /** The list of categories */
  categories: PropTypes.arrayOf(PropTypes.object),
  /** Category slug parameter provided if in get help overlay */
  categorySlug: PropTypes.string,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Router category and topic id URL parameter */
  match: PropTypes.shape({
    params: PropTypes.shape({
      categorySlug: PropTypes.string,
      topicSlug: PropTypes.string
    })
  }),
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The list of topics */
  topics: PropTypes.arrayOf(PropTypes.object),
  /** Topic slug parameter provided if in get help overlay */
  topicSlug: PropTypes.string
};

export default compose(
  withI18n(),
  withRouter
)(ViewTopic);
