import { useState } from 'react';
import axios from 'axios';
import './App.css';

const useBootyForm = () => {

    
    const [values, setValues] = useState({
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
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const booty = {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNo: values.phoneNo,
            skypeHandle: values.skypeHandle,
            email: values.email,
            city: values.city,
            country: values.country,
            timezone: values.timezone
        };
        
        axios.post('http://localhost:5000/booty/add', booty)
        .then(res => console.log(res.data));
        
        console.log('submitted ', booty)
        
        window.location = '/';
    }
    
    const handleChange = (e) => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    };
    
    const handleValidateEmail = (e) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = values;
        if (emailRegex.test(e.target.value)) {
            handleChange(e);
            document.getElementById('errorEmail').style.display = 'none';
        } else {
            document.getElementById('errorEmail').style.display = 'block';
        }
    };

    const handleValidatePhoneNo = (e) => {
        const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,})$/;
        const { validate } = values;
        if (phoneRegex.test(e.target.value)) {
            handleChange(e);
            document.getElementById('errorPhone').style.display = 'none';
        }
        else {
            document.getElementById('errorPhone').style.display = 'block';
        }
    };

    return {
        handleChange,
        handleSubmit,
        handleValidateEmail,
        handleValidatePhoneNo,
        values,
    }
};

export default useBootyForm;