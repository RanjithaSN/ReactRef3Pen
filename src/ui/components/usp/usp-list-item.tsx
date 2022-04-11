import { above, color } from '../../theme/theme.helpers';
import styled from 'styled-components';

const USPListItem = styled.li`
  padding: 0;
  background-color: ${color('accentSecondary')};
  color: ${color('accentTertiary')};
  font-family: PennyDisplay;
  font-size: 14px;
  padding: 0.25rem;
  font-weight: display;
  letter-spacing: 0px;
  flex-grow: 0;
  flex-shrink: 0;
  @media ${above('phone')} {
    font-size: 30px;
    padding: 1rem;
  }
`;

export default USPListItem;
