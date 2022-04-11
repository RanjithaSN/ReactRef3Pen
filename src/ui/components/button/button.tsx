import styled from 'styled-components';
import { color } from 'ui/theme/theme.helpers';

interface ButtonProps {
  variant?: string;
}

const Button = styled.button<ButtonProps>`
  font-family: PennyText;
  display: block;
  font-size: 100%;
  font-weight: bold;
  background-color: ${({ variant }) => (variant === 'primary' ? color('accentSecondary') : color('accentTertiary'))};
  padding: 1rem 1.5rem;
  color: ${({ variant }) => (variant === 'primary' ? color('accentTertiary') : color('accentSecondary'))};
  border: 1px solid ${({ variant }) => (variant === 'primary' ? color('accentSecondary') : color('accentSecondary'))};
  margin: 0;
  display: block;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) => (variant === 'primary' ? color('accentPrimary') : color('accentTertiary'))};
    color: ${({ variant }) => (variant === 'primary' ? color('textWhite') : color('accentPrimary'))};
    border-color: ${({ variant }) => (variant === 'primary' ? color('accentPrimary') : color('accentPrimary'))};
  }
`;

Button.defaultProps = {
  variant: 'primary'
};

export default Button;
