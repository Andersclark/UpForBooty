import React, { Component } from 'react';
import { Button, ButtonGroup, Label } from 'reactstrap';
import store from '../store';

export default class SortBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { sortBy: 'AVAILABILITY'};
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(selected) {        
        this.setState({ sortBy: selected });
        this.props.sortCallback(selected);
    }

    render() {  
    let language = store.getLanguage();
        return (
            <div>
                <Label className="logo" id="bold">{language === 'eng' ? 'Sort by: ' : 'Sortera efter: '}</Label>
                <ButtonGroup>                   
                    {this.props.search && <Button onClick={() => this.onRadioBtnClick('SEARCH')} active={this.state.sortBy === 'SEARCH' }>{language === 'eng' ? 'Best' : 'Bästa'}</Button>}
                    <Button onClick={() => this.onRadioBtnClick('FIRST_NAME')} active={this.state.sortBy === 'FIRST_NAME'}>{language === 'eng' ? 'First name' : 'Förnamn'}</Button>
                    <Button onClick={() => this.onRadioBtnClick('LAST_NAME')} active={this.state.sortBy === 'LAST_NAME'}>{language === 'eng' ? 'Last name' : 'Efternamn'}</Button>
                    <Button onClick={() => this.onRadioBtnClick('AVAILABILITY')} active={this.state.sortBy === 'AVAILABILITY'}>{language === 'eng' ? 'Availability' : 'Tillgänglighet'}</Button>
                    <Button onClick={() => this.onRadioBtnClick('TIME')} active={this.state.sortBy === 'TIME'}>{language === 'eng' ? 'Time' : 'Tid'}</Button>

                </ButtonGroup>
            </div>
        )
    }
}
