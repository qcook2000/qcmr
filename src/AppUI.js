import React from 'react';
import PropTypes from 'prop-types';
import { 
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  Hidden,
  ListItem,
  ListItemText,
  Divider,
  Button,
  withStyles,
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import ExercisesTab from './routes/ExercisesTab';
import WorkoutsTab from './routes/WorkoutsTab';
import GraphTab from './routes/GraphTab';
import WHistoryLog from './routes/WorkoutHistoryTab';

import { Switch, Route, NavLink } from 'react-router-dom'
import LoginSignupDialog from './LoginSignupDialog';
import withAuthentication from './withAuthentication';
import AuthUserContext from './AuthUserContext';
import { auth, db } from './firebase';


const drawerWidth = 240;
const tabs = [
  { 
    route:'/workout',
    component: WorkoutsTab,
  },{ 
    route:'/exercises',
    component: ExercisesTab,
  },{ 
    route:'/workout-history',
    component: WHistoryLog,
  },{ 
    route:'/graphs',
    component: GraphTab,
  }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    width: '100%',
    height: '100%',
    background: 'url(logo.png)',
    backgroundSize: 'auto 50%',
    backgroundPosition: `${theme.spacing.unit * 3}px center`,
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  activeNav: {
    backgroundColor: theme.palette.grey[300],
  },
  flex: {
    flexGrow: 1,
  },
});

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      loginOpen: false,
      logoutOpen: false,
    };
  }
  
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleLoginDialogClose = () => {
    this.setState({ loginOpen: false });
  }

  handleLoginClicked = () => {
    this.setState({ loginOpen: true });
  }

  handleAvatarClick = () => {
    this.setState({ logoutOpen: true });
  }

  handleLogoutCancel = () => {
    db.uploadData();
    this.setState({ logoutOpen: false });
  }

  handleLogoutClick = () => {
    auth.signOut()
    .then(authUser => {
      this.setState({ logoutOpen: false });
    })
    .catch(error => {
      alert(error);
    });
  }

  titleForPath = (path) => {
    var tab = tabs.find(tab => { return tab.route === '/' + path });
    return tab ? tab.component.label : '[No Title]';
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} style={{position:'relative'}}>
          <NavLink className={classes.logo} to='/' onClick={this.handleDrawerToggle}></NavLink>
        </div>
        <Divider />
        <List component="nav">
          {tabs.map( (tab, index) => {
            return (
              <ListItem button component={NavLink} activeClassName={classes.activeNav} to={tab.route} key={index} onClick={this.handleDrawerToggle}>
                <ListItemText primary={tab.component.label} />
              </ListItem>
            );
          }, this)}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary='Made by Q + C' />
          </ListItem>
        </List>
      </div>
    );

    const Title = ({path}) => (
      <span>{this.titleForPath(path)}</span>
    )

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleDrawerToggle} className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              <Route path="/:path" render={({match}) => <Title path={match.params.path} />} />
            </Typography>
            <AuthUserContext.Consumer>
              {authUser => authUser
                ? <Avatar alt={authUser.displayName} src={authUser.photoURL} onClick={this.handleAvatarClick}>
                    {authUser.photoURL ? '': authUser.displayName ? authUser.displayName.charAt(0) : '?'}
                  </Avatar>
                : <Button color="inherit" onClick={this.handleLoginClicked} >Login</Button>
              }
            </AuthUserContext.Consumer>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{ paper: classes.drawerPaper, }}
            ModalProps={{ keepMounted: true, }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper,}}>
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {tabs.map( (tab, index) => {
              return (
                <Route key={index} path={tab.route} component={tab.component}/>
              );
            }, this)}
            <Route path='/' component={WorkoutsTab}/>
          </Switch>
        </main>
        <LoginSignupDialog open={this.state.loginOpen} handleClose={this.handleLoginDialogClose}/>
        <Dialog open={this.state.logoutOpen}>
          <DialogTitle id="alert-dialog-title">Logout?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleLogoutCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleLogoutClick} color="primary">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withAuthentication(withStyles(styles, { withTheme: true })(ResponsiveDrawer));