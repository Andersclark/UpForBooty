import React, { Component } from 'react';
import axios from 'axios';
import {
  Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle,
} from 'reactstrap';


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
    return (
      <Row>
      <Col sm="3" md="3"></Col>
      <Col sm="6" md="5">
        <Card className="bootycard">
            <CardImg top width="100%" height="40%" src={"http://localhost:5000/img/" + this.state.booty.picture + ".jpg"} alt={this.state.booty.firstName + ' ' + this.state.booty.lastName + ' profile picture.'} />
            <CardBody>
              <CardTitle><h3>{this.state.booty.firstName} {this.state.booty.lastName}</h3></CardTitle>
            <CardText>
                <address>
                  <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <p> <i className="fas fa-phone-alt fontawesome"></i> Phone: <a href={"tel:"+this.state.booty.phoneNo}>+{this.state.booty.phoneNo}</a></p>
                  <p><i className="fab fa-skype fontawesome"></i> Skype: <a href={"skype:" + this.state.booty.skypeHandle}>{this.state.booty.skypeHandle}</a></p>
                  <p><i className="far fa-envelope-open fontawesome"></i> Email: <a href={"mailto:" + this.state.booty.email}>{this.state.booty.email}</a></p>
                  <p><i className="fas fa-home fontawesome"></i> Location: {this.state.booty.city}, {this.state.booty.country}</p>
                  <p><i className="fas fa-clock fontawesome"></i> Timezone: {this.state.booty.timezone}</p>
                </address>
              </CardText>
            </CardBody>
          </Card> 
      </Col>
      <Col sm="3" md="3"></Col>
      </Row>
    );
  }
}
