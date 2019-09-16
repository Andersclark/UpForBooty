import React, { Component } from 'react';
import BootyList from './components/booty-list';
import SearchField from './components/search-field';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <SearchField></SearchField>
                <BootyList></BootyList>
            </div>
        )
    }
}