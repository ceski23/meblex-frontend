import { createGlobalStyle } from 'styled-components';
import { Theme } from 'theme';

export const GlobalStyle = createGlobalStyle<{theme: Theme}>`
  body {
    margin: 0;
    font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4 {
    color: ${({ theme }) => theme.colors.textDark};
    font-family: 'Merriweather Sans', 'Noto Sans', sans-serif;
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};    
  }

  #root {
    height: 100vh;
  }
`;
