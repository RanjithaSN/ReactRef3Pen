import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ charSet, description, isRunningMobile, title }) => {
  return (
    <Helmet>
      <meta charSet={charSet} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {isRunningMobile && <meta name="viewport" content="initial-scale=1, width=device-width, height=device-height, viewport-fit=cover, user-scalable=no" />}
    </Helmet>
  );
};

MetaData.defaultProps = {
  charSet: 'utf-8',
  title: '',
  description: ''
};

MetaData.propTypes = {
  /** charSet used to set meta tag */
  charSet: PropTypes.string,
  /** Descroption of the page used for SEO */
  description: PropTypes.string,
  /** Boolean to determing if we are running in the mobile app proper or not. */
  isRunningMobile: PropTypes.bool.isRequired,
  /** Title of the page for the rendering in the tab at the top of the browser */
  title: PropTypes.string
};

export default MetaData;
