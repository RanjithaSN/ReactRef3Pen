import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { mediaContextSize } from 'ui/theme/theme.helpers';

const StyledContainer = styled.div`
  width: 100%;
  max-width: ${mediaContextSize('mqMaxWidth')};
  margin: 0 auto;
`;

const Container = ({ children, className }) => (
  <StyledContainer className={className}>
    {children}
  </StyledContainer>
);

Container.displayName = 'Container';
Container.propTypes = {
  children: PropTypes.node,
  /** Allows you to pass additional classes for layout concerns */
  className: PropTypes.string
};

export default Container;
