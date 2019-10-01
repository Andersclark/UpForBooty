import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';

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

  render() {
    let language = store.getLanguage();
    return (
      <div className="container">
         <div className="bootyDeets">
        <h4>{this.state.booty.firstName} {this.state.booty.lastName}</h4>
        <p><i className="fas fa-phone-alt fontawesome"></i>{language === 'eng' ? 'Phone number: ' : 'Telefonnummer: '} {this.state.booty.phoneNo}</p>
        <a href="https://www.skype.com/sv/"><p><i className="fab fa-skype fontawesome"></i>Skype: {this.state.booty.skypeHandle}</p></a>
        <p><i className="far fa-envelope-open fontawesome"></i>{language === 'eng' ? 'Email: ' : 'E-postadress: '} {this.state.booty.email}</p>
        <p><i className="fas fa-home fontawesome"></i>{language === 'eng' ? 'City: ' : 'Stad: '} {this.state.booty.city}</p>
        <p><i className="fas fa-clock fontawesome"></i>{language === 'eng' ? 'Timezone: ' : 'Tidszon: '} {this.state.booty.timezone}</p>
      </div>
      </div>
    );
  }
}
