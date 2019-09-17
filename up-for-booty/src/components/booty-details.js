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
        <h4>{this.state.booty.firstName} {this.state.booty.lastName}</h4>
        <p>{this.state.booty.phoneNo}</p>
        <p>{this.state.booty.skypeHandle}</p>
        <p>{this.state.booty.email}</p>
        <p>{this.state.booty.city}</p>
        <p>{this.state.booty.country}</p>
        <p>{this.state.booty.timezone}</p>
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
