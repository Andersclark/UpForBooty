import React, { Component } from 'react';
import BootyList from './components/booty-list';
import SearchField from './components/search-field';
import TimezoneDropdown from './components/timezone-dropdown';
import axios from 'axios';
import store from "./store";
import './App.css';
import moment from 'moment-timezone';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.readFromDB();
    }

    readFromDB() {
        axios.get('http://localhost:5000/booty/')
            .then(response => {
            
                let dataWithTime = response.data.map(booty => {
                    booty.time = moment.tz(booty.timezone)
                    return booty;
                });
                store.saveToBooties(dataWithTime)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <SearchField />
                <TimezoneDropdown />
                <BootyList></BootyList>
            </div>
        )
    }
}