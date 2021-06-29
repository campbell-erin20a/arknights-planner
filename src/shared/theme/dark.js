
import { createMuiTheme } from '@material-ui/core/styles';


export default function createDark() {
  return createMuiTheme({
    palette: {
      type: 'dark',

      primary: {
        light: '#ff4081',
        main: '#f50057',
        dark: '#c51162',
        contrastText: '#fff',
      },
      secondary: {
        light: '#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: '#fff',
      },
    },
  });
}
