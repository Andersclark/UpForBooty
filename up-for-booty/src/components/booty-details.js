import React, { Component } from 'react';
import axios from 'axios';

export default class BootyDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('booty deets mounted!');

    axios.get('http://localhost:5000/booty/view/' + this.props.match.params.id)
      .then(response => {
        this.setState({ booty: response.data })
        console.log({ booty: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h3>Booty Deets</h3>
      </div>
    )
  }
}