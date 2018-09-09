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
import { db } from './firebase';
import { Typography } from '@material-ui/core';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import moment from 'moment';


const styles = theme => ({
  exercise: {
    marginBottom: theme.spacing.unit * 3,
  },
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
      placeholders: ['10', '100', '10', '100'],
      exerciseOptions: []
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
    console.log('HERE', db.doc(exercisePath));
    db.collection('workouts').where('exercise', '==', db.doc(exercisePath)).get()
    .then(querySnapshot => {
      var newPlaceHolders = [undefined, undefined, undefined, undefined]
      querySnapshot.forEach(doc => {
        var data = doc.data();
        var offSet = (data.person === 'C') ? 2 : 0;
        if (typeof newPlaceHolders[offSet] === 'undefined' || newPlaceHolders[offSet+1] < data.weight) {
          newPlaceHolders[offSet] = data.reps;
          newPlaceHolders[offSet+1] = data.weight;
        }
      });
      newPlaceHolders[0] = newPlaceHolders[0] ? '' + newPlaceHolders[0] : '10';
      newPlaceHolders[1] = newPlaceHolders[1] ? '' + newPlaceHolders[1] : '100';
      newPlaceHolders[2] = newPlaceHolders[2] ? '' + newPlaceHolders[2] : '10';
      newPlaceHolders[3] = newPlaceHolders[3] ? '' + newPlaceHolders[3] : '100';
      this.setState({placeholders: newPlaceHolders});
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
    var date = new Date();
    var peeps = ['Q', 'C'];
    var docs = [];
    while (this.state.values.length > index) {
      var vs = this.state.values;
      for (var i = 0; i < 2; i++) {
        if (vs[index] !== '' && vs[index+1] !== '') {
          // We have data
          var ts = db.timestampFromDate(date);
          var log = db.collection('workouts').doc();
          docs.push(log);
          batch = batch.set(log, { 
            person: peeps[i],
            exercise: db.doc('exercises/'+this.state.exercise.value),
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
    batch.commit().then(response => {
      this.props.handleClose();
    }, function(error) {
      console.error("Failed!", error);
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
                      placeholder={this.state.placeholders[index%inputs.length]} 
                      type={'tel'}/>
                  </Grid>
                );
              }, this)}
              <Grid item xs={12} className={this.props.classes.buttons}>
                <Button onClick={this.props.handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={this.handleSave} color="primary" variant='contained'>
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