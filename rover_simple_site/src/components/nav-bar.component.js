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
import SearchBar from './search-bar.component';
const styles = theme => ({
  appBar: {
    position: 'sticky',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',

  },
  inline: {
    display: 'inline',
    minWidth: 'auto'
  },
  flex: {
    display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    },
    color: '#24a777'
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    position: 'absolute',
    left: '24px',
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto'
  },
  login: {
    display: 'table-cell'
  },
  signup: {
    display: 'table-cell',
    paddingLeft: '10px'
  },
  rover: {
    marginRight: 'auto',
    paddingLeft: '75px',
  }
})



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
    this.props.logout();
  };

  openDrawer = () => {

  }

  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={this.props.auth} onChange={(event)=>this.props.handleAuthChange(event)} aria-label="LoginSwitch" />
            }
            label={this.props.auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="relative" color='default' className={classes.appbar}>
          <Toolbar className={classes.flex}>
              <IconButton color="inherit" aria-label="Menu" className={classes.iconButton}>
                <SwipeableTemporaryDrawer auth={this.props.auth}/>
              </IconButton>
              <Typography variant="h6" className={classes.rover}>
                <a href="https://rover.com" target="_blank" rel="noopener" className={classes.inline}>
                  <img src={logo} width="30" height="30" alt="rover.com" />
                </a>
                <Link to="/"  className={classes.link}><span className={classes.tagline}>Rover</span></Link>
              </Typography>
              {this.props.auth && (
                <div className={classes.authorize}>
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
                    <MenuItem onClick={this.handleClose}>LogOut</MenuItem>
                  </Menu>
                </div>
              )}

              <SearchBar />

            {!this.props.auth && (

                  <div className={classes.inline}>
                    <div className={classes.login}>
                      <Login setOwner={(event)=>this.props.setOwner(event)}/>
                    </div>
                    <div className={classes.signup}>
                      <SignUp setOwner={(event)=>this.props.setOwner(event)}/>
                    </div>
                  </div>

            )}

          </Toolbar>

        </AppBar>
      </div>
    );
  }
})
