import styled from 'styled-components';

const CardFooter = styled.div`
  padding: 1.5rem 1rem;
  flex-grow: 0;
  flex-shrink: 1;
  &:not(:only-child) {
    padding: 0 1rem 1.5rem 1rem;
  }
`;

export default CardFooter;
