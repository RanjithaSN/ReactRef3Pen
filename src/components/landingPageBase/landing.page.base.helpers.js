import PropTypes from 'prop-types';

export const MoreInformationItemProps = PropTypes.shape({
  /** String to describe more information */
  description: PropTypes.string,
  /** Title of ths more information section */
  title: PropTypes.string
});

export const NewsItemProps = PropTypes.shape({
  /** Where to take the customer when they click this item */
  actionLink: PropTypes.string,
  /** Text to lure the customer into clicking the item */
  actionText: PropTypes.string,
  /** The extra text to lure the customer */
  content: PropTypes.string,
  /** Image url to render */
  image: PropTypes.string
});

export const ProductBenefitsItemProps = PropTypes.shape({
  /** The description of the benefit we are showcasing */
  description: PropTypes.string,
  /** title of the benefit we are showcasing */
  title: PropTypes.string
});
