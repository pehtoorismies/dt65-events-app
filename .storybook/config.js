import React from 'react';
import { ThemeProvider } from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import GlobalStyle from '../src/GlobalStyle';
import theme from '../src/theme';



const withGlobalStyles = storyFn => (
  <React.Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: '#dfdfdf',
        }}
      >
        {storyFn()}
      </div>
    </ThemeProvider>
  </React.Fragment>
);

addDecorator(withGlobalStyles);


// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /\.stories\.jsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
