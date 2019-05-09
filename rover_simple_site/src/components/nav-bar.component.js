import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SignUp from './signup.component';
import Login from './login.component';
import Paper from '@material-ui/core/Paper';
import SwipeableTemporaryDrawer from './swipeDrawer.component';
import logo from '../logo.png';

const styles = theme => ({
  root: {

  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});



export default withStyles(styles)(class NavBar extends Component {
  constructor(props) {
    super(props);
    console.log(this);
  }

  state = {
    anchorEl: null,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  openDrawer = () => {

  }

  render() {

    const classes = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={classes.auth} onChange={(event)=>this.props.handleAuthChange(event)} aria-label="LoginSwitch" />
            }
            label={classes.auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.inline} color="inherit" aria-label="Menu">
              <SwipeableTemporaryDrawer auth={classes.auth}/>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.tagline}>
              <a className={classes.inline} href="https://rover.com" target="_blank" rel="noopener">
                <img src={logo} width="30" height="30" alt="rover.com" />
              </a>
              <Link to="/" className="nav-link">Rover</Link>
            </Typography>
            {classes.auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                </Menu>
              </div>
            )}
            {!classes.auth && (
                <Paper>
                  <Login setOwner={(event)=>this.props.setOwner(event)}/>
                  <SignUp setOwner={(event)=>this.props.setOwner(event)}/>
                </Paper>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
})
