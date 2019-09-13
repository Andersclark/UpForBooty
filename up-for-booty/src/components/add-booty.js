import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Button, Input } from 'reactstrap';

export default class AddBooty extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      phoneNo: '',
      skypeHandle: '',
      email: '',
      city: '',
      country: '',
      timezone: ''
    }
  }

  componentDidMount() {
    console.log('add booty mounted!')
  }

  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  onSubmit(e) {
    console.log('started submit');
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

    //window.location = '/';
  }

  render() {
    return (
      <Container className="App">
        <h2>Add a booty!</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>First name: </Label>
              <Input
                type="text"
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
              <Input
                type="text"
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
              <Input
                type="text"
                required
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>City: </Label>
              <Input
                type="text"
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
              <Input
                type="text"
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
              <Input
                type="text"
                required
                name="timezone"
                className="form-control"
                value={this.state.timezone}
                onChange={this.onChangeHandler}
              />
            </FormGroup>
          </Col>

          <Button onSubmit={this.onSubmit}>Add that booty</Button>
        </Form>
      </Container>
    );
  }
}
/*
          <div className="form-group">
            <Input type="submit" value="Add booty!" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
} */