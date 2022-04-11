import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { StyledPageContentAside } from './page.content.styled';

const PageContentAside = ({ children, className }) => {
  return (
    <StyledPageContentAside className={classNames('c-page-content__aside', className)}>
      {children}
    </StyledPageContentAside>
  );
};

PageContentAside.displayName = 'PageContentAside';
PageContentAside.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
PageContentAside.defaultProps = {
  element: 'aside'
};

export default PageContentAside;
