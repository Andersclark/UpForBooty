import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import AddBooty from './add-booty';

export default class EditBootyDetails extends Component {
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
    return (
      <AddBooty indivBooty={this.state.booty}/>
    );
  }
}