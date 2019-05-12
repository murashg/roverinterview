import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './nav-bar.component';

import SplashPage from './splashpage.component';
import Sitters from './sitter-list.component';
import Owners from './owner-list.component';
import Appointments from './appointment-list.component';
import CreateSitter from './create/create-sitter.component';
import CreateOwner from './create/create-owner.component';
import CreateAppointment from './create/create-appointment.component';

export default class Main extends Component {
  render() {
    return (
      <Router>
          <NavBar logout={() => this.props.logout()}setOwner={(event) => this.props.setOwner(event)} auth={this.props.auth} handleAuthChange={(event)=>this.props.handleAuthChange(event)}/>
          <Route path="/" exact component={SplashPage} />
          <Route path="/sitters" render={(props) => <Sitters {...props} auth={this.props.auth} owner={this.props.owner}/>} />
          <Route path="/owners" exact component={Owners} />
          <Route path="/appointments" exact component={Appointments} />
          <Route path="/createsitter" exact component={CreateSitter} />
          <Route path="/createowner" exact component={CreateOwner} />
          <Route path="/createappointment/:sitter/:owner" component={CreateAppointment}/>
      </Router>
    );
  }
}
