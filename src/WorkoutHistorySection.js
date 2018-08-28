import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider } from '@material-ui/core';
import ReferenceCell from './ReferenceCell';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
  },
  rLabel: {
    
  }
});

class CanMikeEatTab extends React.Component {

  itemFor = (value, index, person) => {
    if (value.data().person === person) {
      return (
        <Grid container spacing={0} key={index}>
          <Grid item xs={5}><Typography align='right'>{value.data().reps}</Typography></Grid>
          <Grid item xs={2}><Typography align='center' color='textSecondary'>@</Typography></Grid>
          <Grid item xs={5}><Typography>{value.data().weight + 'lbs'}</Typography></Grid>
        </Grid>
      ); 
    }
    return null
  }

  render() {
    console.log(this.props.data[0].data());
    return (
      <Paper className={this.props.classes.paper}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant='title'><ReferenceCell key={this.props.data[0].data().exercise.id} path={'exercises/'+this.props.data[0].data().exercise.id}/></Typography>
            <Divider/>
          </Grid>
          <Grid item xs={1}><Typography align='left' variant='title' className={this.props.classes.rLabel}>Q</Typography></Grid>
          <Grid item xs={5}>
            {this.props.data.map( (value, index) => {return this.itemFor(value, index, 'Q'); }, this)}
          </Grid>
          <Grid item xs={1}><Typography align='left' variant='title' className={this.props.classes.rLabel}>C</Typography></Grid>
          <Grid item xs={5}>
            {this.props.data.map( (value, index) => {return this.itemFor(value, index, 'C'); }, this)}
          </Grid>
        </Grid>
      </Paper>  
    );
  }
}

CanMikeEatTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CanMikeEatTab);
