import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icon';

const Booty = props => (
  <tr>
    <td>{props.booty.firstName} {props.booty.lastName}</td>
    <td>{props.booty.timezone}</td>
    <td>{props.booty.time.format("HH:mm")}</td>
    <Icon status = {props.booty.status} ></Icon>
    <td>
      <Link to={"/view/" + props.booty._id}>View details</Link>
      <Link to={"/edit/" + props.booty._id}>Edit details</Link>
    </td>
  </tr>
)

export default class BootyList extends Component {

  bootyList() {
    return this.props.list.map(currentBooty => {
      return <Booty booty={currentBooty} key={currentBooty._id} />;
    })
  } 

  render() {
    return (
      <div>
        <h3 className="logo">Booty List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th className="logo">Name</th>
              <th className="logo">Timezone</th>
              <th className="logo">Current local time</th>
              <th></th>
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