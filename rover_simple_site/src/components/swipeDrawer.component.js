import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CreateOwner from './create/create-owner.component';
import SearchBar from './search-bar.component';

const styles = {
  list: {
    width: 250,
  },
  listItem: {
    'text-align': 'center',
  }
};

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideListAlways = (
      <div className={classes.list}>
        <List>
          <SearchBar />
          <Link to='/sitters'>
            <ListItem button key='Sitters' className={classes.listItem}>
              <ListItemText>
                Sitters
              </ListItemText>
            </ListItem>
          </Link>
          <Link to='/owners'>
            <ListItem button key='Owners'  className={classes.listItem}>
              <ListItemText>
                Owners
              </ListItemText>
            </ListItem>
          </Link>
          <Link to='/appointments'>
            <ListItem button key='Appointments'  className={classes.listItem}>
              <ListItemText>
                Appointments
              </ListItemText>
            </ListItem>
          </Link>
        </List>
        <Divider />
      </div>
    );

  const sideListOnAuth = (
    <div className={classes.list}>
      {this.props.auth && (
        <List>
          <Link to='/createsitter'>
            <ListItem button key='Sitters' className={classes.listItem}>
              <ListItemText>
                Create Sitter
              </ListItemText>
            </ListItem>
          </Link>
          <ListItem button key='Owners' className={classes.listItem}>
            <ListItemText>
              <CreateOwner name="Create Owner" submitted={(event)=>this.toggleDrawer('left',false)} setOwner={(event)=>this.props.setOwner(event)} shouldSetOwner={false}/>
            </ListItemText>
          </ListItem>
          <Link to='/createappointment'>
            <ListItem button key='Appointments' className={classes.listItem}>
              <ListItemText>
                Create Appointment
              </ListItemText>
            </ListItem>
          </Link>
        </List>
      )}
    </div>
  )

    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer('left', true)}/>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideListAlways}
          </div>
          <div>
            {sideListOnAuth}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
