import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h2>Rover Simple App</h2>
          <Route path="/" exact component={SitterList} />
          <Route path="/edit/:id" component={EditList} />
          <Route path="/create" component={CreateList} />
        </div>
      </Router>
    );
  }
}

export default App;
