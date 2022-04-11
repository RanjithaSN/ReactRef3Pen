import styled from 'styled-components';
import { general } from 'ui/theme/theme.helpers';

export const MobileSpacerTop = styled.div`
  height: env(safe-area-inset-top);
  background-color: ${general('accent', 'secondary')};
  width: 100%;
`;
