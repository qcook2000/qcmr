import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  withMobileDialog,
  withStyles,
  FormHelperText
} from '@material-ui/core';
import FirestoreSelect from '../FirestoreSelect';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import { db } from '../firebase';
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
const initialMaxReps = [10, 10];
const initialMaxWeight = [100, 100];

class LogSetDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: moment(),
      exercise: null,
      values:['','','','','','','','','','','','',],
      maxReps: initialMaxReps,
      maxWeight: initialMaxWeight,
      exerciseOptions: [],
      loading: false,
    };
  }


  componentDidMount = () => {
    this.unsub = db.collection('exercises').onSnapshot(querySnapshot => {
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
    db.collection('workouts').where('exercise', '==', db.doc(exercisePath)).get()
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
    var batch = db.batch();
    var index = 0;
    var date = this.state.dateTime;
    var peeps = ['Q', 'C'];
    var docs = [];
    while (this.state.values.length > index) {
      var vs = this.state.values;
      for (var i = 0; i < 2; i++) {
        if (vs[index] !== '' && vs[index+1] !== '') {
          // We have data
          var ts = db.timestampFromMoment(date);
          var log = db.collection('workouts').doc();
          docs.push(log);
          batch = batch.set(log, { 
            person: peeps[i],
            exercise: db.doc('exercises/'+this.state.exercise.value),
            reps: vs[index+0], 
            weight: vs[index+1], 
            timestamp: ts });
          date = moment(date).add(1, 'milliseconds')
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
    console.log(option);
    if (!option.value) {
      this.setState({exercise: null});
      this.setState({maxReps: initialMaxReps, maxWeight: initialMaxWeight});
    } else {
      this.setState({exercise: option});
      this.updatePlaceholders('exercises/'+option.value);
    }
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

  updateDate = date => {
    this.setState({dateTime:date});
  }

  openPicker = () => {
    this.picker.open();
  }

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
                {!this.state.exercise ? null :
                  <FormHelperText>
                    Side weights: 
                    <b> {((this.state.maxWeight[0] - 45) / 2)}</b> | 
                    <b> {((this.state.maxWeight[1] - 45) / 2)}</b> (w/o bar: 
                    <b> {(this.state.maxWeight[0] / 2)}</b> | 
                    <b> {(this.state.maxWeight[1] / 2)}</b>)
                  </FormHelperText>
                }
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
              <Grid item xs={12}>
                <Typography variant='caption' onClick={this.openPicker}>{moment(this.state.dateTime).format("dddd, MMM Do 'YY, h:mm a")} | Change</Typography>
                <DateTimePicker
                  style={{display:'none'}}
                  ref={(node) => { this.picker = node; }}
                  value={this.state.dateTime}
                  onChange={this.updateDate}
                />
              </Grid>
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