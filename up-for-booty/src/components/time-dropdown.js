import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class TimezoneDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTimes: ['Start', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
            endTimes: ['End', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
            isOpen1: false,
            isOpen2: false,
            start: 'Start',
            end: 'End'
        };

        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
    }



    onChange = (event) => {
        let newRange = [];

        if (event.target.className === "startTime dropdown-item") {
            this.setState({
                start: event.target.value,
            });
            //if there is a selected time in both dropdows, return that as a number array to parent
            if (event.target.value !== 'Start' && this.state.end !== 'End') {
                newRange[0] = Number(event.target.value.substring(0, 2));
                newRange[1] = Number(this.state.end.substring(0, 2));
                this.props.timeDropdownCallback(newRange);
            }
            else{
                this.props.timeDropdownCallback(null);
            }
        }
        else if (event.target.className === "endTime dropdown-item") {
            this.setState({
                end: event.target.value,
            });
            //if there is a selected time in both dropdows, return that as a number array to parent
            if (event.target.value !== 'End' && this.state.start !== 'Start') {
                newRange[1] =  Number(event.target.value.substring(0, 2));
                newRange[0] = Number(this.state.start.substring(0, 2));
                this.props.timeDropdownCallback(newRange);
            }
            else{
                this.props.timeDropdownCallback(null);
            }
        }
        else {
            console.log('nope');
        }
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

    startTimeList() {
        return this.state.startTimes.map(current => {
            return <DropdownItem onClick={this.onChange} value={current} key={current} className="startTime">{current}</DropdownItem>;
        });
    }

    endTimeList() {
        return this.state.endTimes.map(current => {
            return <DropdownItem onClick={this.onChange} value={current} key={current} className="endTime">{current}</DropdownItem>;
        });
    }

    render() {
        return (
            <div>
                <Dropdown isOpen={this.state.isOpen1} toggle={this.toggle1}>
                    <DropdownToggle caret>{this.state.start}</DropdownToggle>
                    <DropdownMenu>{this.startTimeList()}</DropdownMenu>
                </Dropdown>

                <Dropdown isOpen={this.state.isOpen2} toggle={this.toggle2}>
                    <DropdownToggle caret>{this.state.end}</DropdownToggle>
                    <DropdownMenu>{this.endTimeList()}</DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}