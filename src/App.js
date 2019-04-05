import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import theme from './theme';

const App = () => (
  <Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div>Hello Downtown 65</div>
    </ThemeProvider>
  </Fragment>
);

export default App;
