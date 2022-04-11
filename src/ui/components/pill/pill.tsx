import styled from 'styled-components';
import { color } from 'ui/theme/theme.helpers';

const Pill = styled.span`
  display: block;
  font-size: 12px;
  letter-spacing: 0.32px;
  background-color: ${color('accentSecondary')};
  padding: 0.25rem 0.5rem;
  color: #fff;
  height: 1.5rem;
  line-height: 1rem;
`;

export { default as PillContainer } from './pill-container';

export default Pill;
