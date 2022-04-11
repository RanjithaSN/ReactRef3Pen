import Button from '../button/button';
import Heading from '../heading/heading';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './clickable.band.scss';

const ClickableBand = ({ className, tone, description, onClickFunc, title, category }) => (
  <Button className={classNames('c-clickable-band', className)} onClick={onClickFunc}>
    <div>
      <Heading category={category} tone={tone}>{title}</Heading>
      {description && <Heading className="c-clickable-band__description" category="minor" tone="quiet">{description}</Heading>}
    </div>
    <Heading className="c-clickable-band__icon" category={category} tone="quiet">&#8594;</Heading>
  </Button>
);

ClickableBand.displayName = 'ClickableBand';
ClickableBand.propTypes = {
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Description to be placed underneath title on front end */
  description: PropTypes.string,
  /** Function to fire when user click the band */
  onClickFunc: PropTypes.func.isRequired,
  /** Title to be displayed on front end */
  title: PropTypes.string.isRequired,
  /** Category of heading to show in headings */
  category: PropTypes.oneOf(['brand', 'medium', 'major']),
  tone: PropTypes.oneOf(['quiet', 'normal'])
};

ClickableBand.defaultProps = {
  category: 'brand',
  tone: 'quiet'
};

export default ClickableBand;
