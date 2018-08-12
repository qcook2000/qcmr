import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withFirestore  } from 'react-firestore';
import ReactChartkick, { BarChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const styles = theme => ({
  
});

class CoolGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {}
        };
        
        this.getAllRecords();
    }


    getAllRecords = () => {
        const { firestore } = this.props;
        var allFoodItems = firestore.collection('food-items')
        var chartDataTemp = {};
        allFoodItems.get().then(collection => {
            collection.forEach(element => {
                var cat = element.data().category
                console.log(cat)
                if (cat in chartDataTemp) {
                    chartDataTemp[cat] = chartDataTemp[cat] + 1;
                } else {
                    chartDataTemp[cat] = 1;
                }
            });
            console.log(chartDataTemp);
            this.setState({ chartData: chartDataTemp });
        });
    }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <BarChart data={this.state.chartData} />
      </React.Fragment>
    );
  }
}

CoolGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirestore(withStyles(styles)(CoolGraph));