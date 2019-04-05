import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

html {
  height: 100%;
}
body {
  height: 100%;
  font-family:  'ClanPro', sans-serif;
  background-color: #F7F7F7;
}
`;

export default GlobalStyle;
