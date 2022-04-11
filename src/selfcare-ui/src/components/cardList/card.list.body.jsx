import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import LoadingIndicator from '../loadingIndicator/loading.indicator';

import './card.list.scss';

const CardListBody = ({ children, className, isLoading }) => (
  <div
    className={classNames({
      'c-loading-indicator-containment': true,
      'c-card-list-body': true,
      'c-card-list-body--loading': isLoading
    }, className)}
  >
    <LoadingIndicator isLoading={isLoading} />
    {React.Children.map(children, (child) => (
      React.cloneElement(child, {
        className: classNames(child.props.className, 'c-card-list-body__item')
      })
    ))}
  </div>
);

CardListBody.displayName = 'CardListBody';

CardListBody.propTypes = {
  /** A list of Card components */
  children: PropTypes.node.isRequired,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Indicates whether the card list body is loading and uses a standard-size placeholder to show the loading indicator */
  isLoading: PropTypes.bool
};

CardListBody.defaultProps = {};

export default CardListBody;
