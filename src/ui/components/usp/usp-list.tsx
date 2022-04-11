import styled from 'styled-components';
import { above } from '../../theme/theme.helpers';

const USPList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.75rem;
  margin-top: -0.75rem;
  align-content: flex-start;
  > * {
    margin-left: 0.75rem;
    margin-top: 0.75rem;
  }
  @media ${above('phone')} {
    margin-left: -1.5rem;
    margin-top: -1.5rem;
    > * {
      margin-left: 1.5rem;
      margin-top: 1.5rem;
    }
  }
`;

export default USPList;
