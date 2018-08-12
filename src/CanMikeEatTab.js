import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddButton from './AddButton';
import EnhancedTable from './EnhancedTable';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'category', numeric: false, disablePadding: true, label: 'Category' },
  { id: 'caneat', numeric: false, disablePadding: true, label: 'Can he eat?' },
  { id: 'notes', numeric: false, disablePadding: true, label: 'Notes' },
];

const styles = theme => ({
  
});

class CanMikeEatTab extends React.Component {
  render() {
    return (
      <React.Fragment>
          <EnhancedTable path='food-items' columnData={columnData} filter={['category', '==', 'Protein']}/>
          <AddButton />
      </React.Fragment>
    );
  }
}

CanMikeEatTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CanMikeEatTab);

