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
import './view.category.scss';


const ViewCategory = ({ categories, categorySlug, history, match, navigateInHelp, t, topics }) => {
  const categoryParam = match.params.categorySlug || categorySlug;

  const navigateToUrl = (url) => {
    navigateInHelp(history, url);
  };
  const navigateToTopic = (slug) => {
    navigateToUrl(`${getGetHelpNavItem().url}/${categoryParam}/${slug}`);
  };

  const currentCategory = categories.find((c) => c.slug === categoryParam);
  const categoryName = path(['name'], currentCategory);

  const filteredTopics = topics.filter((topic) => Number(topic.parent) === path(['id'], currentCategory));

  return (
    <div>
      <Heading className="c-view-category__breadcrumb" category="minor" tone="quiet">
        <Link onClick={() => navigateToUrl(`${getGetHelpNavItem().url}`)}>
          {t(LocaleKeys.GET_HELP.GET_HELP_NAV)}
        </Link>
                /
        {` ${categoryName}`}
      </Heading>
      <Heading className="c-view-category__heading" category="brand">{categoryName}</Heading>
      {
        filteredTopics.length > 0 && (
          <CardList listSpace="small">
            {filteredTopics.map((topic) => (
              <ClickableBand key={topic.id} title={topic.name} onClickFunc={() => navigateToTopic(topic.slug)} category="medium" />
            ))}
          </CardList>
        )
      }
      {
        filteredTopics.length === 0 && (
          <ZeroState
            title={t(LocaleKeys.GET_HELP.NO_TOPICS)}
          />
        )
      }
    </div>
  );
};

ViewCategory.displayName = 'ViewCategory';
ViewCategory.propTypes = {
  /** The list of categories */
  categories: PropTypes.arrayOf(PropTypes.object),
  /** Category slug parameter provided if in get help overlay */
  categorySlug: PropTypes.string,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Router category id URL parameter plus current url */
  match: PropTypes.shape({
    params: PropTypes.shape({
      categorySlug: PropTypes.string
    }),
    url: PropTypes.string.isRequired
  }),
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired,
  /** The list of topics */
  topics: PropTypes.arrayOf(PropTypes.object)
};

export default compose(
  withI18n(),
  withRouter
)(ViewCategory);
