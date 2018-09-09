import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FireStoreTablePage from './FireStoreTablePage';
import { db } from './firebase';

const styles = theme => ({
  
});

const columns = [
  { name: 'Done',
    id: 'done',
    type: db.Types.Boolean,
  },{ 
    name: 'Todo',
    id: 'text',
    options: {filter: false}
  },
];

const settings = {
  path: 'todos',
  listTitle: 'Todos',
  drawerItemName: 'Todo',
}

class TodoTab extends React.Component {
  render() {
    return (
      <React.Fragment>
          <FireStoreTablePage columns={columns} settings={settings}/>
      </React.Fragment>
    );
  }
}

TodoTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoTab);
