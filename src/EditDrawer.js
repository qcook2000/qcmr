import React from 'react';
import PropTypes from 'prop-types';
import { firestore } from 'firebase';
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
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import EnhancedTable from './EnhancedTable';
import moment from 'moment';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withFirestore } from 'react-firestore';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    width: '300px',
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
  },
  formInput: {
    marginBottom: theme.spacing.unit * 3,
  },
});

class EditDrawer extends React.Component {

  
  constructor(props) {
    super(props);

    this.state = !props.editingItem || props.editingItem == 'new' ? {} : props.editingItem;
  }

  handleAddOrSave = () => {
    console.log(this.state);
    const { firestore, columnData, path } = this.props;
    var newItem = {}
    columnData.forEach(column => {
      newItem[column.id] = this.state[column.id];
    });

    console.log(newItem);

    if (this.props.editingItem == 'new') {
      firestore.collection(path).add(newItem).then(response => {
        this.props.handleClose();
      }, function(error) {
        console.error("Failed!", error);
      });
    } else {
      firestore.collection(path).doc(this.state.id).set(newItem).then(response => {
        this.props.handleClose();
      }, function(error) {
        console.error("Failed!", error);
      });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  textForField = field => {
    if (!field) return '';
    if (field instanceof firestore.Timestamp) {
      console.log(moment(field.toDate()).format("YYYY-MM-DD"));
      return moment(field.toDate()).format("YYYY-MM-DD");
    }
    return field.toString();
  }
  
  textFieldTypeFromDataType = type => {
    switch(type) {
      case EnhancedTable.DataTypes.Number:
        return 'number';
      case EnhancedTable.DataTypes.Date:
        return 'date';
      case EnhancedTable.DataTypes.ShortString:
      case EnhancedTable.DataTypes.LongString:
      default:
        return 'text';
    }
  }

  titlePrefix = () => {
    return this.props.editingItem == 'new' ? 'Add ' : 'Edit '
  }

  render() {
    const { classes, columnData, itemName, handleClose} = this.props;

    return (
      <Drawer anchor="right" open={this.props.editingItem ? true : false} onClose={handleClose} classes={{paper: classes.paper}}>
        <Typography variant='title' className={classes.title}>{this.titlePrefix() + itemName}:</Typography>
        <form className={classes.root} autoComplete="off">
          {columnData.map(column => {
            return (
              <div className={classes.formInput} key={column.id}>
                {column.autoCompleteOptions ? (
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor={'input-' + column.id}>{column.label}</InputLabel>
                    <Select 
                      value={this.state[column.id] ? this.state[column.id] : ''} 
                      onChange={this.handleChange} 
                      inputProps={{name: column.id, id: 'input-' + column.id,}}
                    >
                      <MenuItem value="" disabled>{column.label}</MenuItem>
                      {column.autoCompleteOptions.map(function(name, i){
                        return <MenuItem value={name} key={i}>{name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField 
                    value={this.textForField(this.state[column.id])} 
                    name={column.id} 
                    onChange={this.handleChange} 
                    fullWidth 
                    label={column.label} 
                    multiline={column.type == EnhancedTable.DataTypes.LongString}
                    type={this.textFieldTypeFromDataType(column.type)}/>
                )}
              </div>
            );
          }, this)}
        </form>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={this.handleAddOrSave} color="primary">
          {this.titlePrefix() + itemName}
        </Button>
      </Drawer>
    );
  }
}

EditDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirestore(withStyles(styles)(EditDrawer));