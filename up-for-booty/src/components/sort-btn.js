import React, { Component } from 'react';
import { Button, ButtonGroup, Label } from 'reactstrap';
import store from '../store';

export default class SortBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { sortBy: 'AVAILABILITY', language: store.getLanguage()};
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
        //the method to react on store changes
        this.languageChange = (lang) => this.setState({ language: lang });
        //subscribe to store 
        store.subscribeToChanges(this.languageChange)
      }
      componentWillUnmount() {
        this._isMounted = false;
        store.unsubscribeToChanges(this.languageChange);
      }

    onRadioBtnClick(selected) {        
        this.setState({ sortBy: selected });
        this.props.sortCallback(selected);
    }

    render() {  
        return (
            <div>
                <h3 className="bootyheader" id="bold">{this.state.language === 'eng' ? 'Sort by: ' : 'Sortera efter: '}</h3>
                <ButtonGroup>                   
                    {this.props.search && <Button onClick={() => this.onRadioBtnClick('SEARCH')} active={this.state.sortBy === 'SEARCH' }>{this.state.language === 'eng' ? 'Top Results' : 'Bästa Sökresultat'}</Button>}
                    <Button color="info" onClick={() => this.onRadioBtnClick('FIRST_NAME')} active={this.state.sortBy === 'FIRST_NAME'}>{this.state.language === 'eng' ? 'First name' : 'Förnamn'}</Button>
                    <Button color="info" onClick={() => this.onRadioBtnClick('LAST_NAME')} active={this.state.sortBy === 'LAST_NAME'}>{this.state.language === 'eng' ? 'Last name' : 'Efternamn'}</Button>
                    <Button color="info" onClick={() => this.onRadioBtnClick('AVAILABILITY')} active={this.state.sortBy === 'AVAILABILITY'}>{this.state.language === 'eng' ? 'Availability' : 'Tillgänglighet'}</Button>
                    <Button color="info" onClick={() => this.onRadioBtnClick('TIME')} active={this.state.sortBy === 'TIME'}>{this.state.language === 'eng' ? 'Time' : 'Tid'}</Button>

                </ButtonGroup>
            </div>
        )
    }
}
