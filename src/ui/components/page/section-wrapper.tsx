import styled from 'styled-components';
import { color, spacing } from 'ui/theme/theme.helpers';

interface SectionWrapperProps {
  black?: boolean;
}

const SectionWrapper = styled.div<SectionWrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing('largePlus')} 0;
  background-color: ${({ black }) => (black ? color('accentPrimary') : 'transparent')};
  color: ${({ black }) => (black ? color('accentTertiary') : color('accentPrimary'))};
`;

export default SectionWrapper;
