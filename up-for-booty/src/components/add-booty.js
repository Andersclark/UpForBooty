import React, { Component } from 'react';
//import axios from 'axios';
import '../App.css';
import BootyForm from '../BootyForm';


export default class AddBooty extends Component {
  constructor(props) {
    super(props);

   /*  this.state = {
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

    this.onSubmit = this.onSubmit.bind(this); */
  }

  /* onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  } */

/*   validateEmail(e) {
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

    axios.post('http://localhost:5000/booty/add', booty)
      .then(res => console.log(res.data));

    console.log('submitted ', booty)

    window.location = '/';
  } */

  render() {
    return (
        <BootyForm />
    );
  }
}