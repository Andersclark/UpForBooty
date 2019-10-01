import React, { Component } from 'react';
import BootyList from './components/booty-list';
import SearchField from './components/search-field';
import axios from 'axios';
import store from "./store";
import './App.css';
import moment from 'moment-timezone';
import Slider from './components/timezone-slider'
import SortBtn from './components/sort-btn'
import filter from './filter';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.readFromDB();
        this.state = { listToDisplay: [] , language: 'eng'};
    }

    readFromDB() {
        axios.get('http://localhost:5000/booty/')
            .then(response => {

                let dataWithTime = response.data.map(booty => {
                    booty.time = moment.tz(booty.timezone)
                    return booty;
                });

                //add status of the booties
                let dataWithStatus = dataWithTime.map(booty => {
                    //check working and sleeping hours 
                    let currTime = JSON.stringify(booty.time._d).substring(12, 14);

                    if (booty.atWorkTimes) {
                        if (currTime >= booty.atWorkTimes[0] && currTime < booty.atWorkTimes[1]) {
                            booty.status = 'WORK';
                        }
                    }

                    if (booty.asleepTimes) {
                        if (currTime >= booty.asleepTimes[0] && currTime < booty.asleepTimes[1]) {
                            booty.status = 'SLEEP'
                        }
                    }

                    return booty;
                });

                //sort the list on default (availability)
                dataWithStatus = this.sort(dataWithStatus, 'AVAILABILITY')
                //save and set the state
                store.saveToBooties(dataWithStatus)
                this.setState({ listToDisplay: dataWithStatus })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    searchCallback = (searchValue) => {
        let newList = filter({
            search: searchValue,
            slider: this.state.slider
        });

        //sort the list
        if (this.state.sort && this.state.sort !== 'SEARCH') {
            newList = this.sort(newList, this.state.sort);
        }

        this.setState({ search: searchValue, listToDisplay: newList });
    }

    sliderCallback = (sliderValue) => {
        let newList = filter({
            search: this.state.search,
            slider: sliderValue
        });

        //sort the list
        if (this.state.sort) {
            newList = this.sort(newList, this.state.sort);
        }

        this.setState({ slider: sliderValue, listToDisplay: newList });

    }

    sortCallback = (selected) => {
        let sortedList = this.sort(this.state.listToDisplay, selected);
        this.setState({ sort: selected, listToDisplay: sortedList })
    }

    sort(list, selected) {
        //sort the list
        switch (selected) {

            case 'FIRST_NAME':
                list.sort(function (a, b) {
                    return a.firstName.localeCompare(b.firstName);
                })
                break;
            case 'LAST_NAME':
                list.sort(function (a, b) {
                    return a.lastName.localeCompare(b.lastName);
                })
                break;
            case 'SEARCH':
                //redo the search to get best serchresult highest up
                list = filter({
                    search: this.state.search,
                    slider: this.state.slider,
                });
                break;
            case 'AVAILABILITY':
                let working = list.filter(booty => booty.status === 'WORK' )                
                let sleeping = list.filter(booty => booty.status === 'SLEEP' )
                let available = list.filter(booty => booty.status !== 'SLEEP' && booty.status !== 'WORK' )
                list = available.concat(sleeping, working);

                break;
            case 'TIME':
                list.sort(function (a, b) {
                    return JSON.stringify(a.time._d).substring(12, 14) - JSON.stringify(b.time._d).substring(12, 14)
                })
                break;
            default:
                list.sort(function (a, b) {
                    return a.firstName.localeCompare(b.firstName);
                })
                break;
        }
        return list;
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async updateTime() {
        while (this._isMounted) {
            let newBooties = this.state.listToDisplay.slice();
            for (let booty of newBooties) {
                booty.time = moment(booty.time).add(5000, "ms")
            }
            this.setState({ booties: newBooties });
            await this.sleep(5000);
        }
    }
    componentDidMount() {
        this._isMounted = true;

        //the method to react on store changes
        this.languageChange = (lang) => this.setState({language : lang});
        //subscribe to store 
        store.subscribeToChanges(this.languageChange)

        //update time
        this.updateTime();
    }
    componentWillUnmount() {
        this._isMounted = false;
        store.unsubscribeToChanges(this.languageChange);
    }
    
    render() {
        return (
            <div>
                <SearchField searchCallback={this.searchCallback} ></SearchField>
                <Slider className="bootyslider" sliderCallback={this.sliderCallback} />
                <SortBtn search={this.state.search} sortCallback={this.sortCallback} />
                <BootyList list={this.state.listToDisplay} ></BootyList>
            </div>
        )
    }
}