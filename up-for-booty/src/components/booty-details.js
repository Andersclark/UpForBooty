import React, { Component } from 'react';
import axios from 'axios';

export default class BootyDetails extends Component {
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

  displayWorkTimes(){
    if(this.state.booty.atWorkTimes && this.state.booty.atWorkTimes.length > 0){
      let timeToDisplay = this.state.booty.atWorkTimes[0]+':00 - '+ this.state.booty.atWorkTimes[1]+':00' 
      return <p><i className="fas fa-briefcase fontawesome"></i>Working Hours: {timeToDisplay}</p>
    }
  }

  displaySleepTimes(){
    if(this.state.booty.asleepTimes && this.state.booty.asleepTimes.length > 0){
      let timeToDisplay = this.state.booty.asleepTimes[0]+':00 - '+ this.state.booty.asleepTimes[1]+':00'
      return <p><i className="fas fa-bed fontawesome"></i>Sleeping Hours: {timeToDisplay}</p>
    }
  }

  render() {
    return (
      <div className="container">
         <div className="bootyDeets">
        <h4>{this.state.booty.firstName} {this.state.booty.lastName}</h4>
        <p><i className="fas fa-phone-alt fontawesome"></i>Phone number: {this.state.booty.phoneNo}</p>
        <a href="https://www.skype.com/sv/"><p><i className="fab fa-skype fontawesome"></i>Skype handle: {this.state.booty.skypeHandle}</p></a>
        <p><i className="far fa-envelope-open fontawesome"></i>Email: {this.state.booty.email}</p>
        <p><i className="fas fa-home fontawesome"></i>Location: {this.state.booty.city}, {this.state.booty.country}</p>
        <p><i className="fas fa-clock fontawesome"></i>Timezone: {this.state.booty.timezone}</p>
        {this.displayWorkTimes()}
        {this.displaySleepTimes()}
      </div>
      </div>
    );
  }
}
