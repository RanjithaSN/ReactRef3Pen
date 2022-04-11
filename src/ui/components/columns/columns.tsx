import styled from 'styled-components';
import { above, spacing } from 'ui/theme/theme.helpers';

interface ColumnsProps {
  size: number;
  stack?: boolean;
  columnSpace?: string;
}

const Columns = styled.div<ColumnsProps>`
  display: grid;
  grid-template-columns: repeat(${({ size, stack }) => (stack ? 1 : size)}, 1fr);
  @media ${above('phone')} {
    grid-template-columns: repeat(${({ size }) => size}, 1fr);
  }
  grid-gap: ${({ columnSpace }) => spacing(columnSpace)};
`;

Columns.defaultProps = {
  columnSpace: 'small',
  stack: true,
  size: 2
};


export default Columns;
