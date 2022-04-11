import { Parser } from 'html-to-react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import Paragraph from 'selfcare-ui/src/components/paragraph/paragraph';
import './marketing.callout.scss';

const htmlParser = new Parser();

const MarketingCallout = ({ actionLabel, action, content, imageUrls, title }) => {
  const [currentImage, setCurrentImage] = useState();
  const DetailLink = () => (
    <div className="c-marketing-callout__detail-link">
      <FilledButton className="c-marketing-callout__broadband-button" onClick={action}>{actionLabel}</FilledButton>
    </div>
  );

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
    <div className="c-marketing-callout">
      <div
        className="c-marketing-callout__image"
        style={{
          backgroundImage: `url(${currentImage})`
        }}
      />
      <div className="c-marketing-callout__content-container">
        <div className="c-marketing-callout__content">
          <Heading category="brand" tone="normal" className="c-marketing-callout__title">
            {htmlParser.parse(title)}
          </Heading>
          <Paragraph className="c-marketing-callout__html-content" html>{htmlParser.parse(content)}</Paragraph>
          {action && <DetailLink />}
        </div>
      </div>
    </div>
  );
};

MarketingCallout.displayName = 'MarketingCallout';
MarketingCallout.propTypes = {
  /** Label for action button */
  actionLabel: PropTypes.string,
  /** Action to do when the marketing callout is clicked */
  action: PropTypes.func,
  /** String HTML content for description */
  content: PropTypes.string,
  /** URL of the marketing callout image */
  imageUrls: PropTypes.shape({
    basic: PropTypes.string.isRequired,
    webp: PropTypes.string
  }),
  /** The String HTML header text for the marketing callout */
  title: PropTypes.string
};

export default compose(
  withRouter
)(MarketingCallout);
