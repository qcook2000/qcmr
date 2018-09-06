import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FirestoreSelect from './FirestoreSelect';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import FU from './FirestoreUtils';
import { Typography } from '@material-ui/core';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import moment from 'moment';


const styles = theme => ({
  header: {
    textTransform: 'uppercase'
  },
  buttons: {
    textAlign: 'right'
  },
});



const inputs = ['Q Reps', 'Q Weight', 'C Reps', 'C Weight'];

class LogSetDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: new Date(),
      exercise: null,
      values:['','','','','','','','','','','','',],
      maxReps: [10, 10],
      maxWeight: [100, 100],
      exerciseOptions: [],
      loading: false,
    };
  }


  componentDidMount = () => {
    this.unsub = FU.db.collection('exercises').onSnapshot(querySnapshot => {
      var newData = [];
      this.querySnapshot = querySnapshot;
      querySnapshot.forEach(element => {
        var option = {value: element.id, label: element.data().name};
        newData.push(option);
      });
      this.setState({exerciseOptions: newData});
    });
  }

  componentWillUnmount = () => {
    this.unsub();
  }

  updatePlaceholders = (exercisePath) => {
    console.log('HERE', FU.db.doc(exercisePath));
    FU.db.collection('workouts').where('exercise', '==', FU.db.doc(exercisePath)).get()
    .then(querySnapshot => {
      var newMaxWeight = [undefined, undefined]
      var newMaxReps = [undefined, undefined]
      querySnapshot.forEach(doc => {
        var data = doc.data();
        var index = (data.person === 'C') ? 1 : 0;
        if (typeof newMaxWeight[index] === 'undefined' || newMaxWeight[index] < data.weight) {
          newMaxReps[index] = data.reps;
          newMaxWeight[index] = data.weight;
        }
      });
      newMaxReps[0] = newMaxReps[0] ? newMaxReps[0] : 10;
      newMaxReps[1] = newMaxReps[1] ? newMaxReps[1] : 10;
      newMaxWeight[0] = newMaxWeight[0] ? newMaxWeight[0] : 100;
      newMaxWeight[1] = newMaxWeight[1] ? newMaxWeight[1] : 100;
      this.setState({maxReps: newMaxReps, maxWeight: newMaxWeight});
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  handleSave = () => {
    if (!this.state.exercise || !this.state.exercise.value) {
      alert('You must select an exercise');
      return;
    }
    // Get a new write batch
    var batch = FU.db.batch();
    var index = 0;
    var date = new Date();
    var peeps = ['Q', 'C'];
    var docs = [];
    while (this.state.values.length > index) {
      var vs = this.state.values;
      for (var i = 0; i < 2; i++) {
        if (vs[index] !== '' && vs[index+1] !== '') {
          // We have data
          var ts = FU.timestampFromDate(date);
          var log = FU.db.collection('workouts').doc();
          docs.push(log);
          batch = batch.set(log, { 
            person: peeps[i],
            exercise: FU.db.doc('exercises/'+this.state.exercise.value),
            reps: vs[index+0], 
            weight: vs[index+1], 
            timestamp: ts });
          date = moment(date).add(1, 'milliseconds').toDate()
        }
        index += 2;
      }  
    }

    if (docs.length === 0) {
      alert('Nothing to save');
      return;
    }
    // Commit the batch
    this.setState({ loading: true });
    batch.commit().then(response => {
      this.props.handleClose();
      this.setState({ loading: false });
    }, function(error) {
      console.error("Failed!", error);
      this.setState({ loading: false });
    });
  };


  handleSetChangeForIndex = index => {
    return event => {
      var values = [...this.state.values]
      values[index] = parseInt(event.target.value, 10);
      values[index] = isNaN(values[index]) ? '' : values[index];
      this.setState({values: values});
    };
  }

  handleExerciseChange = option => {
    this.setState({exercise: option});
    this.updatePlaceholders('exercises/'+option.value);
  };

  placeholderForIndex = index => {
    var array = this.state.maxWeight;
    if (index % 2 === 0) {
      array = this.state.maxReps;
    }
    var qOrC = 0;
    if (index % 4 > 1) {
      qOrC = 1;
    }
    return '' + array[qOrC];
  };

  render() {
    return (
      <Dialog
          open={this.props.open}
          fullScreen={this.props.fullScreen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log Exercise</DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12} className={this.props.classes.exercise}>
                <FirestoreSelect
                  options={this.state.exerciseOptions}
                  placeholder='Select Exercise'
                  onChange={this.handleExerciseChange}
                  value={this.state.exercise}
                />
              </Grid>
              <Grid item xs={12} >
                <Typography variant='caption'>
                  Side weights: 
                  <b> {((this.state.maxWeight[0] - 45) / 2)}</b> | 
                  <b> {((this.state.maxWeight[1] - 45) / 2)}</b> (w/o bar: 
                  <b> {(this.state.maxWeight[0] / 2)}</b> | 
                  <b> {(this.state.maxWeight[1] / 2)}</b>)
                </Typography>
              </Grid>
              {inputs.map( (value, index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <Typography className={this.props.classes.header} variant='caption'>{value}</Typography>
                  </Grid>
                );
              }, this)}
              {this.state.values.map( (value, index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <TextField 
                      value={value}
                      fullWidth 
                      name={inputs[index%inputs.length]} 
                      onChange={this.handleSetChangeForIndex(index)}  
                      placeholder={this.placeholderForIndex(index)} 
                      type={'tel'}/>
                  </Grid>
                );
              }, this)}
              <Grid item xs={12} className={this.props.classes.buttons}>
                <Button onClick={this.props.handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={this.handleSave} color="primary" variant='contained' disabled={this.state.loading}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
    );
  }
}

LogSetDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withMobileDialog()(withStyles(styles)(LogSetDialog));