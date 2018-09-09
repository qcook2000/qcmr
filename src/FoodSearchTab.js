import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FirestoreSelect from './FirestoreSelect';
import { db } from './firebase';
import { Typography, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  progressHolder: {
    textAlign: 'center',
  }
});


class FoodSearchTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      foodOptions: [],
      canEatOptions: {},
      food: null,
      loadingFood: true,
      loadingOptions: true,
    };
  }

  componentDidMount = () => {
    this.setState({loadingFood: true, loadingOptions: true});
    this.unsub1 = db.collection('food-items').orderBy('name').onSnapshot(querySnapshot => {
      this.setState({loadingFood: false});
      var newData = [];
      this.querySnapshot = querySnapshot;
      querySnapshot.forEach(element => {
        var option = {value: element.id, label: element.data().name, data: element.data()};
        newData.push(option);
      });
      this.setState({foodOptions: newData});
    });
    this.unsub2 = db.collection('can-eat-options').onSnapshot(querySnapshot => {
      this.setState({loadingOptions: false});
      var newData = {};
      this.querySnapshot = querySnapshot;
      querySnapshot.forEach(element => {
        newData[element.id] = element.data();
      });
      this.setState({canEatOptions: newData});
    });
  }

  componentWillUnmount = () => {
    this.unsub1();
    this.unsub2();
  }

  handleFoodChange = option => {
    this.setState({food: option});
  };

  canEatLabel = () => {
    if (this.state.food.data.caneat.id && this.state.food.data.caneat.id in this.state.canEatOptions) {
      return this.state.canEatOptions[this.state.food.data.caneat.id].name;
    } else {
      return this.state.food.data.caneat;
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loadingFood && !this.state.loadingOptions ? 
          <React.Fragment>
            <Typography variant='title'>Can Mike eat...</Typography>
            <FirestoreSelect
              options={this.state.foodOptions}
              placeholder='Food'
              onChange={this.handleFoodChange}
              value={this.state.food}
            />
            {!this.state.food ? null : 
              <React.Fragment>
                <br/><br/>
                <Typography variant='display2'>{this.canEatLabel()}</Typography>
                <br/><br/>
                <Typography variant='display1'>{this.state.food.data.notes}</Typography>
              </React.Fragment>
            }
          </React.Fragment> 
        : 
          <React.Fragment>
            <div className={this.props.classes.progressHolder}>
              <CircularProgress />
            </div>
          </React.Fragment> 
        }
      </React.Fragment>
    );
  }
}

FoodSearchTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FoodSearchTab);
