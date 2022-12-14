import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-family: IBMPlexSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: url("/static/background.png");

    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    color: #373b64;

    @font-face {
      font-family: 'IBMPlexSans';
      font-style: normal;
      font-weight: 500;
      src: url(/fonts/IBMPlexSans-Regular.ttf) format('truetype');
      font-display: swap;
    }
    
    @font-face {
      font-family: 'IBMPlexSans';
      font-style: normal;
      font-weight: 600;
      src: url(/fonts/IBMPlexSans-SemiBold.ttf) format('truetype');
      font-display: swap;
    }
    
    @font-face {
      font-family: 'IBMPlexSans';
      font-style: normal;
      font-weight: 700;
      src: url(/fonts/IBMPlexSans-Bold.ttf) format('truetype');
      font-display: swap;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  p {
    font-weight: 500;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  pre {
    margin: 0;
  }

  button {
    background-color: transparent;
    background-image: none;
    font-weight: 600;
  }

  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

export default GlobalStyle;
