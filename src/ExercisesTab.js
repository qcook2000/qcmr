import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";


const styles = theme => ({
  
});


 
const columns = ["Name", "Company", "City", "State"];
 
const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];
 
const options = {
  filterType: 'checkbox',
  responsive: 'scroll'
};


class ExercisesTab extends React.Component {
  render() {
    return (
      <MUIDataTable 
            title={"Employee List"} 
            data={data} 
            columns={columns} 
            options={options} 
          />
    );
  }
}

ExercisesTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExercisesTab);
