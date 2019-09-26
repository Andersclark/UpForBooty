import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class TimezoneDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            times: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
            isOpen1: false,
            isOpen2: false,
        };

        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
    }

    onChangeHandler = (event) => {
      console.log('here');
    }

    toggle1() {
        this.setState(prevState => ({
            isOpen1: !prevState.isOpen1
        }));
      }
    
      toggle2() {
        this.setState(prevState => ({
            isOpen2: !prevState.isOpen2
        }));
      }

    timezoneList() {
            return this.state.times.map(current => {
                return <DropdownItem onClick={this.onChangeHandler} value={current} key={current}>{current}</DropdownItem>;
            });
    }

    render() {
        return (
            <div>
                <Dropdown isOpen={this.state.isOpen1} toggle={this.toggle1}>
                    <DropdownToggle caret>Start</DropdownToggle>
                    <DropdownMenu>{this.timezoneList()}</DropdownMenu>
                </Dropdown>

                <Dropdown isOpen={this.state.isOpen2} toggle={this.toggle2}>
                    <DropdownToggle caret>End</DropdownToggle>
                    <DropdownMenu>{this.timezoneList()}</DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}