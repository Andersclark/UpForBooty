import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import store from '../store';
import moment from 'moment-timezone';
import Analogclock from './analogclock/analogclock.js'

const Booty = props => (
  <tr>
    <td><Analogclock time={props.booty.time}></Analogclock></td>
    <td>{props.booty.firstName} {props.booty.lastName}</td>
    <td>{props.booty.timezone}</td>
    <td>{props.booty.time.format("HH:mm")}</td>
    <td>
      <Link to={"/view/" + props.booty._id}>View details</Link>
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