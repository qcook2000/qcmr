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
  ListItemIcon
} from '@material-ui/core';
import { purple, cyan } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import TrendingUp from '@material-ui/icons/TrendingUp';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import AvTimer from '@material-ui/icons/AvTimer';
import Create from '@material-ui/icons/Create';
import BatteryChargingFull from '@material-ui/icons/BatteryChargingFull';

import ExercisesTab from './routes/ExercisesTab';
import WorkoutsTab from './routes/WorkoutsTab';
import GraphTab from './routes/GraphTab';
import WHistoryLog from './routes/WorkoutHistoryTab';

import { Switch, Route, NavLink } from 'react-router-dom'
import LoginSignupDialog from './components/LoginSignupDialog';
import withAuthentication from './withAuthentication';
import AuthUserContext from './AuthUserContext';
import { auth, db } from './firebase';


const drawerWidth = 240;
const tabs = [
  { 
    route:'/workout',
    component: WorkoutsTab,
    icon: <Create/>,
  },{ 
    route:'/exercises',
    component: ExercisesTab,
    icon: <FitnessCenter/>,
  },{ 
    route:'/workout-history',
    component: WHistoryLog,
    icon: <AvTimer/>,
  },{ 
    route:'/graphs',
    component: GraphTab,
    icon: <TrendingUp/>,
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
  menuToolbar: {
    background: `linear-gradient(45deg, ${cyan[800]} 20%, ${purple[900]} 80%)`, // Some CSS
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    marginLeft: theme.spacing.unit * -1,
  },
  logo: {
    fontSize: '36px',
    marginLeft: '-8px',
    color: '#fff',
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  activeNav: {
    backgroundColor: theme.palette.background.default,
  },
  flex: {
    flexGrow: 1,
  },
  menuItem: {
    padding: 0,
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
        <Toolbar className={classes.menuToolbar}>
          <BatteryChargingFull className={classes.logo}/>
          <Typography variant='title'>CQ.run</Typography>
        </Toolbar>
        <Divider />
        <List component="nav">
          {tabs.map( (tab, index) => {
            return (
              <ListItem button component={NavLink} activeClassName={classes.activeNav} to={tab.route} key={index} onClick={this.handleDrawerToggle}>
                <ListItemIcon>
                  {tab.icon}
                </ListItemIcon>
                <ListItemText className={classes.menuItem} primary={tab.component.label} />
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
          <Toolbar className={classes.toolBar}>
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
          <Toolbar></Toolbar>
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