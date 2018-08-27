import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';

import FU from './FirestoreUtils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import AppUI from './AppUI';


class App extends React.Component {
  constructor(props) {
    super(props);
    FU.init();
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CssBaseline />
        <AppUI></AppUI>
      </MuiPickersUtilsProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
