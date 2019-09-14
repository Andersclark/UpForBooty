import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Booty = props => (
  <tr>
    <td>{props.booty.firstName}</td>
    <td>{props.booty.lastName}</td>
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