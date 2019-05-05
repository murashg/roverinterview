import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SplashPage from "./components/splashpage.component";
import SitterList from "./components/sitter-list.component";
import OwnerList from "./components/owner-list.component";
import AppointmentList from "./components/appointment-list.component";
import CreateAppointment from "./components/create-appointment.component";
import CreateSitter from "./components/create-sitter.component";
import CreateOwner from "./components/create-owner.component";
import EditList from "./components/edit-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://Rover.com" target="_blank">
              <img src={logo} width="30" height="30" alt="Rover.com" />
            </a>
            <Link to="/" className="navbar-brand">Rover Simple App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/sitters" className="nav-link">Sitters</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/owners" className="nav-link">Owners</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/appointments" className="nav-link">Appointments</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createappointment" className="nav-link">Create Appointment</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createowner" className="nav-link">Create Owner</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createsitter" className="nav-link">Create Sitter</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>

          <Route path="/" exact component={SplashPage} />
          <Route path="/sitters" exact component={SitterList} />
          <Route path="/owners" exact component={OwnerList} />
          <Route path="/appointments" exact component={AppointmentList} />
          <Route path="/edit/:id" component={EditList} />
          <Route path="/createappointment" component={CreateAppointment} />
          <Route path="/createowner" component={CreateOwner} />
          <Route path="/createsitter" component={CreateSitter} />
        </div>
      </Router>
    );
  }
}

export default App;
