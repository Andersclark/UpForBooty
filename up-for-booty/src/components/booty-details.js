import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import {
  Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle,
} from 'reactstrap';


export default class BootyDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { booty: [], language: store.getLanguage() };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/booty/view/' + this.props.match.params.id)
      .then(response => {
        this.setState({ booty: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

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
      <Row>
         <Col sm="3" md="3"></Col>
         <Col sm="6" md="5">
         <Card className="bootycard">
         <CardImg top width="100%" height="40%" src={"http://localhost:5000/img/" + this.state.booty.picture + ".jpg"}/>
         <CardBody>
         <CardTitle>{this.state.booty.firstName} {this.state.booty.lastName}</CardTitle>
         <CardText>
            <p><i className="fas fa-phone-alt fontawesome"></i>{this.state.language === 'eng' ? 'Phone number: ' : 'Telefonnummer: '} {this.state.booty.phoneNo}</p>
          <a href="https://www.skype.com/sv/"><p><i className="fab fa-skype fontawesome"></i>Skype: {this.state.booty.skypeHandle}</p></a>
          <p><i className="far fa-envelope-open fontawesome"></i>{this.state.language === 'eng' ? 'Email: ' : 'E-postadress: '} {this.state.booty.email}</p>
          <p><i className="fas fa-home fontawesome"></i>{this.state.language === 'eng' ? 'City: ' : 'Stad: '} {this.state.booty.city}</p>
          <p><i className="fas fa-clock fontawesome"></i>{this.state.language === 'eng' ? 'Timezone: ' : 'Tidszon: '} {this.state.booty.timezone}</p>
          </CardText>
        </CardBody>
        </Card>
      </Col>
      <Col sm="3" md="3"></Col>
      </Row>
          
    );
  }
}
