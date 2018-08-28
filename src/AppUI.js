import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import PubSub from 'pubsub-js';

import CanMikeEatTab from './CanMikeEatTab';
import ExercisesTab from './ExercisesTab';
import WorkoutsTab from './WorkoutsTab';
import ProfileTab from './ProfileTab';
import WHistoryLog from './WHistoryLog';

import { Switch, Route, NavLink } from 'react-router-dom'


const drawerWidth = 240;
const tabs = [
  { 
    name:'Mike\'s Foods', 
    route:'/mikes-foods',
    component: CanMikeEatTab,
  },{ 
    name:'Workout', 
    route:'/workout',
    component: WorkoutsTab,
  },{ 
    name:'Exercises', 
    route:'/exercises',
    component: ExercisesTab,
  },{ 
    name:'Workout History', 
    route:'/workout-history',
    component: WHistoryLog,
  },{ 
    name:'Profile',
    route:'/profile',
    component: ProfileTab,
  }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
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
  }
});

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }
  
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  setTitle = (title) => {
    this.setState({ title: title });
  };

  titleForPath = (path) => {
    var tab = tabs.find(tab => { return tab.route === '/' + path });
    return tab ? tab.name : '[No Title]';
  }

  render() {
    const { classes, theme } = this.props;
    const { title } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} style={{position:'relative'}}><div className={classes.logo}></div></div>
        <Divider />
        <List component="nav">
          {tabs.map( (tab, index) => {
            return (
              <ListItem button component={NavLink} activeClassName={classes.activeNav} to={tab.route} key={index} onClick={(e) => this.setTitle(tab.name)}>
                <ListItemText primary={tab.name} />
              </ListItem>
            );
          }, this)}
        </List>
        <Divider />
        {/* <Button onClick={FU.updateDataInCollection}>DATA</Button> */}
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
            <Typography variant="title" color="inherit" noWrap>
              <Route path="/:path" render={({match}) => <Title path={match.params.path} />} />
            </Typography>
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
          </Switch>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);