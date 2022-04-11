import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import CardListBody from './card.list.body';
import CardListHeader from './card.list.header';
import './card.list.scss';
import CarouselCardListBody from './carousel.card.list.body';

const CardList = ({ children, className }) => (
  <div className={classNames('c-card-list', className)}>
    {children}
  </div>
);

CardList.displayName = 'CardList';

CardList.propTypes = {
  /** A list of Card components */
  children: PropTypes.node.isRequired,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string
};

CardList.defaultProps = {};

export default CardList;

export {
  CardListHeader,
  CardListBody,
  CarouselCardListBody
};
