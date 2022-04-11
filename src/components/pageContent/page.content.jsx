import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Container from 'selfcare-ui/src/components/container/container';
import PageContentAside from './page.content.aside';
import PageContentMain from './page.content.main';
import { StyledPageContent } from './page.content.styled';

const PageContent = ({ children, className, variant, ...props }) => {
  return (
    <StyledPageContent
      className={classNames('c-page-content', [`c-page-content--${variant}`], className)}
      {...props}
    >
      <Container className={classNames('c-page-content__container', [`c-page-content__container--${variant}`])}>
        {children}
      </Container>
    </StyledPageContent>
  );
};

PageContent.displayName = 'PageContent';
PageContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['aside-left', 'aside-right', 'flush', 'flush-no-max', 'one-column', 'two-column'])
};
PageContent.defaultProps = {
  element: 'article',
  variant: 'one-column'
};

export default PageContent;
export { PageContentAside as Aside, PageContentMain as Main };
