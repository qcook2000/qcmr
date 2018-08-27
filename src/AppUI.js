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


const drawerWidth = 240;
const tabs = ['Can Mike Eat', 'Workout', 'Exercises', 'Workout History', 'Profile']

const styles = theme => ({
  appBar: {
    position: 'absolute',
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
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit*2,
  },
});

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  componentDidMount() {
    this.setTab(0);
    PubSub.subscribe('tabChange', this.tabChangeSubReceived);
  }
  
  tabChangeSubReceived = (msg, data) => {
      if (data.tabIndex === 0) {
        this.setState({ eatTabFilter: data.eatTabFilter});
      }
      this.setTab(data.tabIndex);
  }

  handlerForTabIndex = index => {
    return () => {
      this.setTab(index);
    }
  };

  setTab = (index) => {
    this.setState({ selectedTab: index, mobileOpen: false, title:tabs[index] })
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    const { selectedTab, eatTabFilter, title } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List component="nav">
          {tabs.map( (tab, index) => {
            return (
              <ListItem button key={index} onClick={this.handlerForTabIndex(index)}>
                <ListItemText primary={tab} />
              </ListItem>
            );
          }, this)}
        </List>
        <Divider />
        <Typography>Made by Q + C</Typography>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {selectedTab === 0 && <CanMikeEatTab eatTabFilter={eatTabFilter}/>}
          {selectedTab === 1 && <WorkoutsTab />}
          {selectedTab === 2 && <ExercisesTab />}
          {selectedTab === 3 && <WHistoryLog />}
          {selectedTab === 4 && <ProfileTab />}
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