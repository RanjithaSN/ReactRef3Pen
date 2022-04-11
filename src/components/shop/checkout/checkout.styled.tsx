import styled from 'styled-components';
import { spacing, mediaContextSize } from 'ui/theme/theme.helpers';

export const CheckoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const CheckoutMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: ${spacing('medium')} ${spacing('large')};

  @media screen and (min-width: ${mediaContextSize('mqMaxWidth')}) {
    padding-left: ${spacing('large')};
    padding-right: ${spacing('large')};
  }
`;
