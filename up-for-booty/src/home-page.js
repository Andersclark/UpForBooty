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
import { Button, ButtonGroup } from 'reactstrap';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.readFromDB();
        this.state = { listToDisplay: [] };
    }

    readFromDB() {
        axios.get('http://localhost:5000/booty/')
            .then(response => {

                let dataWithTime = response.data.map(booty => {
                    booty.time = moment.tz(booty.timezone)
                    return booty;
                });
                store.saveToBooties(dataWithTime)
                this.setState({ listToDisplay: dataWithTime })
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
            console.log('tossing it to the sorting algorthm');
            console.log(this.state.sort);


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
                //to be built later yao!

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
        this.updateTime();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return (
            <div>
                <ButtonGroup>
                    <Button onClick={() => store.setLanguage('eng')}>English</Button>
                    <Button onClick={() => store.setLanguage('sve')}>Svenska</Button>
                </ButtonGroup>
                <SearchField searchCallback={this.searchCallback} ></SearchField>
                <Slider sliderCallback={this.sliderCallback} />
                <SortBtn search={this.state.search} sortCallback={this.sortCallback} />
                <BootyList list={this.state.listToDisplay} ></BootyList>
            </div>
        )
    }
}