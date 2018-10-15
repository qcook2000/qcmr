import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { db, firestore } from "../firebase";
import ReactChartkick from "react-chartkick";
import Chart from "chart.js";
import PubSub from "pubsub-js";
import { Paper, Typography, Grid } from "@material-ui/core";
import "../../node_modules/react-vis/dist/style.css";
import "../";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  AreaSeries,
  MarkSeries,
  Hint
} from "react-vis";
import moment from "moment";

const GraphElement = props => {
  return <Typography>{props.children}</Typography>;
};

class GraphTab extends Component {
  state = {
    collectionData: [],
    qData: [],
    cData: [],
    qVal: null,
    cVal: null,
    currDate: null
  };

  constructor(props) {
    super(props);
    this.getRawDatabase();
  }

  getRawDatabase = () => {
    var collectionRef = db.collection("powerchart");
    collectionRef
      .orderBy("date")
      .get()
      .then(collectionSnapshot => {
        let collectionData = [];
        let qData = [];
        let cData = [];
        this.setState({ collectionRef });
        collectionSnapshot.forEach(doc => {
          let record = doc.data();
          collectionData.push({ ...record, id: doc.id });
          let personData = record.person === "Q" ? qData : cData;
          personData.push({
            x: record.date.toDate(),
            y: record.power
          });
        });
        this.setState({ collectionData, qData, cData });

        console.log(this.state.collectionData);
      });
  };

  renderGraphElements = () => {
    console.log(this);
    return this.state.collectionData.map(doc => (
      <Typography key={doc.id}>{doc.power}</Typography>
    ));
  };

  renderHint = () => {
    const { hintStyle } = styles;
    const { qVal, cVal } = this.state;
    console.log(qVal.x);
    return (
      <Paper style={hintStyle}>
        <Typography variant="caption">
          {moment(qVal.x).format("YYYY-MM-DD")}
        </Typography>
        <Typography variant="caption">
          Q: {qVal.y}
          <br />
          C: {cVal.y - cVal.y0}
          <br />
          Total: {cVal.y}
        </Typography>
      </Paper>
    );
  };

  render() {
    return (
      <Paper style={styles.paperStyle}>
        <FlexibleWidthXYPlot
          height={300}
          stackBy="y"
          xType="time"
          yDomain={[0, 50000]}
        >
          <YAxis />
          <XAxis
            tickLabelAngle={-75}
            tickFormat={v => moment(v).format("MM/DD")}
          />
          <AreaSeries
            curve="curveNatural"
            opacity={0.5}
            onNearestX={value => {
              this.setState({ qVal: value });
            }}
            data={this.state.qData}
            stack={true}
          />
          <AreaSeries
            curve="curveNatural"
            opacity={0.5}
            onNearestX={value => {
              this.setState({ cVal: value });
            }}
            data={this.state.cData}
            stack={true}
          />
          {this.state.qVal ? (
            <Hint value={this.state.qVal}>{this.renderHint()}</Hint>
          ) : null}
        </FlexibleWidthXYPlot>
      </Paper>
    );
  }
}

GraphTab.label = "Power Graph";

const styles = {
  hintStyle: {
    padding: 10
  },
  paperStyle: {
    padding: 20
  }
};

export default GraphTab;
