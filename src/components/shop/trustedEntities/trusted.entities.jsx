import PropTypes from 'prop-types';
import React from 'react';
import LogoBadge from './logoBadge/logo.badge';
import { getTrustedEntityLogo } from './trusted.entities.helper';
import './trusted.entities.scss';

const TrustedEntities = ({ badgesArray, currentPurchaseType }) => (
  <div className="c-trusted-entities">
    {badgesArray.map((badge) => (
      (currentPurchaseType === 2 || currentPurchaseType === badge.productType) && (
        <LogoBadge
          key={badge.ref}
          text={badge.text}
          image={getTrustedEntityLogo(badge.ref)}
        />
      )
    ))}
  </div>
);

TrustedEntities.displayName = 'TrustedEntities';
TrustedEntities.propTypes = {
  /** Unique id that represents the current purchase type (mobil | bredband | erbjudanden) */
  currentPurchaseType: PropTypes.number,
  /** Array of trusted entities to be rendered */
  badgesArray: PropTypes.arrayOf(PropTypes.shape({
    /** Unique reference that represents the trusted entity */
    ref: PropTypes.string,
    /** Unique id that represents the trusted entity's product association (mobil | bredband) */
    productType: PropTypes.number,
    /** Badge's text to be rendered */
    text: PropTypes.string
  })).isRequired
};

export default TrustedEntities;
