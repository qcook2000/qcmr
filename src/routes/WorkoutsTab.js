import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { db } from '../firebase';
import Grid from '@material-ui/core/Grid';
import DatePicker from 'material-ui-pickers/DatePicker';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LogSetDialog from '../components/LogSetDialog';
import WorkoutHistorySection from '../components/WorkoutHistorySection';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class WorkoutsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logOpen: false,
      date: new Date(),
      data: [],
      excerciseNames: [],
    };
  }

  componentDidMount = () => {
    this.updateDate(new Date());
  }

  updateDate = date => {
    this.setState({date:date});
    if (this.unsub) this.unsub();
    var start = moment(date).startOf('day').toDate();
    var end = moment(date).endOf('day').toDate();
    this.unsub = db.collection('workouts')
        .where('timestamp', '>=', start)
        .where('timestamp', '<=', end)
        .orderBy('timestamp')
        .onSnapshot(querySnapshot => {
      var workoutSetList = [];
      var workoutSet = [];
      querySnapshot.forEach(element => {
        // Handler for two type of exercise fields
        if (workoutSet.length !== 0) {
          if (element.data().exercise.id !== workoutSet[0].data().exercise.id) {
            workoutSetList.push(workoutSet);
            workoutSet = [];
          }
        } 
        workoutSet.push(element);
      });
      if (workoutSet.length) workoutSetList.push(workoutSet);
      this.setState({data: workoutSetList});
    });
  }

  componentWillUnmount = () => {
    this.unsub();
  }

  addButtonClicked = () => {
    this.setState({logOpen: true, logTime: new Date()});
  };

  handleClose = () => {
    this.setState({logOpen: false});
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <DatePicker
              label='Exercise Date'
              fullWidth
              format="YYYY-MM-DD"
              value={this.state.date}
              onChange={this.updateDate}
            />
          </Grid>
          
          {this.state.data.map( (value, index) => {
            return (
              <Grid item xs={12} key={index}>
                <WorkoutHistorySection data={value}/>
              </Grid>
            );
          }, this)}
        </Grid>
        <Button variant="fab" color='primary' className={this.props.classes.button} onClick={this.addButtonClicked}>
          <AddIcon />
        </Button>
        <LogSetDialog open={this.state.logOpen} handleClose={this.handleClose} key={this.state.logTime}/>
      </div>
    );
  }
}

WorkoutsTab.label = 'Workout';

WorkoutsTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkoutsTab);
