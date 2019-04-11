import Color from 'color';

const blue = '#07c';
const red = '#FF5471';
const lightgray = '#9a9a9a';
const darkWhite = '#f4f4f5';
const black = "#140D33";
const pink = "#FF80EA";
const white = "#fff";

const theme = {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],

  colors: {
    blue,
    lightgray,
    red,
    black,
    pink,
    white,
    darkWhite,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  // fonts: {
  //   sans: 'Mukta, sans-serif',
  //   mono: 'Mukta, monospace',
  // },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)',
  },
  cards: {
    basic: {
      backgroundColor: white,

    }
  },
  buttons: {
    primary: {
      color: white,
      backgroundColor: pink,
      "&:hover": {
        backgroundColor: Color(pink).lighten(0.1).string(),
      },
      "&:disabled": {
        backgroundColor: Color(pink).lighten(0.1).string(),
        cursor: 'not-allowed'
      },
    },
    outline: {
      color: blue,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
      "&:hover": {
        color: Color(blue).lighten(0.5).string(),
      },
    },
    outlinePrimary: {
      color: pink,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px',
      
    },
  },
};

export default theme;
