import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import DatePicker from 'material-ui-pickers/DatePicker';
import FU from './FirestoreUtils';

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
    this.state = !props.editingItem || props.editingItem === 'new' ? {} : props.editingItem;
  }

  handleAddOrSave = () => {
    var newItem = {}
    this.props.columns.forEach(column => {
      newItem[column.id] = this.state[column.id];
    });

    if (this.props.editingItem === 'new') {
      FU.db.collection(this.props.settings.path).add(newItem).then(response => {
        this.props.handleClose();
      }, function(error) {
        console.error("Failed!", error);
      });
    } else {
      FU.db.collection(this.props.settings.path).doc(this.props.editingItemId).set(newItem).then(response => {
        this.props.handleClose();
      }, function(error) {
        console.error("Failed!", error);
      });
    }
  };

  dateHandlerForField = field => {
    return moment => {
      this.setState({ [field]: FU.timestampFromMoment(moment) });
    }
  }

  handleTextChange = event => {
    var type = this.props.columns.find(e => { return e.id === event.target.name}).type;
    var value = event.target.value;
    if (type === FU.Types.Number) value = parseFloat(value);
    this.setState({ [event.target.name]: value });
  };

  titlePrefix = () => {
    return this.props.editingItem === 'new' ? 'Add ' : 'Edit '
  }

  render() {
    const { classes, columns, settings, handleClose, editingItem} = this.props;

    return (
      <Drawer anchor="right" open={editingItem ? true : false} onClose={handleClose} classes={{paper: classes.paper}}>
        <Typography variant='title' className={classes.title}>{this.titlePrefix() + settings.drawerItemName}:</Typography>
        <form className={classes.root} autoComplete="off">
          {columns.map(column => {
            return (
              <div className={classes.formInput} key={column.id}>
                {column.type === FU.Types.Date ? (
                  <DatePicker
                    label={column.name}
                    fullWidth
                    format="YYYY-MM-DD"
                    value={this.state[column.id] ? this.state[column.id].toDate() : null}
                    onChange={this.dateHandlerForField(column.id)}
                  />
                ) : column.autoCompleteOptions ? (
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor={'input-' + column.id}>{column.name}</InputLabel>
                    <Select 
                      coltype={column.type}
                      name={column.id}
                      value={this.state[column.id] ? this.state[column.id] : ''} 
                      onChange={this.handleTextChange} 
                      inputProps={{name: column.id, id: 'input-' + column.id,}}
                    >
                      <MenuItem value="" disabled>{column.name}</MenuItem>
                      {column.autoCompleteOptions.map(function(name, i){
                        return <MenuItem value={name} key={i}>{name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField 
                    coltype={column.type}
                    value={this.state[column.id] ? this.state[column.id] : ''} 
                    name={column.id} 
                    onChange={this.handleTextChange} 
                    fullWidth 
                    label={column.name} 
                    multiline={column.type === FU.Types.LongString}
                    type={column.type === FU.Types.Number ? 'number' : 'text'}/>
                )}
              </div>
            );
          }, this)}
        </form>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={this.handleAddOrSave} color="primary">
          {this.titlePrefix() + settings.drawerItemName}
        </Button>
      </Drawer>
    );
  }
}

EditDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditDrawer);