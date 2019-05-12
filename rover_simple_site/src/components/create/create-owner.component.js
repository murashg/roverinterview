import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CreateOwner extends Component {
  constructor(props) {
        super(props);
        this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
        this.onChangeOwnerEmail = this.onChangeOwnerEmail.bind(this);
        this.onChangeOwnerPhoneNumber = this.onChangeOwnerPhoneNumber.bind(this);
        this.onChangeOwnerDogs = this.onChangeOwnerDogs.bind(this);
        this.onChangeOwnerImage = this.onChangeOwnerImage.bind(this);
        this.onChangeOwnerBio = this.onChangeOwnerBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            owner_name: '',
            owner_email: '',
            owner_phone_number: '',
            owner_dogs: '',
            owner_image: '',
            owner_bio: '',
            open: false,
        }
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    onChangeOwnerName(e) {
        this.setState({
            owner_name: e.target.value
        });
    }

    onChangeOwnerEmail(e) {
        this.setState({
            owner_email: e.target.value
        });
    }

    onChangeOwnerPhoneNumber(e) {
        this.setState({
            owner_phone_number: e.target.value
        });
    }

    onChangeOwnerDogs(e) {
        this.setState({
            owner_dogs: e.target.value
        });
    }

    onChangeOwnerImage(e) {
        this.setState({
            owner_image: e.target.value
        });
    }

    onChangeOwnerBio(e) {
        this.setState({
            owner_bio: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newOwner = {
          owner_name: this.state.owner_name,
          owner_email: this.state.owner_email,
          owner_phone_number: this.state.owner_phone_number,
          owner_dogs: this.state.owner_dogs.split("|"),
          owner_image: this.state.owner_image,
          owner_bio: this.state.owner_bio,
        };

        axios.post('http://localhost:4000/owners/add', newOwner)
             .then(res => {
               console.log(res.data);
               if (this.props.shouldSetOwner){
                this.props.setOwner(res.data);
               }
             });
             
        this.setState({
          open: false,
        })
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };
    render() {
        return (
          <div>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              {this.props.name}
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Please fill out this form</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Become a Rover user today to see sitters that can offer you services!
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="Text"
                  fullWidth
                  value={this.state.owner_name}
                  onChange={this.onChangeOwnerName}
                />
                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="Email"
                  fullWidth
                  value={this.state.owner_email}
                  onChange={this.onChangeOwnerEmail}
                />
                <TextField
                  margin="dense"
                  id="Phone Number"
                  label="Phone Number"
                  type="Phone Number"
                  fullWidth
                  value={this.state.owner_phone_number}
                  onChange={this.onChangeOwnerPhoneNumber}
                />
                <TextField
                  margin="dense"
                  id="Dogs"
                  label="Dogs (Use pipe char to seperate)"
                  type="Text"
                  fullWidth
                  value={this.state.owner_dogs}
                  onChange={this.onChangeOwnerDogs}
                />
                <TextField
                  margin="dense"
                  id="Image"
                  label="Image"
                  type="Text"
                  fullWidth
                  value={this.state.owner_image}
                  onChange={this.onChangeOwnerImage}
                />
                <TextField
                  margin="dense"
                  id="Bio"
                  label="Bio"
                  type="Text"
                  fullWidth
                  value={this.state.owner_bio}
                  onChange={this.onChangeOwnerBio}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.onSubmit} color="primary">
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
          </div>

        );
    }
}

/*
<div style={{marginTop: 10}}>
    <h3>Create Owner</h3>
    <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Name: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.owner_name}
                    onChange={this.onChangeOwnerName}
                    />
        </div>
        <div className="form-group">
            <label>Email: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.owner_email}
                    onChange={this.onChangeOwnerEmail}
                    />
        </div>
        <div className="form-group">
            <label>Phone Number: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.owner_phone_number}
                    onChange={this.onChangeOwnerPhoneNumber}
                    />
        </div>
        <div className="form-group">
            <label>Dogs: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.owner_dogs}
                    onChange={this.onChangeOwnerDogs}
                    />
        </div>
        <div className="form-group">
            <label>Pic: </label>
            <input  type="text"
                    className="form-control"
                    value={this.state.owner_pic}
                    onChange={this.onChangeOwnerPic}
                    />
        </div>
        <div className="form-group">
            <input type="submit" value="Create Owner" className="btn btn-primary" />
        </div>
    </form>
</div>
*/
