import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  withMobileDialog,
  withStyles,
  Divider,
  DialogActions,
  Typography,
} from '@material-ui/core';
import { auth } from '../firebase';


const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit * 6,
    marginTop: theme.spacing.unit * 6,
  },
  or: {
    marginTop: theme.spacing.unit * -7,
  },
  orSpan: {
    backgroundColor: 'white',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

class LoginSignupDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleGLogin = () => {
    auth.signInWithPopup(auth.getGoogleProvider())
    .then(result => {
      this.props.handleClose();
    }).catch(error => {
      // An error happened.
      if (error.code === 'auth/account-exists-with-different-credential') {
        console.log('CONNECT!');
        // User's email already exists.
        // The pending Google credential.
        var pendingCred = error.credential;
        // The provider account's email address.
        var email = error.email;
        // Get sign-in methods for this email.
        auth.fetchSignInMethodsForEmail(email).then(methods => {
          // If the user has several sign-in methods,
          // the first method in the list will be the "recommended" method to use.
          if (methods[0] === 'password') {
            // Asks the user his password.
            // In real scenario, you should handle this asynchronously.
            this.setState({pendingCred: pendingCred});
            alert('Please sign in with password to link to your google account, this email is already in use.')
          } else {
            alert('BAD!');
          }
        });
      } else {
        alert(error);
      }
    });
  };

  handleCancel = () => {
    this.props.handleClose();
  };

  handleLoginOrSignup = () => {
    const {
      email,
      password,
    } = this.state;

    auth.signInWithEmailAndPassword(email, password)
    .then(authUser => {
      if (this.state.pendingCred) {
        authUser.linkAndRetrieveDataWithCredential(this.state.pendingCred)
        .then(authUser => {
          this.props.handleClose();
        })
        .catch(error => {
          alert(error.message);
        });
      } else {
        this.props.handleClose();
      }
    })
    .catch(error => {
      var errorCode = error.code;

      if (errorCode === 'auth/invalid-email') {
        // Try create user
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
          this.props.handleClose();
        })
        .catch(error => {
          alert(error.message);
        });
      } else {
        alert(error.message);
      }
    });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        fullScreen={this.props.fullScreen}
        aria-labelledby='form-dialog-title'
      >
          <DialogTitle id='form-dialog-title'>Sign up or sign in</DialogTitle>
          <DialogContent>
            <Button onClick={this.handleGLogin} fullWidth variant='contained' color='primary'>
              Login with Google
            </Button>
            <Divider className={this.props.classes.divider}/>
            <Typography variant='caption' align='center' className={this.props.classes.or}>
              <span className={this.props.classes.orSpan}>or</span>
            </Typography>
            <TextField margin='dense' fullWidth
              id='email' label='Email Address' type='email'
              onChange={this.handleChange('email')}
            />
            <TextField margin='dense' fullWidth
              id='password' label='Password' type='password'
              onChange={this.handleChange('password')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.handleLoginOrSignup} color='primary'>
              Login or Signup
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

LoginSignupDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withMobileDialog()(withStyles(styles)(LoginSignupDialog));