import React, { Component } from 'react';
import BootyForm from '../BootyForm';
import axios from 'axios';
import '../App.css';

export default class EditBootyDetails extends Component {
  constructor(props) {
    super(props);
    console.log('PROPS in edit',props)

    this.state = { booty: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/booty/view/' + this.props.match.params.id)
      .then(response => {
        this.setState({ booty: response.data })
        console.log('This state', this.state);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <BootyForm />
    );
  }
}