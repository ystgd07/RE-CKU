import Router from 'Router';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { ThemeProvider } from '@emotion/react';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router />
        </ThemeProvider>
    );
}

export default App;
