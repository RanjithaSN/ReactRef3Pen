import { color } from '../../theme/theme.helpers';
import styled, { css } from 'styled-components';

const Card_Deprecated = styled.div`

  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${({ active }) => (active ? css`
    border: 1px solid ${color('accentSecondary')};
    background-color: ${color('accentSecondary')};
      color: ${color('accentTertiary')};

  ` : css`
    border: 1px solid #c6c6c6;
    &:hover {
      border: 1px solid ${color('accentSecondary')};
      background-color: ${color('accentSecondary')};
      color: ${color('accentTertiary')};
    }
  `)}
`;

export default Card_Deprecated;
