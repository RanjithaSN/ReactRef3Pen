import LocaleKeys from '../../../locales/keys';
import CardSelection from 'selfcare-ui/src/components/cardSelection/card.selection';
import UnorderedList from 'selfcare-ui/src/components/unorderedList/unordered.list';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import './guided.shopping.selection.scss';
import i18next from 'i18next';

const GuidedShoppingSelection = ({ t, cards }) => {
  const getCardHeader = (cardInfo) => (
    <>
      <div className="c-card-selection-card__header">
        <div>{t(cardInfo.HEADER)}</div>
        {i18next.exists(cardInfo.SUB_HEADER) && <div>{t(cardInfo.SUB_HEADER)}</div>}
      </div>
    </>
  );

  const getCardFooter = (cardInfo) => {
    const listItems = [
      {
        key: `${t(cardInfo.SUB_HEADER)}_FOOTER_ITEM_ONE`,
        description: t(cardInfo.FOOTER_ITEM_ONE)
      },
      {
        key: `${t(cardInfo.SUB_HEADER)}_FOOTER_ITEM_TWO`,
        description: t(cardInfo.FOOTER_ITEM_TWO)
      },
      {
        key: `${t(cardInfo.SUB_HEADER)}_FOOTER_ITEM_THREE`,
        description: t(cardInfo.FOOTER_ITEM_THREE)
      }
    ];
    return <UnorderedList variant="condensed" list={listItems} />;
  };

  const mappedCards = cards.map((card, i) => ({
    action: t(LocaleKeys.GUIDED_SHOPPING_SELECTION.ACTION),
    cardHeader: getCardHeader(card.cardInfo),
    cost: t(card.cardInfo.COST),
    id: i.toString(),
    cardFooter: getCardFooter(card.cardInfo),
    beforeDiscount: t(card.cardInfo.BEFORE_DISCOUNT)
  }));

  const onChange = (selectionId) => {
    const selectedCards = cards[Number(selectionId)];
    selectedCards.onClick();
  };

  return (
    <div className="c-guided-shopping-selection">
      <CardSelection
        cards={mappedCards}
        onChange={onChange}
      >
        {mappedCards}
      </CardSelection>
    </div>
  );
};

GuidedShoppingSelection.displayName = 'GuidedShoppingSelection';
GuidedShoppingSelection.propTypes = {
  /** [Ignore Doc] translate */
  t: PropTypes.func,
  /* Cards to be displayed */
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardInfo: PropTypes.shape({
        HEADER: PropTypes.string.isRequired,
        SUB_HEADER: PropTypes.string.isRequired,
        COST: PropTypes.string.isRequired,
        BEFORE_DISCOUNT: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        FOOTER_ITEM_ONE: PropTypes.string.isRequired,
        FOOTER_ITEM_TWO: PropTypes.string.isRequired,
        FOOTER_ITEM_THREE: PropTypes.string.isRequired
      }),
      onClick: PropTypes.func.isRequired
    })
  )
};
export default compose(withI18n(), withRouter)(GuidedShoppingSelection);