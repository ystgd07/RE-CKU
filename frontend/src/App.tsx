import Router from 'Router';
import { Reset } from 'styled-reset';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { ThemeProvider } from '@emotion/react';

function App() {
   return (
      <ThemeProvider theme={theme}>
         <Reset />
         <GlobalStyle />
         <Router />
      </ThemeProvider>
   )
}

export default App;
