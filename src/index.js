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

import firebase from "@firebase/app";
import "@firebase/firestore";
import { FirestoreProvider } from 'react-firestore';

var config = {
    apiKey: "AIzaSyAcr_Yi9iV9cg7v9QLGfm3ugoorGdTtRo8",
    authDomain: "canmikeeatthis.firebaseapp.com",
    databaseURL: "https://canmikeeatthis.firebaseio.com",
    projectId: "canmikeeatthis",
    storageBucket: "canmikeeatthis.appspot.com",
    messagingSenderId: "860540540828"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


class App extends React.Component {
  state = {
    selectedTab: 3,
  };

  tabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <FirestoreProvider firebase={firebase}>
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
      </FirestoreProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
