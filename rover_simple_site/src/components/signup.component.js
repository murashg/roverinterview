import React, { Component } from 'react';
import CreateOwner from './create/create-owner.component';

export default class SignUp extends Component {

    render() {

      return (
        <div>
          <CreateOwner name="Sign Up" setOwner={(event) => this.props.setOwner(event)} shouldSetOwner={true}/>
        </div>
      );
    }
}
