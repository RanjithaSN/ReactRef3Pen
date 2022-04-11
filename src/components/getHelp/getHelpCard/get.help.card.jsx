import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Card from 'selfcare-ui/src/components/card/card';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import './get.help.card.scss';

const GetHelpCard = ({ buttonText, className, heading, onClick, subheading }) => {
  return (
    <Card className={classNames('c-get-help-card', className)}>
      {heading && <Heading className="c-get-help-card__section-content" category="major" tone="quiet">{heading}</Heading>}
      {subheading && <Heading className="c-get-help-card__section-content" category="minor" tone="normal">{subheading}</Heading>}
      <Link className="c-get-help-card__section-content " onClick={onClick}><Heading className="c-get-help-card__section-link" category="minor" tone="normal">{buttonText}</Heading></Link>
    </Card>
  );
};

GetHelpCard.propTypes = {
  /** Text to display in button */
  buttonText: PropTypes.string.isRequired,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Text to display in heading */
  heading: PropTypes.string,
  /** Callback invoked when button is clicked */
  onClick: PropTypes.func.isRequired,
  /** Text to display in subheading */
  subheading: PropTypes.string
};

export default GetHelpCard;
