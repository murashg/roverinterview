import React, { Component } from 'react';
import axios from 'axios';

export default class CreateList extends Component {
  constructor(props) {
        super(props);
        console.log(props);
        this.onChangeAppointmentSitter = this.onChangeAppointmentSitter.bind(this);
        this.onChangeAppointmentOwner = this.onChangeAppointmentOwner.bind(this);
        this.onChangeAppointmentStartDate = this.onChangeAppointmentStartDate.bind(this);
        this.onChangeAppointmentEndDate = this.onChangeAppointmentEndDate.bind(this);
        this.onChangeAppointmentRating = this.onChangeAppointmentRating.bind(this);
        this.onChangeAppointmentText = this.onChangeAppointmentText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            appointment_sitter: props.match.params.sitter,
            appointment_owner: props.match.params.owner,
            appointment_startDate: '',
            appointment_endDate: '',
            appointment_rating: 5.0,
            appointment_text: ''
        }
    }

    onChangeAppointmentSitter(e) {
        this.setState({
            appointment_sitter: e.target.value
        });
    }

    onChangeAppointmentOwner(e) {
        this.setState({
            appointment_owner: e.target.value
        });
    }

    onChangeAppointmentStartDate(e) {
        this.setState({
            appointment_startDate: e.target.value
        });
    }

    onChangeAppointmentEndDate(e) {
        this.setState({
            appointment_endDate: e.target.value
        });
    }

    onChangeAppointmentRating(e) {
        this.setState({
            appointment_rating: e.target.value
        });
    }

    onChangeAppointmentText(e) {
        this.setState({
            appointment_text: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newAppointment = {
          appointment_sitter: this.state.appointment_sitter,
          appointment_owner: this.state.appointment_owner,
          appointment_startDate: this.state.appointment_startDate,
          appointment_endDate: this.state.appointment_endDate,
          appointment_rating: this.state.appointment_rating,
          appointment_text: this.state.appointment_text
        };

        console.log(newAppointment);

        axios.post('http://localhost:4000/appointments/add', newAppointment)
             .then(res => console.log(res.data));

        this.setState({
          appointment_sitter: '',
          appointment_owner: '',
          appointment_startDate: '',
          appointment_endDate: '',
          appointment_rating: 5.0,
          appointment_text: '',
          appointment_sitterImage: ''
        })
    }

    render() {
        return (
          <div style={{marginTop: 10}}>
              <h3>Create Appointment</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Sitter: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.appointment_sitter}
                              onChange={this.onChangeAppointmentSitter}
                              />
                  </div>
                  <div className="form-group">
                      <label>Owner: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.appointment_owner}
                              onChange={this.onChangeAppointmentOwner}
                              />
                  </div>
                  <div className="form-group">
                      <label>Rating: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.appointment_rating}
                              onChange={this.onChangeAppointmentRating}
                              />
                  </div>
                  <div className="form-group">
                      <label>Start Date: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.appointment_startDate}
                              onChange={this.onChangeAppointmentStartDate}
                              />
                  </div>
                  <div className="form-group">
                      <label>End Date: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.appointment_endDate}
                              onChange={this.onChangeAppointmentEndDate}
                              />
                  </div>
                  <div className="form-group">
                      <label>Text: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.appointment_text}
                              onChange={this.onChangeAppointmentText}
                              />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Create Appointment" className="btn btn-primary" />
                  </div>
              </form>
          </div>
        )
    }
}
