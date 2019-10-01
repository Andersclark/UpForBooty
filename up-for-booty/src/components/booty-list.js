import React, { Component } from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import {
  Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Booty = props => (
      <Col sm="6" lg="3">
        <Card sm="6" lg="3" className="bootycard">
            <CardImg top width="100%" height="40%" src={"http://localhost:5000/img/" + props.booty.picture + ".jpg"} alt={props.booty.firstName + ' ' + props.booty.lastName + ' profile picture.'} />
            <CardBody>
              <CardTitle><h3 className="bootycardheader">{props.booty.firstName} {props.booty.lastName}</h3></CardTitle>
              <CardSubtitle><i>Location: {props.booty.timezone}</i></CardSubtitle>
              <CardSubtitle><i>Local time: {props.booty.time.format("HH:mm")}</i></CardSubtitle>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <Button color="info" route={"/view/" + props.booty._id}>View details</Button>
              
          
            </CardBody>
          </Card> 
      </Col>
)

export default class BootyList extends Component {

  bootyList() {
    return this.props.list.map(currentBooty => {
      return <Booty booty={currentBooty} key={currentBooty._id} />;
    })
  } 

  render() {
    return (
      <Row>
            { this.bootyList() }
      </Row>
    )
  }
}