import React, { Component } from 'react';
import BootyList from './components/booty-list';
import SearchField from './components/search-field';
//import TimezoneDropdown from './components/timezone-dropdown';
import axios from 'axios';
import store from "./store";
import './App.css';
import moment from 'moment-timezone';
import Slider from './components/timezone-slider'
//import 'rc-slider/assets/index.css';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.readFromDB();
        this.state = { booties: [] };
    }

    readFromDB() {
        axios.get('http://localhost:5000/booty/')
            .then(response => {

                let dataWithTime = response.data.map(booty => {
                    booty.time = moment.tz(booty.timezone)
                    return booty;
                });
                store.saveToBooties(dataWithTime)
                this.setState({ booties: dataWithTime })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    searchCallback = (searchData) => {
        this.setState({ search: searchData })
    }

    render() {
        return (
            <div>
                <SearchField searchCallback={this.searchCallback} ></SearchField>
                {/* <TimezoneDropdown /> */}

                <Slider />
                <BootyList list={this.state.search ? this.state.search : this.state.booties} ></BootyList>
            </div>
        )
    }
}