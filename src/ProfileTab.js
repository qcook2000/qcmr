import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import CoolGraph from './CoolGraph';


const styles = theme => ({
  
});

class ProfileTab extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CoolGraph />
      </React.Fragment>
    );
  }
}

ProfileTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileTab);
