import React, { Component } from 'react';
import BootyList from './components/booty-list';
import SearchField from './components/search-field';
import axios from 'axios';
import store from "./store";
import moment from 'moment-timezone'

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
                <SearchField></SearchField>
                <BootyList></BootyList>
            </div>
        )
    }
}