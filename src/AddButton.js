import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import firestore from "./firestore";

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  select: {
    marginTop: theme.spacing.unit,
  },
});

class AddButton extends React.Component {
  state = {
    open: false,
    caneat:'',
  };

  caneatoptions = [
    "Yes!",
    "No!",
    "Yes... sorta...",
    "???",
    "No! He's allergic!",
    "Are you trying to KILL him???",
  ]

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAdd = () => {
    console.log(this.state);

    var newFooditem = {
      canEat: this.state.caneat,
      name: this.state.name,
      notes: this.state.notes
    }

    firestore.collection("food-items").add(newFooditem).then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button variant="fab" color="primary" onClick={this.handleClickOpen}><AddIcon /></Button>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
          <DialogTitle>Add a new food:</DialogTitle>
          <DialogContent>
            <form className={classes.root} autoComplete="off">
              <TextField name="name" onChange={this.handleChange} fullWidth label="Food" type="text"/>
              <div style={{ height: '16px' }}/>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="add-button-can-eat">Can he eat it?</InputLabel>
                <Select 
                    value={this.state.caneat}
                    onChange={this.handleChange} 
                    inputProps={{
                      name: 'caneat',
                      id: 'add-button-can-eat',
                    }}
                >
                  <MenuItem value="" disabled>Can he eat it?</MenuItem>
                  {this.caneatoptions.map(function(name, i){
                    return <MenuItem value={name} key={i}>{name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <div style={{ height: '16px' }}/>
              <TextField name="notes" onChange={this.handleChange} fullWidth label="Notes" type="text"/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add Food
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButton);