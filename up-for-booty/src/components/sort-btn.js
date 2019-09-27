import React, { Component } from 'react';
import { Button, ButtonGroup, Label } from 'reactstrap';

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
        return (
            <div>
                <h3 className="bootyheader" id="bold">Sort By...</h3>
                <ButtonGroup>                   
                    {this.props.search && <Button onClick={() => this.onRadioBtnClick('SEARCH')} active={this.state.sortBy === 'SEARCH' }>Best</Button>}
                    <Button color="info" onClick={() => this.onRadioBtnClick('FIRST_NAME')} active={this.state.sortBy === 'FIRST_NAME'}>Firstname</Button>
                    <Button color="info"onClick={() => this.onRadioBtnClick('LAST_NAME')} active={this.state.sortBy === 'LAST_NAME'}>Lastname</Button>
                    <Button color="info" onClick={() => this.onRadioBtnClick('AVAILABILITY')} active={this.state.sortBy === 'AVAILABILITY'}>Availability</Button>
                    <Button color="info"onClick={() => this.onRadioBtnClick('TIME')} active={this.state.sortBy === 'TIME'}>Time</Button>
                </ButtonGroup>
            </div>
        )
    }
}
