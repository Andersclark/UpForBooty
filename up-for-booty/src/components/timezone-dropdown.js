import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import store from '../store';

export default class TimezoneDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = { booties: [] };

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
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
                return <DropdownItem>{current}</DropdownItem>;
            });
        }
        else (console.log('fuck'))
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