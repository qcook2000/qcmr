import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import AppUI from './AppUI';
import { BrowserRouter } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, red, cyan } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Raleway',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    display4: { fontWeight: 700 },
    display3: { fontWeight: 700 },
    display2: { fontWeight: 700 },
    display1: { fontWeight: 700 },
    headline: { fontWeight: 700 },
    title: { fontWeight: 700 },
    subheading: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    body1: { fontWeight: 400 },
    caption: { fontWeight: 400 },
    button: { fontWeight: 700 },
  },
  shape: {
    borderRadius: '16px 0px 16px 0px'
  },
  palette: {
    type: 'dark',
    primary: {
      light: purple[700],
      main: purple[900],
      dark: '#000000',
    },
    secondary: {
      light: cyan[600],
      main: cyan[800],
      dark: cyan[900],
    },
    error: {
      light: red[700],
      main: red[900],
      dark: '#000000',
    },
    background: {
      default: '#1d1d1d',
      paper: '#222222',
    },
  },
  overrides: {
    MuiButton: {
      contained: { 
        background: `linear-gradient(45deg, ${purple[900]} 30%, ${cyan[800]} 90%)`, // Some CSS
      },
    },
  },
});




class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <AppUI></AppUI>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
