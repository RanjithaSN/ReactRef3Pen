import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'selfcare-ui/src/components/heading/heading';
import { generatePaymentMethodDescriptor, generatePaymentMethodExpiration, getPaymentCardLogo, isPaymentMethodExpired } from '../adyenExternalPaymentMethod/payment.method.helper';
import './payment.instrument.card.scss';

const ExternalInstrumentInfo = ({ displayExpiration, instrument, tags, locale }) => (
  <React.Fragment>
    <div className="c-payment-instrument-card__info">
      <img
        alt="Credit Card Logo"
        className="c-payment-instrument-card__logo"
        src={getPaymentCardLogo(instrument)}
      />
      <div className="c-payment-instrument-card__descriptor-and-expiration">

        <div className="c-payment-instrument-card__descriptor">
          <Heading category="minor" tone="normal">{generatePaymentMethodDescriptor(instrument)}</Heading>

        </div>
        {displayExpiration && (
          <div
            className={classNames('c-payment-instrument-card__expiration', {
              'c-payment-instrument-card__expiration--expired': isPaymentMethodExpired(instrument)
            })}
          >
            <Heading category="minor" tone="quiet">{generatePaymentMethodExpiration(instrument, locale)}</Heading>
          </div>
        )}

      </div>
      <div className="c-payment-instrument-card-tags__container">
        {Boolean(tags.length) && (
          <div>
            {tags}
          </div>
        )}
      </div>
    </div>
  </React.Fragment>
);

ExternalInstrumentInfo.displayName = 'ExternalInstrumentInfo';
ExternalInstrumentInfo.propTypes = {
  displayExpiration: PropTypes.bool,
  /** External payment instrument to display */
  instrument: PropTypes.shape({
    Created: PropTypes.string,
    Default: PropTypes.bool,
    ExternalBill: PropTypes.shape({
      AccountNumber: PropTypes.string,
      ExpirationMonth: PropTypes.string,
      ExpirationYear: PropTypes.string,
      ExternalBillData: PropTypes.string,
      NameOnAccount: PropTypes.string,
      Type: PropTypes.number
    }),
    Id: PropTypes.number,
    Name: PropTypes.string,
    Type: PropTypes.number,
    TypeName: PropTypes.string
  }),
  /** The locale with which to render the date. */
  locale: PropTypes.string.isRequired,
  /** Array of Tags to display beside/below the card descriptor */
  tags: PropTypes.arrayOf(PropTypes.node)
};
ExternalInstrumentInfo.defaultProps = {
  displayExpiration: true,
  tags: []
};

export default ExternalInstrumentInfo;
