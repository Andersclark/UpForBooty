import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';

const Booty = props => (
  <tr>
    <td>{props.booty.firstName} {props.booty.lastName}</td>
    <td>{props.booty.timezone}</td>
    <td>{props.booty.time.format("HH:mm")}</td>
    <td>
      <Link to={"/view/" + props.booty._id}>Info</Link>
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
    let language = store.getLanguage();
    return (
      <div>
        <h3 className="logo">{language === 'eng' ? 'Booty List' : 'Bootylista'}</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th className="logo">{language === 'eng' ? 'Name' : 'Namn'}</th>
              <th className="logo">{language === 'eng' ? 'Timezone' : 'Tidszon'}</th>
              <th className="logo">{language === 'eng' ? 'Local time' : 'Lokaltid'}</th>
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