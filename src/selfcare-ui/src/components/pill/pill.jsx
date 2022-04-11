import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from 'selfcare-ui/src/components/heading/heading';
import './pill.scss';

export const Pill = ({ className, id, mode, text }) => {
  const coloring = mode === 'primary' ? 'c-pill__primary' : 'c-pill__inverted';
  return (
    <div id={id} className={classNames(`c-pill ${coloring}`, className)}>
      <Heading category="minor" tone="quiet">{text}</Heading>
    </div>
  );
};

Pill.displayName = 'Pill';
Pill.propTypes = {
  /** Additional classNames for the Pill component */
  className: PropTypes.string,
  /** The ID of the element */
  id: PropTypes.string.isRequired,
  /** The light/dark coloring of the Pill */
  mode: PropTypes.oneOf(['primary', 'inverted']).isRequired,
  /** The text that will appear in the Pill */
  text: PropTypes.string.isRequired
};
Pill.defaultProps = {};
