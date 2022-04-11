import styled from 'styled-components';

interface InlineProps {
  inline?: boolean;
  grow?: boolean;
}

const Inline = styled.div<InlineProps>`
  flex-direction: row;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-grow: ${({ grow }) => (grow ? 1 : 0)};
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  > * {
    margin-left: 0.5rem;
    margin-top: 0.5rem;
  }
`;

export default Inline;
