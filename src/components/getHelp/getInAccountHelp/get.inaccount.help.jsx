import { getViewArticleNavItem } from '../../../navigation/sitemap.selectors';
import LocaleKeys from '../../../locales/keys';
import Heading from 'selfcare-ui/src/components/heading/heading';
import CardList from 'selfcare-ui/src/components/cardList/card.list';
import ClickableBand from 'selfcare-ui/src/components/clickableBand/clickable.band';
import { withI18n } from 'react-i18next';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'ramda/src/compose';

const GetInaccountHelp = ({ t, navigateInHelp, history, inaccountHelpList }) => {
  const navigateToItem = (id) => {
    navigateInHelp(history, `${getViewArticleNavItem().url}/${id}`);
  };

  const renderItems = () => {
    return (
      <CardList className="c-categories__section-content c-get-help-search" listSpace="small">
        {inaccountHelpList.map((item) => (
          <ClickableBand key={item.id} title={item.fields.article_title} onClickFunc={() => navigateToItem(item.id)} category="medium" />
        ))}
      </CardList>
    );
  };

  return (
    <>
      <Heading className="c-get-help-search__section-content c-heading--no-max-width" category="brand" tone="normal">{t(LocaleKeys.GET_HELP.INACCOUNT_HEADING)}</Heading>
      <p>{t(LocaleKeys.GET_HELP.INACCOUNT_SUB_HEADING)}</p>
      {renderItems()}
    </>
  );
};

GetInaccountHelp.propTypes = {
  inaccountHelpList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      article_title: PropTypes.string.isRequired,
      article_body: PropTypes.string.isRequired
    })
  })),
  navigateInHelp: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

GetInaccountHelp.defaultProps = {};

GetInaccountHelp.displayName = 'GetInaccountHelp';

export default compose(
  withI18n(),
  withRouter
)(GetInaccountHelp);
