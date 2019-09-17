import React, { Component } from 'react';
import { Container, Col, Row, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import axios from 'axios';
import '../App.css';

export default class EditBootyDetails extends Component {
    constructor(props) {
        super(props);

        this.state = { booty: [] };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/booty/view/' + this.props.match.params.id)
            .then(response => {
                this.setState({ booty: response.data })
                console.log('This state',this.state);
            })
            .catch((error) => {
                console.log(error);
            })
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
            firstName: this.state.booty.firstName,
            lastName: this.state.booty.lastName,
            //phoneNo: this.state.booty.phoneNo,
            skypeHandle: this.state.booty.skypeHandle,
            //email: this.state.booty.email,
            city: this.state.booty.city,
            country: this.state.booty.country,
            timezone: this.state.booty.timezone
        };

        console.log('updated info ', booty)

        window.location = '/';
    }

    render() {
        return (
            <Container className="App">
                <h2>Update your booty!</h2>
                <Form className="form" onSubmit={(e) => this.onSubmit(e)}>
                    <Row form>
                        <Col className="colStyle">
                            <FormGroup>
                                <Label>First name: </Label>
                                <Input type="text" required name='firstName' className="form-control"
                                    value={this.state.booty.firstName}
                                    onChange={this.onChangeHandler}
                                />
                            </FormGroup>
                        </Col>

                        <Col className="colStyle">
                            <FormGroup>
                                <Label>Last name: </Label>
                                <Input type="text" required name="lastName" className="form-control"
                                    value={this.state.booty.lastName}
                                    onChange={this.onChangeHandler}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/*  <Col className="colStyle">
            <FormGroup>
              <Label>Skype handle: </Label>
              <Input type="text" required name="skypeHandle" className="form-control"
                value={this.state.booty.skypeHandle}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Col className="colStyle">
            <FormGroup>
              <Label>Email address: </Label>
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
              <Label>Phone number: </Label>
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
                <Label>City: </Label>
                <Input type="text" required name="city" className="form-control"
                  value={this.state.booty.city}
                  onChange={this.onChangeHandler}
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label>Country: </Label>
                <Input type="text" required name="country" className="form-control"
                  value={this.state.booty.country}
                  onChange={this.onChangeHandler}
                />
              </FormGroup>
            </Col>
          </Row>

          <Col className="colStyle">
            <FormGroup>
              <Label>Timezone</Label>
              <Input type="select" required name="timezone" className="form-control"
                value={this.state.booty.timezone}
                onChange={this.onChangeHandler}>
                <option>time 1</option>
                <option>time 2</option>
                <option>time 3</option>
                <option>time 4</option>
                <option>time 5</option>
              </Input>
            </FormGroup>
          </Col> */}

                    <Button>Change that booty</Button>
                </Form>
            </Container>
        );
    }
}