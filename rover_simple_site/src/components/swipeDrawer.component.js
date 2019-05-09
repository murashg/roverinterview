import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import CreateOwner from './create/create-owner.component';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
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

    const sideList = (
      <div className={classes.list}>
        <List>
            <ListItem button key='Sitters'>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText>
                <Link to='/sitters'>Sitters</Link>
              </ListItemText>
            </ListItem>
            <ListItem button key='Owners'>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText>
                <Link to='/owners'>Owners</Link>
              </ListItemText>
            </ListItem>
            <ListItem button key='Appointments'>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText>
                <Link to='/appointments'>Appointments</Link>
              </ListItemText>
            </ListItem>
        </List>
        <Divider />
        {this.props.auth && (
          <List>
              <ListItem button key='Sitters'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText>
                  <Link to='/sitters'>Sitters</Link>
                </ListItemText>
              </ListItem>
              <ListItem button key='Owners'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText>
                  <CreateOwner name="Create Owner" setOwner={(event)=>this.props.setOwner(event)} shouldSetOwner={false}/>
                </ListItemText>
              </ListItem>
              <ListItem button key='Appointments'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText>
                  <Link to='/appointments'>Appointments</Link>
                </ListItemText>
              </ListItem>
          </List>
        )}
      </div>
    );

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
            {sideList}
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
