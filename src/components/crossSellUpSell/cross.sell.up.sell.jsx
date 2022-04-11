import { Parser } from 'html-to-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Link from 'selfcare-ui/src/components/link/link';
import IconArrowThinRight from 'selfcare-ui/src/icons/react-icons/arrow-thin-right';
import './cross.sell.up.sell.scss';

const htmlParser = new Parser();

const CrossSellUpSell = ({ actionLink, description, header, imageUrls }) => {
  const [currentImage, setCurrentImage] = useState();
  useEffect(() => {
    let mounted = true;
    window.Modernizr.on('webp', (supported) => {
      if (mounted) {
        if (supported && imageUrls.webp) {
          setCurrentImage(imageUrls.webp);
        } else {
          setCurrentImage(imageUrls.basic);
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [imageUrls.basic, imageUrls.webp, setCurrentImage]);

  return (
    <div
      className="c-cross-sell-up-sell"
      style={{
        backgroundImage: `url(${currentImage})`
      }}
    >
      <div className="c-cross-sell-up-sell__main">
        <Heading category="brand">{htmlParser.parse(header)}</Heading>
        <Heading category="minor">{description}</Heading>
        {actionLink && (
          <Link className="c-cross-sell-up-sell__marketing-callout-link" href={actionLink} aria-label={description}>
            <IconArrowThinRight className="c-cross-sell-up-sell__marketing-callout-link--icon" />
          </Link>
        )}
      </div>
    </div>
  );
};

CrossSellUpSell.displayName = 'CrossSellUpSell';
CrossSellUpSell.propTypes = {
  /** Path to be routed to when the marketing callout is clicked */
  actionLink: PropTypes.string,
  /** String content for description */
  description: PropTypes.string,
  /** The HTML header text */
  header: PropTypes.string,
  /** URL of the marketing callout image */
  imageUrls: PropTypes.shape({
    basic: PropTypes.string.isRequired,
    webp: PropTypes.string
  })
};

export default CrossSellUpSell;
