import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { AppContext } from 'selfcare-ui/src/components/appContext/app.context';
import Heading from 'selfcare-ui/src/components/heading/heading';
import { MEDIA_CONTEXT_SIZES } from 'selfcare-ui/src/components/mediaContext/media.context.constants';
import { generateCreditCardDescriptor, generateCreditCardExpiration, getCreditCardLogo, isCreditCardExpired } from '../creditCard/credit.card.helper';

const CreditCardInfo = ({ creditCardTypes, displayExpiration, instrument, tags }) => (
  <AppContext.Consumer>
    {({ media }) => {
      const isSmall = media.includes(MEDIA_CONTEXT_SIZES.SMALL);

      return (
        <React.Fragment>
          <img
            alt="Credit Card Logo"
            className="c-payment-instrument-card__logo"
            src={getCreditCardLogo(instrument.CreditCard.Type)}
          />
          <div className="c-payment-instrument-card__info">
            <div className="c-payment-instrument-card__descriptor-and-expiration">
              <div className="c-payment-instrument-card__descriptor">
                <Heading category="minor" tone="normal">
                  {generateCreditCardDescriptor(creditCardTypes, instrument)}
                </Heading>
                {Boolean(tags.length) && !isSmall && (
                  <div>
                    {tags}
                  </div>
                )}
              </div>

              {Boolean(tags.length) && isSmall && (
                <div className="c-payment-instrument-card__tags-row">
                  {tags}
                </div>
              )}
            </div>
            {displayExpiration && (
              <Heading category="minor" tone="quiet">
                <div
                  className={classNames('c-payment-instrument-card__expiration', {
                    'c-payment-instrument-card__expiration--expired': isCreditCardExpired(instrument)
                  })}
                >
                  {generateCreditCardExpiration(instrument)}
                </div>
              </Heading>
            )}
          </div>
        </React.Fragment>
      );
    }}
  </AppContext.Consumer>
);

CreditCardInfo.displayName = 'CreditCardInfo';
CreditCardInfo.propTypes = {
  /** Credit card types loaded from code tables */
  creditCardTypes: PropTypes.arrayOf(PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Value: PropTypes.number.isRequired
  })).isRequired,
  displayExpiration: PropTypes.bool,
  /** Credit card to display */
  instrument: PropTypes.shape({
    BillingAddress: PropTypes.shape({
      /** Billing Address Id */
      Id: PropTypes.number
    }),
    CreditCard: PropTypes.shape({
      ExpirationMonth: PropTypes.string.isRequired,
      ExpirationYear: PropTypes.string.isRequired,
      Type: PropTypes.number.isRequired
    }),
    Id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    Name: PropTypes.string
  }),
  /** Array of Tags to display beside/below the card descriptor */
  tags: PropTypes.arrayOf(PropTypes.node)
};
CreditCardInfo.defaultProps = {
  displayExpiration: true,
  tags: []
};

export default CreditCardInfo;
