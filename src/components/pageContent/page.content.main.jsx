import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { StyledPageContentMain } from './page.content.styled';

const PageContentMain = ({ children, className, isShop }) => {
  return (
    <StyledPageContentMain
      className={classNames('c-page-content__main', className, {
        'c-page-content__main--isShop': isShop
      })}
    >
      {children}
    </StyledPageContentMain>
  );
};

PageContentMain.displayName = 'PageContentMain';
PageContentMain.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Flag to render styling based on if it is in the shop flow */
  isShop: PropTypes.bool
};
PageContentMain.defaultProps = {
  element: 'main',
  isShop: false
};

export default PageContentMain;
