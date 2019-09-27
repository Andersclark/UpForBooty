import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class TimezoneDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            times: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
            isOpen1: false,
            isOpen2: false,
            start: 'Start',
            end: 'End',
            sleepRange: []
        };

        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.sleepRange !== prevProps.sleepRange) {
            this.fetchData(this.props.sleepRange);
        }
        this.props.timeDropdownCallback(this.state.sleepRange);
    }


    onChange = (event) => {
        if (event.target.className === "startTime dropdown-item") {
            const newRange = this.state.sleepRange.slice() ;
            newRange[0] = event.target.value;
            this.setState({
                start: event.target.value,
                sleepRange: newRange
            });
        }
        else if (event.target.className === "endTime dropdown-item") {
            const newRange = this.state.sleepRange.slice() ;
            newRange[1] = event.target.value;
            this.setState({
                end: event.target.value,
                sleepRange: newRange
            });
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
        return this.state.times.map(current => {
            return <DropdownItem onClick={this.onChange} value={current} key={current} className="startTime">{current}</DropdownItem>;
        });
    }

    endTimeList() {
        return this.state.times.map(current => {
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