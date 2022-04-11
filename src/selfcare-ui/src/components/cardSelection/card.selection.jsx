import { productClickAnalytic } from '@selfcare/core/analytics/product.click.analytics';
import classNames from 'classnames';
import CardSelectionCard from './card.selection.card';
import { AppContext } from '../appContext/app.context';
import Cost from '../cost/cost';
import Currency from '../currency/currency';
import DeprecatedHeading from '../heading/heading';
import LoadingIndicator from 'selfcare-ui/src/components/loadingIndicator/loading.indicator';
import Card from 'ui/components/card/card';
import CardHeading from 'ui/components/card/card-heading';
import Heading from 'ui/components/heading/heading';
import Stack from 'ui/components/stack/stack';
import Card_Deprecated from 'ui/components/card/card-deprecated';
import React from 'react';
import PropTypes from 'prop-types';
import { enableDiscounts } from '@selfcare/core/redux/settings/settings.selectors.ts';
import { Parser } from 'html-to-react';

class CardSelection extends React.Component {
  state = {
    selected: this.props.defaultSelectedId
  };

  htmlParser = new Parser();

  componentDidUpdate(prevProps) {
    if (prevProps.section !== this.props.section) {
      this.setState({
        selected: null
      });
    }

    if (
      prevProps.defaultSelectedId !== this.props.defaultSelectedId ||
      prevProps.forceBackToDefault !== this.props.forceBackToDefault
    ) {
      this.setState(
        {
          selected: this.props.defaultSelectedId
        },
        this.handleOnChange
      );
    }
  }

  handleOnChange = () => {
    this.props.onChange(this.state.selected, this.state.isDeselect);
  };

  onChange = (element, index) => () => {
    this.setState(
      (prevProps) => ({
        selected: element.id,
        isDeselect: Boolean(
          this.props.canDeselect &&
          !prevProps.isDeselect &&
          prevProps.selected &&
          prevProps.selected === element.id
        )
      }),
      this.handleOnChange
    );
    productClickAnalytic(element, index, this.props.haveUser);
  };

  renderBeforeDiscount = (price, code, locale) => {
    if (Number.isNaN(Number(price))) {
      return price;
    }
    return price && enableDiscounts() ? (
      <Currency value={price} code={code} locale={locale} />
    ) : null;
  };

  renderCurrency = (cost, currencyCode, currencyLocale) => {
    if (Number.isNaN(Number(cost))) {
      return cost;
    }
    return (
      <Currency value={cost} code={currencyCode} locale={currencyLocale} />
    );
  };

  renderCard = (element, active, index, isMarketingTemplate) => {
    if (this.props.deprecatedCards) {
      return (
        <Card_Deprecated
          key={element.id}
          active={active}
          onClick={this.onChange(element, index)}
        >
          {element.cardHeader && <CardHeading>{element.cardHeader}</CardHeading>}
          {element.cost && (
            <DeprecatedHeading
              category="major"
              className="c-card-selection-card__cost"
            >
              <Cost
                cost={this.renderCurrency(
                  element.cost,
                  element.currencyCode,
                  element.currencyLocale
                )}
                beforeDiscount={this.renderBeforeDiscount(
                  element.beforeDiscount,
                  element.currencyCode,
                  element.currencyLocale
                )}
                smallerPrice
                alternate
              />
            </DeprecatedHeading>
          )}
          {element.cardFooter}
        </Card_Deprecated>
      );
    }
    return (
      <CardSelectionCard
        key={element.id}
        active={active}
        action={active && this.props.unSelectAction ? this.props.unSelectAction : element.action}
        type={
          element.sizeDisplayData ? element.sizeDisplayData.list : element.id
        }
        onClick={this.onChange(element, index)}
      >
        {element.cardHeader && <CardHeading>{element.cardHeader}</CardHeading>}
        {element.cost && (
          <DeprecatedHeading
            category="major"
            className="c-card-selection-card__cost"
          >
            <Cost
              cost={this.renderCurrency(
                element.cost,
                element.currencyCode,
                element.currencyLocale
              )}
              beforeDiscount={this.renderBeforeDiscount(
                element.beforeDiscount,
                element.currencyCode,
                element.currencyLocale
              )}
              duration={isMarketingTemplate && element.sizeDisplayData.duration}
              smallerPrice
              alternate
            />
          </DeprecatedHeading>
        )}
        {element.cardFooter}
      </CardSelectionCard>
    );
  };

  render() {
    const {
      headerText,
      isLoadingCards,
      cards = [],
      requiredAction,
      submittedAction,
      twoStack,
      zeroState,
      isMarketingTemplate
    } = this.props;
    // TODO Fix This: The re-rendering is calling this 4 times. Use the offering context
    // productImpressionsAnalytic(cards);
    return (
      <Stack stackSpace="largePlus" flexStart>
        {headerText && (
          <Heading level={3}>{headerText}</Heading>
        )}
        <LoadingIndicator isLoading={isLoadingCards} />
        <Card.List twoStack={twoStack}>
          {cards.map((element, index) => {
            const isActive =
              element.id === this.state.selected && !this.state.isDeselect;
            return this.renderCard(element, isActive, index, isMarketingTemplate);
          })}
          {!cards.length && submittedAction && (
            <DeprecatedHeading
              category="minor"
              tone="normal"
              className="c-card-selection__zero-state"
            >
              {zeroState}
            </DeprecatedHeading>
          )}
        </Card.List>
        {requiredAction &&
          React.cloneElement(requiredAction, {
            className: classNames(
              'c-card-select',
              requiredAction.props.className
            ),
            ...requiredAction.props
          })}
      </Stack>
    );
  }
}

CardSelection.displayName = 'CardSelection';
CardSelection.contextType = AppContext;
CardSelection.propTypes = {
  /** Flag to determine if selected can be null.  */
  canDeselect: PropTypes.bool,
  /** The list of cards to render out */
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique id for the card - used for keeping track of current selected */
      id: PropTypes.string,
      /** The footer on the individual card */
      cardFooter: PropTypes.node,
      /** The header on the individual card */
      cardHeader: PropTypes.node,
      /** The cost of the item being selected */
      cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** The cost of the item befoe discounts (optional) */
      beforeDiscount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** The currency code to use during the rendering */
      currencyCode: PropTypes.string,
      /** The locale to use during the rendering */
      currencyLocale: PropTypes.string
    })
  ),
  /** Use old and deprecated cards */
  deprecatedCards: PropTypes.bool,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** The action for unselecting a card */
  unSelectAction: PropTypes.string,
  /** The default selected sidebar item ID */
  defaultSelectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Is User Available */
  isMarketingTemplate: PropTypes.bool,
  /** Incrementing number that will force the UI back to it's default state. */
  forceBackToDefault: PropTypes.number,
  /** Is User Available */
  haveUser: PropTypes.bool,
  /** The text to use as the header of the selection */
  headerText: PropTypes.string,
  /** Flag to tell us if the card content is being loaded or not. */
  isLoadingCards: PropTypes.bool,
  /** The object used to display more information for an item. */
  moreInfo: PropTypes.shape({
    content: PropTypes.string,
    label: PropTypes.string
  }),
  /** Action to be place in place of the cards until it is completed. */
  requiredAction: PropTypes.node,
  /** Zero state to display when a required action is not required and the cards do not have a length. */
  zeroState: PropTypes.string,
  /** Used to inform consumers that the selected menu item has changed */
  onChange: PropTypes.func.isRequired,
  /** flag to tell us if the action has been submitted. */
  submittedAction: PropTypes.bool,
  /** flag to tell us if the action has been submitted. */
  twoStack: PropTypes.bool
};
CardSelection.defaultProps = {
  canDeselect: true,
  isLoadingCards: false,
  twoStack: false
};

export default CardSelection;
