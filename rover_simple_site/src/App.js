import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SitterList from "./components/sitter-list.component";
import CreateList from "./components/create-appointment.component";
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
                  <Link to="/" className="nav-link">Sitters</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createappointment" className="nav-link">Create Appointment</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>

          <Route path="/" exact component={SitterList} />
          <Route path="/edit/:id" component={EditList} />
          <Route path="/createappointment" component={CreateList} />
        </div>
      </Router>
    );
  }
}

export default App;
