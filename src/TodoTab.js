import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FireStoreTablePage from './FireStoreTablePage';
import FU from './FirestoreUtils';

const styles = theme => ({
  
});

const columns = [
  { name: 'Done',
    id: 'done',
    type: FU.Types.Boolean,
    options: { customBodyRender: FU.booleanRender }
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
