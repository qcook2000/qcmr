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


class App extends React.Component {
  state = {
    selectedTab: 0,
  };

  tabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;
    return (
      <React.Fragment>
          <CssBaseline />
          <AppBar position="sticky">
            <Tabs value={selectedTab} onChange={this.tabChange} name="selectedTab">
              <Tab label="Can Mike Eat?" />
              <Tab label="Exercises" />
              <Tab label="Workouts" />
              <Tab label="Profile" />
            </Tabs>
          </AppBar>
          {selectedTab === 0 && <CanMikeEatTab />}
          {selectedTab === 1 && <ExercisesTab />}
          {selectedTab === 2 && <WorkoutsTab />}
          {selectedTab === 3 && <ProfileTab />}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
