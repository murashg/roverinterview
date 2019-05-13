import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';


export default class InitializeDb extends Component {

  handleClick(){
    axios.post('http://localhost:4000/db/initialize')
        .then(response => {
          console.log('db has been initialized');
        })
        .catch(function (error) {
          console.log(error);
        })
  }



  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>
          InitializeDb
        </Button>
      </div>
    );
  }
}
