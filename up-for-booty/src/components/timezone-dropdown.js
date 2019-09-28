import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import store from '../store';

export default class TimezoneDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booties: [],
            dropdownOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        this.storeSubscriber = (...x) => this.reactOnStoreChanges(...x);
        store.subscribeToChanges(this.storeSubscriber)
    }

    reactOnStoreChanges(newBooties) {
        this.setState({ booties: newBooties })
    }

    componentWillUnmount() {
        this._isMounted = false;
        store.unsubscribeToChanges(this.storeSubscriber);
    }

    timezoneList() {
        if (this.state.booties) {
            let unique = [...new Set(this.state.booties.map(booty => booty.timezone))].sort();

            return unique.map(current => {
                return <DropdownItem onClick={this.onChangeHandler} value={current}>{current}</DropdownItem>;
            });
        }
        else (console.log('fuck'))
    }

    onChangeHandler = (event) => {
        console.log(event.target.value)
        let zoneChoice = event.target.value;

        let filtered = [];
        for (let i = 0; i < this.state.booties.length; i++) {
            if (this.state.booties[i].timezone === zoneChoice) {
                filtered.push(this.state.booties[i]);
            }
        }
        console.log(filtered);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>Timezone</DropdownToggle>
                <DropdownMenu>
                    {this.timezoneList()}
                </DropdownMenu>
            </Dropdown>
        );
    }
}