import React from 'react';
import PropTypes from 'prop-types';
import { db } from './firebase';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
});

class ReferenceCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount = () => {
    this.unsub = db.doc(this.props.path).onSnapshot(doc => {
      this.setState({value: doc.data().name});
    });
  }

  componentWillUnmount = () => {
    this.unsub();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.value}
      </React.Fragment>
    );
  }
}

ReferenceCell.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReferenceCell);
