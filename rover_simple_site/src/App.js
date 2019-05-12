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

  logOut(){
    this.setState({
      owner: '',
      auth: false
    })
  }

  handleAuthChange = event => {
    this.setState({ auth: event.target.checked });
  };

  render() {
    const {classes} = this.props;
    console.log(this.state.owner);
    return (

        <div >
          <Main logout={() => this.logOut()} setOwner={(event) => this.setOwner(event)} auth={this.state.auth} handleAuthChange={(event)=>this.handleAuthChange(event)} owner={this.state.owner}/>
          <Footer/>
        </div>
    );
  }
}

export default App;
