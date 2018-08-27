import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FU from './FirestoreUtils';
import FireStoreTablePage from './FireStoreTablePage';

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
    options: { filter: false, sort: false },
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

class WHistoryLog extends React.Component {
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <React.Fragment>
          <FireStoreTablePage columns={columns} settings={settings}/>
      </React.Fragment>
    );
  }
}

WHistoryLog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WHistoryLog);