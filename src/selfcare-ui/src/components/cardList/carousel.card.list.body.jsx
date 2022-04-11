import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AppContext } from '../appContext/app.context';
import Carousel from '../carousel/carousel';
import { CAROUSEL_SIZES } from '../carousel/carousel.context.constants';
import LoadingIndicator from '../loadingIndicator/loading.indicator';
import { MEDIA_CONTEXT_SIZES } from '../mediaContext/media.context.constants';
import './card.list.scss';

const CarouselCardListBody = ({
  children,
  className,
  isLoading,
  maxCardsShown,
  minCardsShown,
  simpleLayout,
  ...props
}) => (
  <AppContext.Consumer>
    {({ media }) => {
      let numberOfCardsShown = maxCardsShown;

      if (media.includes(MEDIA_CONTEXT_SIZES.MAX)) {
        numberOfCardsShown = Math.min(CAROUSEL_SIZES.MAX, numberOfCardsShown);
      } else if (media.includes(MEDIA_CONTEXT_SIZES.LARGE)) {
        numberOfCardsShown = Math.min(CAROUSEL_SIZES.LARGE, numberOfCardsShown);
      } else if (media.includes(MEDIA_CONTEXT_SIZES.MEDIUM)) {
        numberOfCardsShown = Math.min(CAROUSEL_SIZES.MEDIUM, numberOfCardsShown);
      } else if (media.includes(MEDIA_CONTEXT_SIZES.SMALL)) {
        numberOfCardsShown = Math.min(minCardsShown, numberOfCardsShown);
      }

      return (
        <div
          className={classNames({
            'c-loading-indicator-containment': true,
            'c-card-list-body': true,
            'c-card-list-body--loading': isLoading
          }, className)}
        >
          <LoadingIndicator isLoading={isLoading} />
          <Carousel
            contentWrapperClassName={classNames('c-card-list-body__carousel-content-wrapper', {
              'c-card-list-body__carousel-content-wrapper--simple': simpleLayout
            })}
            contentClassName="c-card-list-body__carousel-content"
            simpleLayout={simpleLayout}
            {...props}
          >
            {React.Children.map(children, (child) => (
              <div
                className={classNames(
                  'c-card-list-body__carousel-item',
                  [`c-card-list-body__carousel-item--${numberOfCardsShown}-shown`]
                )}
              >
                {child}
              </div>
            ))}
          </Carousel>
        </div>
      );
    }}
  </AppContext.Consumer>
);

CarouselCardListBody.displayName = 'CarouselCardListBody';
CarouselCardListBody.propTypes = {
  /** A list of Card components */
  children: PropTypes.node.isRequired,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Flag to tell us if the Carousel we render should have inverted nav dot and arrow colors */
  invertNavColors: PropTypes.bool,
  /** Indicates whether the card list body is loading and uses a standard-size placeholder to show the loading indicator */
  isLoading: PropTypes.bool,
  /** Function to call when an item changes. */
  itemChanged: PropTypes.func,
  /** The maximum number of cards visible at one time, suggest number be under 4. */
  maxCardsShown: PropTypes.number,
  /** The minimum number of cards visible at one time, suggest number be under 4. */
  minCardsShown: PropTypes.number,
  /** Use an alternate style that is a simpler carousel */
  simpleLayout: PropTypes.bool
};
CarouselCardListBody.defaultProps = {
  maxCardsShown: 4,
  minCardsShown: 1
};

export default CarouselCardListBody;
