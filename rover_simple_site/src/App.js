import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'typeface-roboto';

import Main from "./components/main.component";
import Footer from "./components/footer.component";

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
