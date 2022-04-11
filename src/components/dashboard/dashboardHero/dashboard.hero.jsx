import classNames from 'classnames';
import { Parser } from 'html-to-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FilledButton from 'selfcare-ui/src/components/button/filled.button';
import Heading from 'selfcare-ui/src/components/heading/heading';
import PageContent, { Main } from '../../pageContent/page.content';
import './dashboard.hero.scss';
import { getColorVariantFromFilename } from './hero.helpers';

const DashboardHero = ({ action, actionLabel, className, header, subHeader, imageUrls, variant }) => {
  const initialImgUrl = imageUrls.webp || imageUrls.basic;
  const [currentImage, setCurrentImage] = useState(initialImgUrl);
  const imageColorVariant = getColorVariantFromFilename(imageUrls.basic);
  const htmlParser = new Parser();

  useEffect(() => {
    if (window.Modernizr) {
      window.Modernizr.on('webp', (supported) => {
        if (supported && imageUrls.webp) {
          setCurrentImage(imageUrls.webp);
        } else {
          setCurrentImage(imageUrls.basic);
        }
      });
    }
  }, [imageUrls.basic, imageUrls.webp, setCurrentImage]);

  const tokenize = (input, divider = ';') => (input && input.length ? input.split(divider) : []);

  return (
    <div
      className={classNames('c-dashboard-hero', [`c-dashboard-hero--${variant || imageColorVariant}`], className)}
      style={{
        backgroundImage: `url(${currentImage})`
      }}
    >
      <PageContent>
        <Main className="c-dashboard-hero__main">
          <div className="c-dashboard-hero__children-spacing">
            <Heading category="brand" tone="loud">{htmlParser.parse(header)}</Heading>
            <div className="c-dashboard-hero__heading_container">
              {subHeader && (tokenize(subHeader).length > 1 ?
                (
                  tokenize(subHeader).map((headerEntry, index) => (
                    <Heading key={`heading-${index}`} className="c-dashboard-hero__heading_entry" category="minor">{headerEntry}</Heading>
                  ))
                ) :
                <Heading category="minor">{subHeader}</Heading>)
              }
            </div>
            {action && actionLabel && <FilledButton className="c-dashboard-hero__main--button" onClick={action}>{actionLabel}</FilledButton>}
          </div>
        </Main>
      </PageContent>
    </div>
  );
};

DashboardHero.displayName = 'DashboardHero';
DashboardHero.propTypes = {
  /** Action function */
  action: PropTypes.func,
  /** Action label for button */
  actionLabel: PropTypes.string,
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** String HTML header to display for the hero */
  header: PropTypes.string.isRequired,
  /** Image url to use for the header */
  imageUrls: PropTypes.shape({
    basic: PropTypes.string.isRequired,
    webp: PropTypes.string
  }).isRequired,
  /** Sub Header to use for the hero */
  subHeader: PropTypes.string,
  /** Variant attribute */
  variant: PropTypes.oneOf(['dark', 'light'])
};

export default DashboardHero;
