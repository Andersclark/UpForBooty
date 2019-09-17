import React, { Component } from 'react';
import BootyList from './components/booty-list';
import SearchField from './components/search-field';
import axios from 'axios';
import store from "./store";

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
                <SearchField></SearchField>
                <BootyList></BootyList>
            </div>
        )
    }
}