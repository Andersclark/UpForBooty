import React, { Component } from 'react';
import BootyList from './components/booty-list';
import SearchField from './components/search-field';
import TimezoneDropdown from './components/timezone-dropdown';
import axios from 'axios';
import store from "./store";
import './App.css';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.readFromDB();
    }

    readFromDB() {
        axios.get('http://localhost:5000/booty/')
            .then(response => {
                store.saveToBooties(response.data)
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