import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import GlobalStyle from '../components/styles/GlobalStyles';
import StoreProvider from '../store/store-context';

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
    purple: 'rgba(67, 56, 202, 1)',
    purpleDark: 'rgba(79, 70, 229, 1)',
    black: 'rgba(17, 24, 39, 1)',
    white: '#ffffff',
    white100: 'rgba(229, 231, 235, 1)',
    white200: 'rgba(249, 250, 251, 1)',
  },
  breakpoints: {
    sm: 'min-width: 640px', // small device
    md: 'min-width: 768px', // medium device
    lg: 'min-width: 1024px', // large device
    xl: 'min-width: 1280px', // extra large device
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  );
}
