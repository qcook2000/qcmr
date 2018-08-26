import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FU from './FirestoreUtils';
import FireStoreTablePage from './FireStoreTablePage';
import LogSetDialog from './LogSetDialog';

const styles = theme => ({
  
});
//Date	Exercise	Person	Weight	Reps	ExerciseNumber	Power	AddedWeight	SideWeight

const columns = [
  { name: 'Date',
    id: 'Date',
    type: FU.Types.Date,
    options: { filter: false, customBodyRender: FU.timestampRender },
  },{ 
    name: 'Exercise',
    id: 'Exercise',
    type: FU.Types.Reference,
    referenceCollection: 'exercises',
  },{
    name: 'Person',
    id: 'Person',
  },{
    name: 'Weight',
    id: 'Weight',
    options: { filter: false },
  },{
    name: 'Reps',
    id: 'Reps',
    options: { filter: false },
  },
];

const settings = {
  path: 'workout-history',
  listTitle: 'Workout History',
  drawerItemName: 'Exercise',
}

class WorkoutsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logOpen: false
    };
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  addButtonClicked = () => {
    this.setState({logOpen: true, logTime: new Date()});
  };

  handleClose = () => {
    this.setState({logOpen: false});
  }

  render() {
    return (
      <React.Fragment>
          <FireStoreTablePage columns={columns} settings={settings} addButtonClicked={this.addButtonClicked}/>
          <LogSetDialog open={this.state.logOpen} handleClose={this.handleClose} key={this.state.logTime}/>
      </React.Fragment>
    );
  }
}

WorkoutsTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkoutsTab);
