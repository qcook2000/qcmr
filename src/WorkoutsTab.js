import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});

class WorkoutsTab extends React.Component {
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
          HELLO WORKOUT TAB
      </React.Fragment>
    );
  }
}

WorkoutsTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkoutsTab);
