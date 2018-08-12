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

let data = [
  createData('Frozen yoghurt', 'Yes!', ''),
  createData('Ice cream sandwich', 'No!', 'You trying to kill him?'),
  createData('Eclair', 'Yes!', ''),
  createData('Cupcake', 'Yes!', 'Everyone loves cupcakes.'),
  createData('Gingerbread', 'Yes!', ''),
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
          <EhancedTable items={data}/>
          <AddButton />
      </React.Fragment>
    );
  }
}

CanMikeEatTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CanMikeEatTab);

