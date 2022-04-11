import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import CardList from 'selfcare-ui/src/components/cardList/card.list';
import ClickableBand from 'selfcare-ui/src/components/clickableBand/clickable.band';
import Heading from 'selfcare-ui/src/components/heading/heading';
import LocaleKeys from '../../../locales/keys';
import { getViewArticleNavItem } from '../../../navigation/sitemap.selectors';
import './related.articles.scss';

const RelatedArticles = ({ articleIds, generalArticles, history, navigateInHelp, t }) => {
  const articles = articleIds
    .map((id) => generalArticles.find((article) => article.id === id))
    .filter((article) => article);
  const navigateToArticle = (id) => {
    navigateInHelp(history, `${getViewArticleNavItem().url}/${id}`);
  };

  return (
    <div className="c-related-articles">
      <Heading className="c-related-articles__header" category="brand" tone="normal">{t(LocaleKeys.GET_HELP.RELATED_HELP.HEADING)}</Heading>
      <CardList className="c-related-articles__section">
        {articles.map((article) => (
          <ClickableBand key={article.id} title={article.name} tone='normal' category='major' onClickFunc={() => navigateToArticle(article.id)} />
        ))}
      </CardList>
    </div>
  );
};

RelatedArticles.propTypes = {
  /** Array of related article ids */
  articleIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** General articles from redux store */
  generalArticles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  })).isRequired,
  /** [[IgnoreDoc]] History from react router */
  history: PropTypes.object.isRequired,
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** [[IgnoreDoc]] Translate function provided by react-i18next */
  t: PropTypes.func.isRequired
};

export default compose(
  withI18n(),
  withRouter
)(RelatedArticles);
