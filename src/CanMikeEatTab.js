import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EnhancedTable from './EnhancedTable';

const columnData = [
    { id: 'name', label: 'Name', defaultSort: true},
    { id: 'category', label: 'Category' },
    { id: 'updated', label: 'Updated', type: EnhancedTable.DataTypes.Date },
    { id: 'caneat', label: 'Can he eat?', autoCompleteOptions: [
      "Yes!", "No!", "Yes... sorta...", "???", "No! He's allergic!", "Are you trying to KILL him???",
    ]},
    { id: 'notes', label: 'Notes', type: EnhancedTable.DataTypes.LongString },
];

const styles = theme => ({
  
});

class CanMikeEatTab extends React.Component {
  render() {
    const { eatTabFilter } = this.props;
    return (
      <React.Fragment>
        <EnhancedTable path='food-items' columnData={columnData} itemName='Food' filter={eatTabFilter} orderBy='name'/>
      </React.Fragment>
    );
  }
}

CanMikeEatTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CanMikeEatTab);

