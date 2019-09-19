import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Booty = props => (
  <tr>
    <td>{props.booty.firstName} {props.booty.lastName}</td>
    <td>{props.booty.timezone}</td>
    <td>{props.booty.time.format("hh:mm:ss")}</td>
    <td>
      <Link to={"/view/" + props.booty._id}>View details</Link>
    </td>
  </tr>
)

export default class BootyList extends Component {
  //moving the list to props instead of state so this down is noot needed
/*  
  constructor(props) {
    super(props);
    this.state = { booties: [] };
  }

  componentDidMount() {
    this._isMounted = true; // set this to false on unmount

    // Create a function and add as a subscriber to changes in the store
    this.storeSubscriber = (...x) => this.reactOnStoreChanges(...x);
    store.subscribeToChanges(this.storeSubscriber)
  }

  reactOnStoreChanges(newBooties) {
    this.setState({booties: newBooties})    
  }

  componentWillUnmount() {
    this._isMounted = false;
    store.unsubscribeToChanges(this.storeSubscriber);
  }
  */

  bootyList() {
    return this.props.list.map(currentBooty => {
      return <Booty booty={currentBooty} key={currentBooty._id} />;
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