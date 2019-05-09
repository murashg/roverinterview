import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'typeface-roboto';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import NavBar from "./components/nav-bar.component";
import Main from "./components/main.component";
import Footer from "./components/footer.component";

import logo from "./logo.png";

const styles = {

}
/*
<Main/>
<Footer/>
*/
class App extends Component {
  state = {
    owner: '',
    auth: false,
  }

  setOwner(event){
    this.setState({
      owner: event,
      auth: true,
    })
  }

  handleAuthChange = event => {
    this.setState({ auth: event.target.checked });
  };

  render() {

    return (

        <div className="container">
          <Main setOwner={(event) => this.setOwner(event)} auth={this.state.auth} handleAuthChange={(event)=>this.handleAuthChange(event)}/>
          <Footer/>
        </div>
    );
  }
}

export default App;
