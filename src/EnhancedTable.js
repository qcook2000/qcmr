import React from 'react';
import classNames from 'classnames';
import { firestore } from 'firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { FirestoreCollection } from 'react-firestore';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditDrawer from './EditDrawer';

function getSorting(order, orderBy, defaultSort) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] == a[orderBy] ? (b[defaultSort] < a[defaultSort] ? -1 : 1) : (b[orderBy] < a[orderBy] ? -1 : 1))
    : (a, b) => (a[orderBy] == b[orderBy] ? (a[defaultSort] < b[defaultSort] ? -1 : 1) : (a[orderBy] < b[orderBy] ? -1 : 1));
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, columnData } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    flexShrink: '0',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    position: 'relative',
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  progress: {
    position: 'absolute',
    width: '100%',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    var defaultSort = props.columnData[0].id;
    for (var i = 0; i < props.columnData.length; i++) {
      if (props.columnData[0].defaultSort) defaultSort = props.columnData[0].id;
    }

    this.state = {
      order: props.order === 'desc' ? 'desc' : 'asc',
      orderBy: props.orderBy,
      defaultSort: defaultSort,
      selected: null,
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    console.log('handle selection', id);
    this.setState({ selected: id });
  };

  handleClickAddButton = (event) => {
    this.setState({ selected: 'new' })
  };

  handleCloseDrawer = (event) => {
    this.setState({ selected: null })
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected == id;

  textForField = field => {
    if (field instanceof firestore.Timestamp) {
      return field.toDate().toLocaleDateString("en-US");
    }
    return field.toString();
  }

  render() {
    const { classes, path, filter, columnData, itemName } = this.props;
    const { order, orderBy, selected, defaultSort, rowsPerPage, page } = this.state;

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <FirestoreCollection
        path={path}
        sort={orderBy+':'+order}
        filter={filter && filter.length == 3 ? filter : null}
        render={({ isLoading, data }) => {
          return (
            <React.Fragment>
              <Paper className={classes.root}>
                <Toolbar>
                  <Typography variant="title" id="tableTitle">
                    {itemName}
                  </Typography>
                </Toolbar>
                <div className={classes.tableWrapper}>
                  { isLoading && <LinearProgress className={classes.progress} />}
                  <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                      columnData={columnData}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={this.handleRequestSort}
                      rowCount={data.length}
                    />
                    
                    <TableBody>
                    { isLoading ? (
                      <TableRow>
                        {columnData.map(column => {
                          return (
                            <TableCell
                              key={column.id}
                              numeric={column.numeric}
                              padding={column.disablePadding ? 'none' : 'default'}
                              sortDirection={orderBy === column.id ? order : false}
                            >
                            </TableCell>
                          );
                        }, this)}
                      </TableRow>
                      ) : (
                        data.sort(getSorting(order, orderBy, defaultSort))
                          // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map(n => {
                            const isSelected = this.isSelected(n.id);
                            return (
                              <TableRow hover role="checkbox" aria-checked={isSelected} 
                                tabIndex={-1} key={n.id} selected={isSelected} 
                                onClick={event => this.handleClick(event, n)}
                              >
                                {columnData.map(column => {
                                  return (
                                    <TableCell
                                      key={column.id}
                                      numeric={column.numeric}
                                      padding={column.disablePadding ? 'none' : 'default'}
                                    >
                                      {this.textForField(n[column.id])}
                                    </TableCell>
                                  );
                                }, this)}
                              </TableRow>
                            );
                          })
                      )}
                    </TableBody>
                  </Table>
                </div>
                {/* <TablePagination
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                /> */}
              </Paper>
              <Button className={classes.fab} variant="fab" color="primary" onClick={this.handleClickAddButton}><AddIcon /></Button>
              <EditDrawer path={path} columnData={columnData} itemName={itemName} editingItem={this.state.selected} key={this.state.selected ? this.state.selected.id : ''} handleClose={this.handleCloseDrawer}/>
            </React.Fragment>
          );
        }}
      />
    );
  }
}

EnhancedTable.DataTypes = {
  ShortString: 0,
  LongString: 1,
  Number: 2,
  Date: 3
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);