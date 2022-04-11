import React, { FC } from 'react';
import styled from 'styled-components';
import { above } from 'ui/theme/theme.helpers';

interface HeadingProps {
  level?: number;
}

const headingSizes = [6, 3.75, 2.5, 1.25, 0.9375];
const headingSizesMobile = [3.75, 3.75, 2.5, 1.25, 0.9375];

const StyledHeading = styled.h1<HeadingProps>`
  font-size: ${({ level = 1 }) => headingSizesMobile[level - 1]}rem;
  line-height: 1;
  text-align: left;
  font-family: "PennyDisplay";
  letter-spacing: 0px;
  margin: 0;
  padding: 0;
  max-width: 100%;
  @media ${above('phone')} {
    font-size: ${({ level = 1 }) => headingSizes[level - 1]}rem;
  }
`;

// @ts-ignore
const Heading: FC<HeadingProps> = ({ level = 1, ...rest }) => <StyledHeading as={`h${level}`} level={level} {...rest} />;

export default Heading;
