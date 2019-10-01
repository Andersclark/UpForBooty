import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icon';
import store from '../store';

const Booty = props => (
  <tr>
    <td>{props.booty.firstName} {props.booty.lastName}</td>
    <td>{props.booty.timezone}</td>
    <td>{props.booty.time.format("HH:mm")}</td>
    <Icon status = {props.booty.status} ></Icon>
    <td>
      <Link to={"/view/" + props.booty._id}>Info</Link>
    </td>
  </tr>
)

export default class BootyList extends Component {
  constructor(props){
    super(props);
    this.state= {language: store.getLanguage()}
  }

  bootyList() {
    return this.props.list.map(currentBooty => {
      return <Booty booty={currentBooty} key={currentBooty._id} />;
    })
  } 

  componentDidMount() {
    this._isMounted = true;
    //the method to react on store changes
    this.languageChange = (lang) => this.setState({ language: lang });
    //subscribe to store 
    store.subscribeToChanges(this.languageChange)
  }
  componentWillUnmount() {
    this._isMounted = false;
    store.unsubscribeToChanges(this.languageChange);
  }

  render() {
    return (
      <div>
        <h3 className="logo">{this.state.language === 'eng' ? 'Booty List' : 'Bootylista'}</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th className="logo">{this.state.language === 'eng' ? 'Name' : 'Namn'}</th>
              <th className="logo">{this.state.language === 'eng' ? 'Timezone' : 'Tidszon'}</th>
              <th className="logo">{this.state.language === 'eng' ? 'Local time' : 'Lokaltid'}</th>
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