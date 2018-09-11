import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { db } from '../firebase';
import FireStoreTablePage from '../FireStoreTablePage';

const styles = theme => ({
  
});

const columns = [
  { name: 'Date',
    id: 'timestamp',
    type: db.Types.Date,
    sort: 'desc',
  },{ 
    name: 'Exercise',
    id: 'exercise',
    type: db.Types.Reference,
    referenceCollection: 'exercises',
  },{
    name: 'Person',
    id: 'person',
  },{
    name: 'Weight',
    id: 'weight',
  },{
    name: 'Reps',
    id: 'reps',
  },
];

const settings = {
  path: 'workouts',
  listTitle: 'Workout History',
  drawerItemName: 'Exercise',
}

class WorkoutHistoryTab extends React.Component {
  
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

WorkoutHistoryTab.label = 'Workout History';

WorkoutHistoryTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkoutHistoryTab);