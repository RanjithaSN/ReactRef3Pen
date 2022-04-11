import styled from 'styled-components';
import { spacing } from 'ui/theme/theme.helpers';

interface StackProps {
  centered?: boolean;
  flexStart?: boolean;
  stackSpace?: string;
}

const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  align-items: ${({ centered, flexStart }) => {
    if (flexStart) {
      return 'flex-start';
    }
    return centered ? 'center' : 'stretch';
  }}};
  justify-content: ${({ centered }) => (centered ? 'center' : 'stretch')};
  > *:not(:last-child) {
    margin-bottom: ${({ stackSpace }) => spacing(stackSpace)};
  }
  > *:first-child {
    margin-bottom: 2.5rem;
  }

  > *:not(:first-child) {
    margin-bottom: 1rem;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;


Stack.defaultProps = {
  stackSpace: 'small',
  flexStart: false,
  centered: false
};

export default Stack;
