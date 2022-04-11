import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import IconPlaceholderImage from '../../icons/react-icons/placeholder-image';
import './placeholder.image.scss';


const PlaceholderImage = ({ className, width, height }) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`
    }}
    className={classNames('c-placeholder-image', className)}
  >
    <IconPlaceholderImage className="c-placeholder-image__content" />
  </div>
);

PlaceholderImage.displayName = 'PlaceholderImage';
PlaceholderImage.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** The height of the image to set */
  height: PropTypes.string,
  /** The width of the image to set */
  width: PropTypes.string
};
PlaceholderImage.defaultProps = {};

export default PlaceholderImage;
