import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import {
  Row, Col, Card, CardImg, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
// {"http://localhost:5000/img/" + props.booty.picture + ".jpg"}
const Booty = props => (
      <Col sm="6" lg="3">
        <Link to={"/view/" + props.booty._id}>
        <Card sm="6" lg="3" className="bootycard">
            <CardImg top className="bootycardimg" src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.i-love-pugs.com%2Fimages%2FPugFaceReduced.jpg&f=1&nofb=1" alt={props.booty.firstName + ' ' + props.booty.lastName + ' profile picture.'} />
            <CardBody>
              <CardTitle><h3 className="bootycardheader">{props.booty.firstName} {props.booty.lastName}</h3></CardTitle>
              <CardSubtitle><i>{props.booty.timezone}</i> <i>{props.booty.time.format("HH:mm")}</i></CardSubtitle>  
            </CardBody>
          </Card> 
          </Link>
      </Col>
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
        <Row>
            { this.bootyList() }
        </Row>
    )
  }
}