import styled, { ThemeProvider } from "styled-components";
import { useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar';
import Space from './containers/Space'

const Container = styled.div`
  background-color: ${prop => prop.theme.colors.primary};
`;

function App() {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <ThemeProvider theme={ theme }>
      <Container>
        <Navbar />
        <Space />
      </Container>
    </ThemeProvider>
  );
}

export default App;
