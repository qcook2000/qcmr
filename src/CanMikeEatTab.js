import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FireStoreTablePage from './FireStoreTablePage';
import FU from './FirestoreUtils';

const styles = theme => ({
  
});

const columns = [
  { name: 'Name',
    id: 'name',
    sort: 'asc',
  },{ 
    name: 'Category',
    id: 'category',
  },{
    name: 'Updated',
    id: 'updated',
    type: FU.Types.Date,
  },{
    name: 'Can he eat?',
    id: 'caneat',
    type: FU.Types.Reference,
    referenceCollection: 'can-eat-options',
  },{
    name: 'Notes',
    id: 'notes',
    type: FU.Types.LongString,
  },
];

const settings = {
  path: 'food-items',
  listTitle: 'Food Items',
  drawerItemName: 'Food Item',
}

class CanMikeEatTab extends React.Component {
  render() {
    return (
      <React.Fragment>
          <FireStoreTablePage columns={columns} settings={settings}/>
      </React.Fragment>
    );
  }
}

CanMikeEatTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CanMikeEatTab);
