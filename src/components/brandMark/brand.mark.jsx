import Link from 'selfcare-ui/src/components/link/link';
import PropTypes from 'prop-types';
import React from 'react';
import './brand.mark.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReferenceLogo = require('./reference.logo.svg');

const BrandMark = ({ brandText }) => {
  return (
    <>
      <div className="c-header-brand">
        <Link to="/">
          <div className="c-header-brandMark">
            <img src={ReferenceLogo} alt={brandText} width="75" height="24" />
          </div>
        </Link>
      </div>
    </>
  );
};

BrandMark.propTypes = {
  brandText: PropTypes.string
};

export default BrandMark;
