import { getGetHelpNavItem } from '../../../navigation/sitemap.selectors';
import CardList from 'selfcare-ui/src/components/cardList/card.list';
import ClickableBand from 'selfcare-ui/src/components/clickableBand/clickable.band';
import Heading from 'selfcare-ui/src/components/heading/heading';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import './get.help.categories.scss';

const GetHelpCategories = ({ categories, heading, history, navigateInHelp, retrieveCategories }) => {
  useEffect(() => {
    retrieveCategories();
  }, [retrieveCategories]);

  const navigateToCategory = (slug) => {
    navigateInHelp(history, `${getGetHelpNavItem().url}/${slug}`);
  };

  return (
    <div className="c-categories__section">
      {heading && <Heading className="c-categories__section-content" category="brand" tone="normal">{heading}</Heading>}
      <CardList className="c-categories__section-content" listSpace="small">
        {categories.map((category) => (
          <ClickableBand key={category.id} title={category.name} onClickFunc={() => navigateToCategory(category.slug)} category="medium" />
        ))}
      </CardList>
    </div>
  );
};

GetHelpCategories.propTypes = {
  /** Array of category objects */
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    name: PropTypes.string
  })),
  /** The heading to describe the listed categories */
  heading: PropTypes.string,
  /** [[IgnoreDoc]] History instance provided by react-router */
  history: PropTypes.object.isRequired,
  /** Action to either navigate to help page or load new page in help overlay */
  navigateInHelp: PropTypes.func.isRequired,
  /** Action to retrieve categories and load into redux */
  retrieveCategories: PropTypes.func
};

GetHelpCategories.defaultProps = {
  categories: []
};

export default withRouter(GetHelpCategories);
