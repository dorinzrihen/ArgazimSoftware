import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import theme from './context/theme';
import queryClient from './context/queryClient';
import ArgazimMainPage from './pages/ArgazimMainPage/ArgazimMainPage';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ArgazimMainPage/>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
