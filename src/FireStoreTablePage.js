import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import EditDrawer from './EditDrawer';
import FU from './FirestoreUtils';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import ReferenceCell from './ReferenceCell';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class FireStoreTablePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      editingItem: null,
      columns: props.columns,
    };

    this.state.columns.forEach(column => {
      if (!column.options) {
        column.options = {};
      }
      if (!column.options.customBodyRender) {
        column.options.customBodyRender = this.fieldRender;
      }
    });

    this.options = {
      filterType: 'checkbox',
      responsive: 'scroll',
      onCellClick: this.onCellClick,
      pagination: false,
      print: false,
      search: false,
      download: false,
      viewColumns: false,
      selectableRows: false,
      filter: false,
      rowsPerPage: 500
    };

    this.querySnapshot = null;
  }

  fieldRender = (field, data) => {
    var column = this.props.columns[data.columnIndex];
    if (column.type === FU.Types.Date) {
      return !field ? '' : moment(field.toDate()).format("YYYY-MM-DD");
    } else if (column.type === FU.Types.Reference) {
      if (typeof field === 'string') {
        return '*'+field;
      } else {
        return (<ReferenceCell key={field.id} path={field.path}/>);
      }
    } else if (column.type === FU.Types.Boolean && !column.options.customBodyRender) {
      return field ? 'Yes' : 'No';
    } else {
      return !field ? '' : field;
    }
  }
  
  componentDidMount = () => {
    this.unsub = FU.db.collection(this.props.settings.path).onSnapshot(querySnapshot => {
      var newData = [];
      this.querySnapshot = querySnapshot;
      querySnapshot.forEach(element => {
        var newRow = [];
        this.props.columns.forEach(column => {
          newRow.push(element.data()[column.id]);
        });
        newData.push(newRow);
      });
      this.setState({data:newData});
    });
  }

  componentWillUnmount = () => {
    this.unsub();
  }

  onDrawerShouldClose = () => {
    this.setState({editingItem: null});
  }

  addButtonClicked = () => {
    if (this.props.addButtonClicked) {
      this.props.addButtonClicked();
    } else {
      this.setState({editingItem: 'new', editingItemId: 'new'});
    }
  }

  onCellClick = (colIndex, rowIndex) => {
    console.log(this.querySnapshot.docs[rowIndex]);
    this.setState({editingItem: this.querySnapshot.docs[rowIndex].data(), editingItemId: this.querySnapshot.docs[rowIndex].id });
  }

  render() {
    return (
      <React.Fragment>
        <MUIDataTable 
          title={this.props.settings.listTitle} 
          data={this.state.data} 
          columns={this.props.columns} 
          options={this.options} 
        />
        <EditDrawer 
          key={this.state.editingItemId ? this.state.editingItemId : ''}
          editingItemId={this.state.editingItemId}
          columns={this.props.columns} 
          settings={this.props.settings} 
          handleClose={this.onDrawerShouldClose} 
          editingItem={this.state.editingItem}
        />
        <Button variant="fab" color='primary' className={this.props.classes.button} onClick={this.addButtonClicked}>
          <AddIcon />
        </Button>
      </React.Fragment>
    );
  }
}

FireStoreTablePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FireStoreTablePage);

