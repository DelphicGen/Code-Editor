import { ThemeProvider } from "styled-components";
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Space from './containers/Space'

function App() {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <ThemeProvider theme={ theme }>
      <Navbar />
      <Space />
    </ThemeProvider>
  );
}

export default App;
