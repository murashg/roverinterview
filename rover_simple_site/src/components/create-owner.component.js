import React, { Component } from 'react';
import axios from 'axios';

export default class CreateList extends Component {
  constructor(props) {
        super(props);

        this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
        this.onChangeOwnerEmail = this.onChangeOwnerEmail.bind(this);
        this.onChangeOwnerPhoneNumber = this.onChangeOwnerPhoneNumber.bind(this);
        this.onChangeOwnerDogs = this.onChangeOwnerDogs.bind(this);
        this.onChangeOwnerPic = this.onChangeOwnerPic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            owner_name: '',
            owner_email: '',
            owner_phone_number: '',
            owner_dogs: '',
            owner_pic: ''
        }
    }

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

    onChangeOwnerPic(e) {
        this.setState({
            owner_pic: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Owner Name: ${this.state.owner_name}`);
        console.log(`Owner Email: ${this.state.owner_email}`);
        console.log(`Owner PhoneNumber: ${this.state.owner_phone_number}`);
        console.log(`Owner Dogs: ${this.state.owner_dogs}`);
        console.log(`Owner Pic: ${this.state.owner_pic}`);

        const newowner = {
          owner_name: this.state.owner_name,
          owner_email: this.state.owner_email,
          owner_phone_number: this.state.owner_phone_number,
          owner_dogs: this.state.owner_dogs,
          owner_pic: this.state.owner_pic,
        };

        axios.post('http://localhost:4000/createowner/add', newowner)
             .then(res => console.log(res.data));

        this.setState({
          owner_name: '',
          owner_email: '',
          owner_phone_number: '',
          owner_dogs: '',
          owner_pic: '',
        })
    }

    render() {
        return (
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
        )
    }
}
