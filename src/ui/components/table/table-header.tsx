import styled from 'styled-components';

const Header = styled.th`
  margin: 0;
  text-align: ${({ align }) => align};
  padding: 0 0 1.5rem 0;
`;

Header.defaultProps = {
  align: 'left'
};

export default Header;
