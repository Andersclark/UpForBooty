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
import SortBtn from './components/sort-btn'
import filter from './filter';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.readFromDB();
        this.state = {listToDisplay: []};
    }

    readFromDB() {
        axios.get('http://localhost:5000/booty/')
            .then(response => {

                let dataWithTime = response.data.map(booty => {
                    booty.time = moment.tz(booty.timezone)
                    return booty;
                });
                store.saveToBooties(dataWithTime)
                this.setState({ defaultList: dataWithTime, listToDisplay: dataWithTime })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    searchCallback = (searchValue) => {
        let newList = filter({
            search: searchValue,
            slider: this.state.slider,
        });
        //deal with sorting

        this.setState({ search: searchValue, defaultList: newList, listToDisplay: newList });
    }

    sliderCallback = (sliderValue) => {
        let newList = filter({
            search: this.state.search,
            slider: sliderValue,
        });
        //deal with sorting

        this.setState({ slider: sliderValue, defaultList: newList, listToDisplay: newList });

    }

    sortCallback = (sortedList) => {
        if (sortedList) {
            console.log('sorterad lista');

            this.setState({ listToDisplay: sortedList })
        }
        else {
            console.log('verkar inte finnas en sorterad lista');
            console.log(this.state.defaultList);
            
            this.setState({ listToDisplay: this.state.defaultList })
        }
    }

    render() {
        return (
            <div>
                <SearchField searchCallback={this.searchCallback} ></SearchField>
                <Slider sliderCallback={this.sliderCallback} />
                <SortBtn defaultList={this.state.defaultList} sortCallback={this.sortCallback} />
                <BootyList list={this.state.listToDisplay} ></BootyList>
            </div>
        )
    }
}