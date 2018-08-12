import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddButton from './AddButton';
import EhancedTable from './EnhancedTable';

let id = 0;

function createData(name, caneat, notes) {
  id += 1;
  return { id, name, caneat, notes };
};

const data = [
  createData('Frozen yoghurt', 'Yes!', ''),
  createData('Ice cream sandwich', 'No!', 'You trying to kill him?'),
  createData('Eclair', 'Yes!', ''),
  createData('Cupcake', 'Yes!', 'Everyone loves cupcakes.'),
  createData('Gingerbread', 'Yes!', ''),
];

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'caneat', numeric: false, disablePadding: true, label: 'Can he eat?' },
  { id: 'note', numeric: false, disablePadding: true, label: 'Notes' },
];

const styles = theme => ({
  
});

class CanMikeEatTab extends React.Component {
  state = {

  };

  

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;
    return (
      <React.Fragment>
          <EhancedTable items={data} columnData={columnData}/>
          <AddButton />
      </React.Fragment>
    );
  }
}

CanMikeEatTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CanMikeEatTab);

