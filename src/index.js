import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CanMikeEatTab from './CanMikeEatTab';
import ExercisesTab from './ExercisesTab';
import WorkoutsTab from './WorkoutsTab';
import ProfileTab from './ProfileTab';

import FU from './FirestoreUtils';
import PubSub from 'pubsub-js';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import TodoTab from './TodoTab';


class App extends React.Component {
  constructor(props) {
    super(props);
    FU.init();
    this.state = {
      selectedTab: 0,
    };
  }

  componentDidMount() {
    PubSub.subscribe('tabChange', this.tabChangeSubReceived);
  }
  

  tabChangeSubReceived = (msg, data) => {
      console.log( msg, data)
      this.setState({ selectedTab: data.tabIndex })
      if (data.tabIndex === 0) {
        console.log(data);
        this.setState({ eatTabFilter: data.eatTabFilter});
      }
  }

  tabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { selectedTab, eatTabFilter } = this.state;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <React.Fragment>
          <CssBaseline />
          <AppBar position="sticky">
            <Tabs value={selectedTab} onChange={this.tabChange} name="selectedTab">
              <Tab label="Can Mike Eat?" />
              <Tab label="Exercises" />
              <Tab label="Workouts" />
              <Tab label="Profile" />
              <Tab label="Todo" />
            </Tabs>
          </AppBar>
          {selectedTab === 0 && <CanMikeEatTab eatTabFilter={eatTabFilter}/>}
          {selectedTab === 1 && <ExercisesTab />}
          {selectedTab === 2 && <WorkoutsTab />}
          {selectedTab === 3 && <ProfileTab />}
          {selectedTab === 4 && <TodoTab />}
        </React.Fragment>
      </MuiPickersUtilsProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
