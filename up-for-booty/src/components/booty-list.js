import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Booty = props => (
  <tr>
    <td>{props.booty.firstName} {props.booty.lastName}</td>
    <td>{props.booty.timezone}</td>
    <td>
      <Link to={"/view/"+props.booty._id}>View details</Link>
    </td>
  </tr>
)

export default class BootyList extends Component {
  constructor(props) {
    super(props);

    this.state = {booties: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/booty/')
      .then(response => {
        this.setState({ booties: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  bootyList() {
    return this.state.booties.map(currentBooty => {
      return <Booty booty={currentBooty} key={currentBooty._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Booty List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Local time</th>
            </tr>
          </thead>
          <tbody>
            { this.bootyList() }
          </tbody>
        </table>
      </div>
    )
  }
}