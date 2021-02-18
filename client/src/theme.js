import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import React from 'react';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors: {
    black: '#16161D',
    blue: {
      50: '#dcf3ff',
      100: '#aed7ff',
      200: '#7dbdff',
      300: '#4aa2ff',
      400: '#1a87ff',
      500: '#006ee6',
      600: '#0055b4',
      700: '#003d82',
      800: '#002551',
      900: '#000d21',
    },
    green: {
      50: '#e4fced',
      100: '#c2edd4',
      200: '#9edfb9',
      300: '#79d29e',
      400: '#55c684',
      500: '#3bac6a',
      600: '#2d8652',
      700: '#1e6039',
      800: '#0e3a21',
      900: '#001507',
    },
  },
  fonts,
  breakpoints,
  icons: {
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
});

export default theme;
