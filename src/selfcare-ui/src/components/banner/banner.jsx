import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './banner.scss';

const Banner = (props) => {
  return (
    <div className={classNames('c-banner', props.className)}>
      {props.children}
    </div>
  );
};

Banner.displayName = 'Banner';
Banner.propTypes = {
  /** Any children elements will be included in the body portion of the notification */
  children: PropTypes.node,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string
};

export default Banner;
