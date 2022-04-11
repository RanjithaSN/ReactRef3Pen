import PropTypes from 'prop-types';
import React from 'react';
import CustomizeOffer from './customize.offer.contextual';

const CustomizeOfferRoutable = ({ match: { params: { id } }, ...props }) => (
  <CustomizeOffer id={id} {...props} />
);

CustomizeOfferRoutable.displayName = 'CustomizeOfferRoutable';
CustomizeOfferRoutable.propTypes = {
  /** Match provided by react router */
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
CustomizeOfferRoutable.defaultProps = {};

export default CustomizeOfferRoutable;
