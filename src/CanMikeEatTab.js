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
    options: {filter: false}
  },{ 
    name: 'Category',
    id: 'category',
  },{
    name: 'Updated',
    id: 'updated',
    type: FU.Types.Date,
    options: { filter: false, customBodyRender: FU.timestampRender }
  },{
    name: 'Can he eat?',
    id: 'caneat',
    autoCompleteOptions: [
      'Yes!', 'No!', 'Yes... sorta...', '???', 'No! He\'s allergic!', 'Are you trying to KILL him???',
    ],
  },{
    name: 'Notes',
    id: 'notes',
    type: FU.Types.LongString,
    options: { filter: false }
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
