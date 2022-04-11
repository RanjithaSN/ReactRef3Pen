import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { font } from 'ui/theme/theme.helpers';

const StyledCardHeading = styled.div`
  font-size: 3rem;
  line-height: 1;
  text-align: left;
  font-family: ${font('fontBrand')};
  letter-spacing: 0px;
  margin: 0;
  padding: 0;
`;

const CardHeading = (props: PropsWithChildren<any>) => <StyledCardHeading aria="heading" {...props} />;

export default CardHeading;
