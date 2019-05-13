import React, { Component } from 'react';
import InitializeDb from './initializedb.component';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '90%',
    position: 'relative',
    bottom: '10px'
  },
})

export default withStyles(styles)(class Footer extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        Please only click initializedb button once.  I ran out of time for hiding it after it was initialized.
        <InitializeDb/>
      </div>
    );
  }
})
