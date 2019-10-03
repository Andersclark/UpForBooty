import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {
  Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
    this.languageChange = (lang) => this.setState({ language: lang });
    store.subscribeToChanges(this.languageChange)
  }
  componentWillUnmount() {
    this._isMounted = false;
    store.unsubscribeToChanges(this.languageChange);
  }

  displayWorkTimes() {
    if (this.state.booty.atWorkTimes && this.state.booty.atWorkTimes.length > 0) {
      let timeToDisplay = this.state.booty.atWorkTimes[0] + ':00 - ' + this.state.booty.atWorkTimes[1] + ':00'
      return <p className="pMargin"><i className="fas fa-briefcase fontawesomeDetails"></i>Working Hours: {timeToDisplay}</p>
    }
  }

  displaySleepTimes() {
    if (this.state.booty.asleepTimes && this.state.booty.asleepTimes.length > 0) {
      let timeToDisplay = this.state.booty.asleepTimes[0] + ':00 - ' + this.state.booty.asleepTimes[1] + ':00'
      return <p className="pMargin"><i className="fas fa-bed fontawesomeDetails"></i>Sleeping Hours: {timeToDisplay}</p>
    }
  }

  render() {
    return (
      <Row>
        <Col sm="3" md="3"></Col>
        <Col sm="6" md="5">
          <Card className="bootycard">
            <CardImg top width="100%" height="40%" src="https://1.bp.blogspot.com/-1uQRYMklACU/ToQ6aL-5uUI/AAAAAAAAAgQ/9_u0922cL14/s1600/cute-puppy-dog-wallpapers.jpg" />
            <CardBody>
              <CardTitle><h3 className="bootydetailsheader">{this.state.booty.firstName} {this.state.booty.lastName}</h3></CardTitle>
              <CardText>
                <a href="tel:{this.state.booty.phoneNo}" className="blackText"><i className="fas fa-phone-alt fontawesomeDetails"></i>  {this.state.language === 'eng' ? 'Phone number: ' : 'Telefonnummer: '} {this.state.booty.phoneNo}</a>
                <br></br><a href="https://www.skype.com/sv/" className="blackText"><i className="fab fa-skype fontawesomeDetails"> </i>  Skype: {this.state.booty.skypeHandle}</a>
                <br></br><a href="mailto:{this.state.booty.email}" className="blackText"><i className="far fa-envelope-open fontawesomeDetails">  </i>  {this.state.language === 'eng' ? 'Email: ' : 'E-postadress: '}{this.state.booty.email}</a>
                <br></br> <i className="fas fa-home fontawesomeDetails"></i>  {this.state.language === 'eng' ? 'City: ' : 'Stad: '} {this.state.booty.city}
                <br></br> <i className="fas fa-clock fontawesomeDetails"></i>  {this.state.language === 'eng' ? 'Timezone: ' : 'Tidszon: '} {this.state.booty.timezone}
                {this.displayWorkTimes()}
                {this.displaySleepTimes()}
                <Button className="editBtn"><Link to={"/edit/" + this.state.booty._id} className="linkColor">{this.state.language === 'eng' ? 'Edit' : 'Redigera'}</Link></Button>
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3" md="3"></Col>
      </Row>
    );
  }
}
