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
                <Label className="logo" id="bold">Sort By  </Label>
                <ButtonGroup>                   
                    {this.props.search && <Button onClick={() => this.onRadioBtnClick('SEARCH')} active={this.state.sortBy === 'SEARCH' }>Best Search Result</Button>}
                    <Button onClick={() => this.onRadioBtnClick('FIRST_NAME')} active={this.state.sortBy === 'FIRST_NAME'}>First Name</Button>
                    <Button onClick={() => this.onRadioBtnClick('LAST_NAME')} active={this.state.sortBy === 'LAST_NAME'}>Last Name</Button>
                    <Button onClick={() => this.onRadioBtnClick('AVAILABILITY')} active={this.state.sortBy === 'AVAILABILITY'}>Availability</Button>
                    <Button onClick={() => this.onRadioBtnClick('TIME')} active={this.state.sortBy === 'TIME'}>Time</Button>

                </ButtonGroup>
            </div>
        )
    }
}
