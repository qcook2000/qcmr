import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withFirestore  } from 'react-firestore';
import ReactChartkick, { BarChart } from 'react-chartkick';
import Chart from 'chart.js';
import PubSub from 'pubsub-js';

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

    categoryClicked = () => {
        PubSub.publish('tabChange', {tabIndex: 0, eatTabFilter: ['category', '==', 'Fruit']});
    }

  render() {
    return (
      <React.Fragment>
        <BarChart data={this.state.chartData} />
        <a onClick={this.categoryClicked}>hello I am not a chart but I'm in a chart area thing don't know why </a>
      </React.Fragment>
    );
  }
}

CoolGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirestore(withStyles(styles)(CoolGraph));