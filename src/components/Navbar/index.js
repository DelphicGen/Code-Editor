import styled from 'styled-components'
import ToggleSwitch from '../ToggleSwitch'

const Nav = styled.div`
  display: flex;
  justify-content: right;
  background-color: ${prop => prop.theme.colors.primary};
  border-bottom: 2px solid ${prop => prop.theme.colors.quaternary};
  padding: 12px 20px;
`;

const Navbar = () => {
  return (
    <Nav>
      <ToggleSwitch />
    </Nav>
  )
}

export default Navbar
