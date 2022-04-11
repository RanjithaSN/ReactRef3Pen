import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import PlaceholderImage from '../placeholderImage/placeholder.image';
import './external.image.scss';


class ExternalImage extends React.Component {
    state = {
      currentIndex: 0,
      supportsWebp: false
    };

    componentDidMount() {
      window.Modernizr.on('webp', (supported) => {
        this.setState(() => ({
          supportsWebp: supported
        }));
      });
    }

    get currentImage() {
      return this.normalizedImageArray[this.state.currentIndex];
    }

    get normalizedImageArray() {
      const { imageUrls } = this.props;
      const imageArray = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
      return imageArray.filter((img) => img);
    }

    handleError = () => {
      this.setState((prevState) => ({
        currentIndex: Math.min(prevState.currentIndex + 1, this.normalizedImageArray.length)
      }));
    };

    render() {
      const { className, altElement, altText, width, height } = this.props;

      if (!this.currentImage && ('altElement' in this.props)) {
        if (typeof altElement === 'object') {
          return React.cloneElement(altElement, {
            className,
            width,
            height
          });
        }
        return altElement;
      }

      return (
        <img
          className={
            classNames(
              'c-external-image',
              {
                'c-external-image__max-width': !width,
                'c-external-image__max-height': !height
              },
              className
            )}
          onError={this.handleError}
          src={this.state.supportsWebp && this.currentImage.webp ? this.currentImage.webp : this.currentImage.basic}
          width={width}
          height={height}
          alt={altText}
        />
      );
    }
}

ExternalImage.displayName = 'ExternalImage';
ExternalImage.propTypes = {
  /** Content to render in place of a broken image in case there are no valid images */
  altElement: PropTypes.node,
  /** Text the browser will render if there is issue fetching the image. Used for accessibility */
  altText: PropTypes.string,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** The height of the image to set */
  height: PropTypes.string,
  /** The URL or list of URLS of the image to fallback to */
  imageUrls: PropTypes.oneOfType([
    PropTypes.shape({
      basic: PropTypes.string.isRequired,
      webp: PropTypes.string
    }),
    PropTypes.shape(PropTypes.arrayOf({
      basic: PropTypes.string.isRequired,
      webp: PropTypes.string
    }))
  ]),
  /** The width of the image to set */
  width: PropTypes.string
};
ExternalImage.defaultProps = {
  altElement: <PlaceholderImage />
};

export default ExternalImage;
