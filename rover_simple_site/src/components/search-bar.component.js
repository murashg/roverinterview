import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import axios from 'axios';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';

const Result = props => {
  return (
    <div
      onKeyDown={props.handleClose}
    >
      <Popover
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={props.open}
        onClose={props.handleClose}
      >
        <List>
        </List>
        {props.result.owner_name}
      </Popover>
    </div>
  );
}

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  searchresult: {

  }
})

export default withStyles(styles)(class SearchBar extends Component {
  constructor(props){
    super(props);

    this.onChangeInput = this.onChangeInput.bind(this);

    this.state = {
      input: '',
      results: [],
      anchorEl: null
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  onChangeInput(e){
    this.setState({
      input: e.target.value,
      anchorEl: e.currentTarget
    });
    console.log(this.state.input);
    axios.get('http://localhost:4000/owners/search/'+this.state.input)
        .then(response => {
          this.setState({
            results: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
        })
    if (this.state.results.length == 0){
      this.setState({
        results: []
      })
    }
    if (this.state.results.length > 0 && !this.state.open){
      this.setState({
        open: true
      })
    }else if(this.state.open){
      this.setState({
        open: false
      })
    }
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      results: [],
      input: ''
    });
  }

  resultsList(open, anchorEl, handleClose) {
    console.log(this.state.results);
    if (this.state.results.length > 0){
      return this.state.results.map(function(currentResult, i) {
        return <Result anchorEl={anchorEl.anchorEl} open={open} result={currentResult} key={i} handleClose={handleClose}/>;
      });
    }
  }

  render(){
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <div className={classes.grow}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this.onChangeInput}
              onClick={this.handleClick}
              value={this.state.input}
            />
          </div>
        </div>
        <div className={classes.searchResult}>
          {this.resultsList(open, anchorEl, this.handleClose)}
        </div>
      </div>
    );
  }
})
