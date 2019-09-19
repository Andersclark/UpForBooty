import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
import moment from 'moment-timezone';

const Booty = props => (
  <tr>
    <td>{props.booty.firstName} {props.booty.lastName}</td>
    <td>{props.booty.timezone}</td>
    <td>{props.booty.time.format("HH:mm:ss")}</td>
    <td>
      <Link to={"/view/" + props.booty._id}>View details</Link>
    </td>
  </tr>
)

export default class BootyList extends Component {
  constructor(props) {
    super(props);
    this.state = { booties: [] };
  }

  componentDidMount() {
    this._isMounted = true; // set this to false on unmount

    // Create a function and add as a subscriber to changes in the store
    this.storeSubscriber = (...x) => this.reactOnStoreChanges(...x);
    store.subscribeToChanges(this.storeSubscriber)
    this.updateTime();
  }

  reactOnStoreChanges(newBooties) {
    this.setState({booties: newBooties})    
  }

  componentWillUnmount() {
    this._isMounted = false;
    store.unsubscribeToChanges(this.storeSubscriber);
  }

  bootyList() {
    return this.state.booties.map(currentBooty => {
      return <Booty booty={currentBooty} key={currentBooty._id} />;
    })
  }

  sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  async updateTime(){
    while(this._isMounted){
        let newBooties = this.state.booties.slice();
        for (let booty of newBooties){
          booty.time = moment(booty.time).add(500, "ms")
        }
        this.setState({booties:newBooties});
        await this.sleep(500);
    }
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