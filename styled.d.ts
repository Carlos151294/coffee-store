import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;

      purple: string;
      purpleDark: string;
      
      black: string;
      white: string;
      white100: string;
      white200: string;
    };

    breakpoints: {
      sm: string; // small device
      md: string; // medium device
      lg: string; // large device
      xl: string; // extra large device
    };
  }
}
