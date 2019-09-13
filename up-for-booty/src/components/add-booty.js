import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Button, Input } from 'reactstrap';

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
        phoneNoState: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log('add booty mounted!')
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
    if(phoneRegex.test(e.target.value)) {
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

    console.log('submitted ', booty)

    window.location = '/';
  }

  render() {
    return (
      <Container className="App">
        <h2>Add a booty!</h2>
        <Form className="form" onSubmit={(e) => this.onSubmit(e)}>
          <Col>
            <FormGroup>
              <Label>First name: </Label>
              <Input type="text"
                required
                name='firstName'
                className="form-control"
                value={this.state.firstName}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Last name: </Label>
              <Input type="text"
                required
                name="lastName"
                className="form-control"
                value={this.state.lastName}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Skype handle: </Label>
              <Input type="text"
                required
                name="skypeHandle"
                className="form-control"
                value={this.state.skypeHandle}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Email address: </Label>
              <Input type="text"
                required
                name="email"
                className="form-control"
                value={this.state.email}
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-fail' }
                onChange={(e) => {
                  this.validateEmail(e)
                  this.onChangeHandler(e)
                }}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Phone number: </Label>
              <Input type="text"
                required
                name="phoneNo"
                className="form-control"
                value={this.state.phoneNo}
                valid={ this.state.validate.phoneNoState === 'has-success' }
                invalid={ this.state.validate.phoneNoState === 'has-fail' }
                onChange={(e) => {
                  this.validatePhoneNo(e)
                  this.onChangeHandler(e)
                }}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>City: </Label>
              <Input type="text"
                required
                name="city"
                className="form-control"
                value={this.state.city}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Country: </Label>
              <Input type="text"
                required
                name="country"
                className="form-control"
                value={this.state.country}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Timezone: </Label>
              <Input type="text"
                required
                name="timezone"
                className="form-control"
                value={this.state.timezone}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Button>Add that booty</Button>
        </Form>
      </Container>
    );
  }
}