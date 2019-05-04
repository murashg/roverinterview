import React, { Component } from 'react';
import axios from 'axios';

export default class CreateList extends Component {
  constructor(props) {
        super(props);

        this.onChangeSitterName = this.onChangeSitterName.bind(this);
        this.onChangeSitterEmail = this.onChangeSitterEmail.bind(this);
        this.onChangeSitterPhoneNumber = this.onChangeSitterPhoneNumber.bind(this);
        this.onChangeSitterImage = this.onChangeSitterImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            sitter_name: '',
            sitter_email: '',
            sitter_phone_number: '',
            sitter_image: ''
        }
    }

    onChangeSitterName(e) {
        this.setState({
            sitter_name: e.target.value
        });
    }

    onChangeSitterEmail(e) {
        this.setState({
            sitter_email: e.target.value
        });
    }

    onChangeSitterPhoneNumber(e) {
        this.setState({
            sitter_phone_number: e.target.value
        });
    }

    onChangeSitterImage(e) {
        this.setState({
            sitter_image: e.target.value
        });
    }

    calcSitterScore(s) {
      let set = new Set();
      for (var i = 0; i < s.length; i++){
        set.add(s.charAt(i));
      }
      return 5 * (set.size / 26);
    }

    onSubmit(e) {
        e.preventDefault();

        const newSitter = {
          sitter_name: this.state.sitter_name,
          sitter_email: this.state.sitter_email,
          sitter_phone_number: this.state.sitter_phone_number,
          sitter_stays: 0,
          sitter_rating: 0,
          sitter_score: this.calcSitterScore(this.state.sitter_name),
          sitter_image: this.state.sitter_image
        };

        console.log(newSitter);

        axios.post('http://localhost:4000/sitters/add', newSitter)
             .then(res => console.log(res.data));

        this.setState({
          sitter_name: '',
          sitter_email: '',
          sitter_phone_number: '',
          sitter_image: ''
        })
    }

    render() {
        return (
          <div style={{marginTop: 10}}>
              <h3>Create Sitter</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Image: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.sitter_image}
                              onChange={this.onChangeSitterImage}
                              />
                  </div>
                  <div className="form-group">
                      <label>Name: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.sitter_name}
                              onChange={this.onChangeSitterName}
                              />
                  </div>
                  <div className="form-group">
                      <label>Email: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.sitter_email}
                              onChange={this.onChangeSitterEmail}
                              />
                  </div>
                  <div className="form-group">
                      <label>Phone Number: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.sitter_phone_number}
                              onChange={this.onChangeSitterPhoneNumber}
                              />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Create Sitter" className="btn btn-primary" />
                  </div>
              </form>
          </div>
        )
    }
}
