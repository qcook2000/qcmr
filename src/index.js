import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import AppUI from './AppUI';
import { BrowserRouter } from 'react-router-dom'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <AppUI></AppUI>
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
