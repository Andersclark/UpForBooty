import React, { Component } from 'react';
import { Button, ButtonGroup, Label } from 'reactstrap';

export default class SortBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { sortBy: 'DEFAULT'};
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(selected) {        
        this.setState({ sortBy: selected });
        let sortedList= this.props.defaultList;       

        //sort the list
        switch (selected) {
            case 'FIRST_NAME': 
                sortedList.sort(function(a,b){
                    return a.firstName.localeCompare(b.firstName);
                })
                this.props.sortCallback(sortedList);

                break;
            case 'LAST_NAME':
                    sortedList.sort(function(a,b){
                        return a.lastName.localeCompare(b.lastName);
                    })
                    this.props.sortCallback(sortedList);

                break;
            default:
                this.props.sortCallback(null);
                break;
        }
    }

    render() {        
        return (
            <div>
                <Label className="logo" id="bold">Sort By  </Label>
                <ButtonGroup>
                    <Button onClick={() => this.onRadioBtnClick('FIRST_NAME')} active={this.state.sortBy === 'FIRST_NAME'}>First Name</Button>
                    <Button onClick={() => this.onRadioBtnClick('LAST_NAME')} active={this.state.sortBy === 'LAST_NAME'}>Last Name</Button>
                    <Button onClick={() => this.onRadioBtnClick('DEFAULT')} active={this.state.sortBy === 'DEFAULT'}>Best Default</Button>
                </ButtonGroup>
            </div>
        )
    }
}
