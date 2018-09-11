import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FireStoreTablePage from '../FireStoreTablePage';

const styles = theme => ({
  
});

const columns = [
  {
    name: 'Name',
    id: 'name',
    sort: 'asc',
  },
];

const settings = {
  path: 'exercises',
  listTitle: 'Exercises',
  drawerItemName: 'Exercise',
}

class ExercisesTab extends React.Component {
  
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

ExercisesTab.label = 'Exercises';

ExercisesTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExercisesTab);
