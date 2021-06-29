
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { Global, css } from '@emotion/react';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import createLight from './light';
import createDark from './dark';


// const GET_THEME = gql `

// `;


export default function ThemeProvider({ children }) {
  // const _setting = useSelector(getSetting('theme'));
  // const setting = {
  //   dark: _setting === 'DARK',
  //   light: _setting === 'LIGHT',
  // };
  const setting = { dark: true, light: false };
  const prefer = {
    dark: useMediaQuery('(prefers-color-scheme: dark)'),
    light: useMediaQuery('(prefers-color-scheme: light)'),
  };

  const createTheme =
    setting.dark  ? createDark :
    setting.light ? createLight :
    prefer.dark   ? createDark :
    prefer.light  ? createLight :
    /* else */      createDark;

  // const dispatch = useDispatch();
  // if( (setting !== 'DARK') && (createTheme === createDark) ) {
  //   dispatch(setSetting('theme', 'DARK'));
  // }
  // if( (setting !== 'LIGHT') && (createTheme === createLight) ) {
  //   dispatch(setSetting('theme', 'LIGHT'));
  // }

  const theme = useMemo(() => createTheme(), [ createTheme ]);
  return <EmotionThemeProvider theme={ theme }>
    <MuiThemeProvider theme={ theme }>
      <CssBaseline/>
      <Global styles={css `
        body {
          scrollbar-color: #424242 #303030;
          overflow-y: scroll;
        }
      `} />
      { children }
    </MuiThemeProvider>
  </EmotionThemeProvider>;
}
ThemeProvider.propTypes = {
  children: PropTypes.node,
};
