
import { createMuiTheme } from '@material-ui/core/styles';


export default function createLight() {
  return createMuiTheme({
    palette: {
      type: 'light',
    },
  });
}
