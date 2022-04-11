import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import CardBody from './card.body';
import CardFooter from './card.footer';
import CardHeader from './card.header';
import './card.scss';

export const NakedCard = ({ appearance, backgroundImageUrl, className, children, style, variant }, ref) => (
  <div
    ref={ref}
    className={classNames(
      'c-card',
      [`c-card--${appearance}`],
      [`c-card--${variant}`],
      className
    )}
    style={{
      ...(style || {}),
      backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : ''
    }}
  >
    {children}
  </div>
);

const Card = React.forwardRef(NakedCard);

Card.displayName = 'Card';
Card.propTypes = {
  /** Conditionally render borders and shadows */
  appearance: PropTypes.oneOf(['flat', 'seamless', 'stacked']),
  /** Background imabe url to be rendered in the card. */
  backgroundImageUrl: PropTypes.string,
  /** Children will be rendeded within the body of the card. */
  children: PropTypes.node,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Allows you to pass additional inline-styles for layout concerns */
  style: PropTypes.object,
  /** Conditionally set spacing for childen layout */
  variant: PropTypes.oneOf(['complex', 'simple'])
};
Card.defaultProps = {
  appearance: 'flat',
  style: {},
  variant: 'complex'
};

export default Card;
export { CardBody, CardFooter, CardHeader };
