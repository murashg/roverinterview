import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class Login extends Component {

  constructor(props) {
        super(props);
        console.log(props);
        this.onChangeOwnerEmail = this.onChangeOwnerEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            owner_email: '',
            open: false,
        }
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    onChangeOwnerEmail(e) {
        this.setState({
            owner_email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.get('http://localhost:4000/owners/email/'+this.state.owner_email)
             .then(res => {
               console.log(res.data);
               this.props.setOwner(res.data);
             });

    }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Login
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Please fill out this form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide your email to login.
            </DialogContentText>
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="Email"
              fullWidth
              value={this.state.owner_email}
              onChange={this.onChangeOwnerEmail}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
