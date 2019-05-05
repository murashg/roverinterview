import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sitter = props => (
  <tr>
    <td><div class="img"><img src={props.sitter.sitter_image} alt="sitter" class="img-thumbnail"/></div></td>
    <td>{props.sitter.sitter_name}</td>
    <td>{props.sitter.sitter_overall_rating_view}</td>
    <td>{props.sitter.sitter_email}</td>
    <td>{props.sitter.sitter_phone_number}</td>
    <td>
      <Link to={"/edit/"+props.sitter._id}>Edit</Link>
    </td>
  </tr>
)

export default class OwnerList extends Component {
    constructor(props) {
      super(props);
      this.state = {sitters: []};
    }

    componentDidMount() {
      axios.get('http://localhost:4000/sitters/')
          .then(response => {
            this.setState({ sitters: response.data});
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    sittersList() {
      return this.state.sitters.map(function(currentSitter, i) {
        return <Sitter sitter={currentSitter} key={i} />;
      })
    }

    render() {
        return (
            <div>
              <h3>Owners!</h3>
                <table className="table table-striped" style={{ marginTop: 20}} >
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Rating</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.sittersList() }
                  </tbody>
                </table>
            </div>
        )
    }
}
