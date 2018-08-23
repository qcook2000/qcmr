import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withFirestore  } from 'react-firestore';
import ReactChartkick from 'react-chartkick';
import Chart from 'chart.js';
import PubSub from 'pubsub-js';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalBarSeries
} from 'react-vis';

ReactChartkick.addAdapter(Chart);

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2,
      },
});

class CoolGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rawDatabase: {},
            dbRecords: [],
            reactvisGraphData: []
        };
        this.rawDatabase = {};
        this.dbRecords = [];  

        this.getRawDatabase();
    }

    getRawDatabase = () => {
        const { firestore } = this.props;
        var allFoodItems = firestore.collection('food-items')
        allFoodItems.get().then(collection => {
            this.rawDatabase = collection;
        })
        .then(this.transformData)  
    }

    transformData = () => {
        //Converts the raw Firestore collection to an array of records.
        this.rawDatabase.forEach(element => {
            this.dbRecords.push(element.data());
        });
        var categoriesSorted = this.sortedDict(this.getCategories());
        this.setState ({reactvisGraphData: categoriesSorted});
    }

    getCategories = () => {
        //Returns a dictionary of categories with counts of given category
        var categoryDict = {}; 
        this.dbRecords.forEach(element => {
            var category = element.category;
            if (category in categoryDict) {
                categoryDict[category] = categoryDict[category] + 1;
            } else {
                categoryDict[category] = 1;
            }
        });
        return categoryDict;
    }

    sortedDict = (dictToSort) => {
        //Sorts a given dictionary based on dict values.
        //Returns react-vis readable graph data with labels
        var sortedData = Object.keys(dictToSort).map(function(key) {
            return [key, dictToSort[key]];
        });
        sortedData.sort(function(first, second) {
            return first[1] - second[1]; //sort min to max. reverse to sort max to min.
        });
        //Store the data into a react-vis readable graph data with labels
        for (var i = 0; i < sortedData.length; i++) {
            sortedData[i] = { x: sortedData[i][1], y:i, label: sortedData[i][0] };
        }
        return sortedData;
    }

    graphMarkClicked = (datapoint, event) => {
        PubSub.publish('tabChange', {tabIndex: 0, eatTabFilter: ['category', '==', datapoint.label]});
    }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography variant='title'>The Most Added Items</Typography>
        <XYPlot margin={{left: 100}} height={300} width= {700}>
            <VerticalGridLines />
            <XAxis />
            <YAxis tickFormat={v => (
                this.state.reactvisGraphData[v] ? this.state.reactvisGraphData[v].label : null
                )} />
          <HorizontalBarSeries
            data={this.state.reactvisGraphData}
            onValueClick={this.graphMarkClicked}/>
        </XYPlot>
      </Paper>
    );
  }
}

CoolGraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirestore(withStyles(styles)(CoolGraph));