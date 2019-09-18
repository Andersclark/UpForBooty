import React, { Component } from 'react';
import BootyList from './components/booty-list';
import SearchField from './components/search-field';
import axios from 'axios';
import store from "./store";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.readFromDB();
        this.state = {booties: []};
    }

    readFromDB() {
        axios.get('http://localhost:5000/booty/')
            .then(response => {
                store.saveToBooties(response.data)
                this.setState({booties: response.data})
            })
            .catch((error) => {
                console.log(error);
            });

        console.log("läser in db och sparar till store");
    }

    searchCallback = (searchData) => {
        this.setState({search: searchData })
    }

    render() {       
        return (
            <div>
                <SearchField searchCallback = {this.searchCallback} ></SearchField>
                <BootyList list = {this.state.search ? this.state.search: this.state.booties} ></BootyList>
            </div>
        )
    }
}