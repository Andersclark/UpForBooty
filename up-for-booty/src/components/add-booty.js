import React, { Component } from 'react';
import { Container, Col, Row, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import axios from 'axios';
import store from "../store";
import '../App.css';

export default class AddBooty extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      phoneNo: '',
      skypeHandle: '',
      email: '',
      city: '',
      country: '',
      timezone: '',
      validate: {
        emailState: '',
        phoneNoState: '',
        country: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.indivBooty !== this.props.indivBooty) {
      this.setState({
        firstName: this.props.indivBooty.firstName,
        lastName: this.props.indivBooty.lastName,
        phoneNo: this.props.indivBooty.phoneNo,
        skypeHandle: this.props.indivBooty.skypeHandle,
        email: this.props.indivBooty.email,
        city: this.props.indivBooty.city,
        timezone: this.props.indivBooty.timezone,
      });
    };
  }

  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  validateEmail(e) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRegex.test(e.target.value)) {
      validate.emailState = 'has-success'
    } else {
      validate.emailState = 'has-fail'
    }
    this.setState({ validate })
  }

  validatePhoneNo(e) {
    const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,})$/;
    const { validate } = this.state;
    if (phoneRegex.test(e.target.value)) {
      validate.phoneNoState = 'has-success'
    }
    else {
      validate.phoneNoState = 'has-fail'
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const booty = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNo: this.state.phoneNo,
      skypeHandle: this.state.skypeHandle,
      email: this.state.email,
      city: this.state.city,
      country: this.state.country,
      timezone: this.state.timezone
    };

    //if props came from the edit booty component, then send an update request, else add a new booty
    if (this.props.indivBooty) {
      axios.put('http://localhost:5000/booty/update/' + this.props.indivBooty._id, booty)
        .then(res => console.log(res.data));
    }
    else {
      axios.post('http://localhost:5000/booty/add', booty)
        .then(res => console.log(res.data));
    }

    window.location = '/';
  }

  render() {
    let language = store.getLanguage();
    return (
      <Container className="App">
        <h2 className="logo">{this.props.indivBooty ? language === 'eng' ? 'Edit a booty' : 'Redigera en booty' : language === 'eng' ? 'Add a booty' : 'Lägg till en booty'}</h2>
       
       <Form className="form" onSubmit={(e) => this.onSubmit(e)}>
          <Row form>
            <Col className="colStyle">
              <FormGroup>
                <Label>{language === 'eng' ? 'First name:' : 'Förnamn:'}</Label>
                <Input type="text" required name='firstName' className="form-control"
                  value={this.state.firstName}
                  onChange={this.onChangeHandler}
                />
              </FormGroup>
            </Col>

            <Col className="colStyle">
              <FormGroup>
                <Label>{language === 'eng' ? 'Last name:' : 'Efternamn:'}</Label>
                <Input type="text" required name="lastName" className="form-control"
                  value={this.state.lastName}
                  onChange={this.onChangeHandler}
                />
              </FormGroup>
            </Col>
          </Row>

          <Col className="colStyle">
            <FormGroup>
              <Label>Skype</Label>
              <Input type="text" required name="skypeHandle" className="form-control"
                value={this.state.skypeHandle}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Col className="colStyle">
            <FormGroup>
              <Label>{language === 'eng' ? 'Email address:' : 'E-postadress:'}</Label>
              <Input type="text" required name="email" className="form-control"
                value={this.state.email}
                valid={this.state.validate.emailState === 'has-success'}
                invalid={this.state.validate.emailState === 'has-fail'}
                onChange={(e) => {
                  this.validateEmail(e)
                  this.onChangeHandler(e)
                }}
              />
            </FormGroup>
          </Col>

          <Col className="colStyle">
            <FormGroup>
              <Label>{language === 'eng' ? 'Phone number:' : 'Telefonnummer:'}</Label>
              <Input type="text" required name="phoneNo" className="form-control"
                value={this.state.phoneNo}
                valid={this.state.validate.phoneNoState === 'has-success'}
                invalid={this.state.validate.phoneNoState === 'has-fail'}
                onChange={(e) => {
                  this.validatePhoneNo(e)
                  this.onChangeHandler(e)
                }}
              />
            </FormGroup>
          </Col>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>{language === 'eng' ? 'City:' : 'Stad:'}</Label>
                <Input type="text" required name="city" className="form-control"
                  value={this.state.city}
                  onChange={this.onChangeHandler}
                />
              </FormGroup>
            </Col>
          </Row>

          <Button>{language === 'eng' ? 'Submit' : 'Godkänn'}</Button>
        </Form>
      </Container>
    );
  }
}