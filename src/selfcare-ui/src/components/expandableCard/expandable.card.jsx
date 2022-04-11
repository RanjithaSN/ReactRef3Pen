import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Heading from 'selfcare-ui/src/components/heading/heading';
import IconAngleDown from 'selfcare-ui/src/icons/react-icons/angle-down';
import IconAngleUp from 'selfcare-ui/src/icons/react-icons/angle-up';
import Card, { CardBody, CardHeader } from '../card/card';
import Link from '../link/link';
import './expandable.card.scss';

const ExpandableCard = ({ children, className, contentHeader, locked, defaultTo, header, hideHeader, hideToggle, resetToggle }) => {
  const [isOpen, setIsOpen] = useState(defaultTo === 'open');

  useEffect(() => {
    if (resetToggle) {
      setIsOpen(false);
    }
  }, [resetToggle]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleObject = () => (
    <Link className="c-expandable-card__toggle" onClick={toggleOpen} aria-hidden>{isOpen ? <IconAngleUp /> : <IconAngleDown />}</Link>
  );

  const showHeader = !(isOpen && hideHeader);

  return (
    <Card
      className={classNames('c-expandable-card', {
        'c-expandable-card--open': isOpen
      }, className)}
    >
      {
        showHeader && (
          <CardHeader appearance="seamless" className="c-expandable-card__header">
            <div>{header}</div>
            {!locked && toggleObject()}
          </CardHeader>
        )
      }
      <CardBody
        className={classNames('c-expandable-card__body', {
          'c-expandable-card__body--open': isOpen
        })}
      >
        {(!showHeader && !hideToggle) ? (
          <div className="c-expandable-card__section">
            <div className="c-expandable-card__section--top">
              <Heading className="c-expandable-card__content--header" category="major" tone="quiet">{contentHeader}</Heading>
              {toggleObject()}
            </div>
            <div className="c-expandable-card__section--bottom">
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </CardBody>
    </Card>
  );
};

ExpandableCard.displayName = 'ExpandableCard';
ExpandableCard.propTypes = {
  /** Children will be rendeded in CardBody. */
  children: PropTypes.node,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string,
  /** Conditionally set card state to open */
  defaultTo: PropTypes.oneOf(['closed', 'open']),
  /** Contentwill be rendeded in the CardHeader */
  header: PropTypes.node,
  /** Header will be hidden when card is open, but will display toggle */
  hideHeader: PropTypes.bool,
  /** Toggle will be hidden when card is open */
  hideToggle: PropTypes.bool,
  /** Toggle is not allowed */
  locked: PropTypes.bool,
  /** Expanded card header */
  contentHeader: PropTypes.string,
  /** Toggle will be set back to closed */
  resetToggle: PropTypes.bool
};

ExpandableCard.defaultProps = {
  defaultTo: 'closed',
  hideHeader: false,
  hideToggle: false
};

export default ExpandableCard;
