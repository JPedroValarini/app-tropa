import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background: #F6F6F6;
  }
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;