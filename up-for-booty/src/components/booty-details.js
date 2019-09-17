import React, { Component } from 'react';
import axios from 'axios';

export default class BootyDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { booty: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/booty/view/' + this.props.match.params.id)
      .then(response => {
        this.setState({ booty: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const bootyDeets = this.state.booty ? (
      <div className="bootyDeets">
        <h4>{this.state.booty.firstName} {this.state.booty.firstName}</h4>
        <p>Phone number: {this.state.booty.phoneNo}</p>
        <p>Skype handle: {this.state.booty.skypeHandle}</p>
        <p>Email: {this.state.booty.email}</p>
        <p>Location: {this.state.booty.city}, {this.state.booty.country}</p>
        <p>Local time: {this.state.booty.timezone}</p>
      </div>
    ) :
      (console.log('loading page'))

    return (
      <div className="container">
        {bootyDeets}
      </div>
    );
  }
}
