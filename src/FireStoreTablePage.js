import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditDrawer from './EditDrawer';
import { db } from './firebase';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import ReferenceCell from './ReferenceCell';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

    this.querySnapshot = null;
  }
  
  componentDidMount = () => {
    var sortCol = this.props.columns.find(col => { return col.sort === 'asc' || col.sort === 'desc'});
    var collectionQ = db.collection(this.props.settings.path);
    if (sortCol) {
      collectionQ = collectionQ.orderBy(sortCol.id, sortCol.sort);
    }
    this.unsub = collectionQ.onSnapshot(querySnapshot => {
      var newData = [];
      this.querySnapshot = querySnapshot;
      querySnapshot.forEach(element => {
        newData.push(element);
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

  onRowClick = (rowIndex) => {
    this.setState({editingItem: this.querySnapshot.docs[rowIndex].data(), editingItemId: this.querySnapshot.docs[rowIndex].id });
  }

  tableCell = (item, column, colindex) => {
    var field = item.data()[column.id];
    if (column.type === db.Types.Date) {
      field = !field ? '' : moment(field.toDate()).format("YYYY-MM-DD");
    } else if (column.type === db.Types.Reference) {
      if (typeof field === 'string') {
        field = '*'+field;
      } else {
        field = (<ReferenceCell key={field.id} path={field.path}/>);
      }
    } else if (column.type === db.Types.Boolean && !column.options.customBodyRender) {
      field = field ? 'Yes' : 'No';
    } else {
      field = !field ? '' : field;
    }
    return <TableCell key={colindex}>{field}</TableCell>
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {this.props.columns.map( (column, index) => {
                  return (
                    <TableCell key={index}>{column.name}</TableCell>
                  );
                }, this)}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((item, index) => {
                return (
                  <TableRow key={item.id} onClick={() => { this.onRowClick(index) }}>
                    {this.props.columns.map( (column, colindex) => {
                      return this.tableCell(item, column, colindex); 
                    }, this)}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
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

