import styled from 'styled-components';

const Cell = styled.td`
  margin: 0;
  text-align: ${({ align }) => align};
  padding: 0.5rem 0;
`;

Cell.defaultProps = {
  align: 'left'
};

export default Cell;
