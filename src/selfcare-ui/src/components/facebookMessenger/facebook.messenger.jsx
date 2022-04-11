import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './facebook.messenger.scss';

const FacebookMessenger = ({ className }) => (
  <div className={classNames('c-facebook-messenger', className)}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" version="1.1" viewBox="0 0 224 226">
      <defs>
        <linearGradient id="a" y1="6.76%" x2="50%" x1="50%" y2="95.6%">
          <stop stopColor="#00C6FF" offset="0" />
          <stop stopColor="#0068FF" offset="1" />
        </linearGradient>
      </defs>
      <path id="balloon" fill="url(#a)" d="m41.255 185.52v40.2l37.589-21.37c10.478 3.02 21.616 4.65 33.156 4.65 61.86 0 112-46.79 112-104.5 0-57.714-50.14-104.5-112-104.5-61.856 0-112 46.786-112 104.5 0 32.68 16.078 61.86 41.255 81.02z" />
      <path id="bolt" fill="#fff" d="m100.04 75.878l-60.401 63.952 54.97-30.16 28.721 30.16 60.06-63.952-54.36 29.632-28.99-29.632z" />
    </svg>
  </div>
);

FacebookMessenger.displayName = 'FacebookMessenger';
FacebookMessenger.propTypes = {
  className: PropTypes.string
};

export default FacebookMessenger;