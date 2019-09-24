import React, { Component } from 'react';
import Slider from 'rc-slider';
import store from "../store";

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range)

export default class TimezoneSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: 1,
      upperBound: 24,
      value: [1, 24],
    };
  }

  onSliderChange = (value) => {
    this.setState({
      value
    });
    this.filterByTime();
  }

  filterByTime() {
    let listOfAll = store.getBooties();
    let filteredList = [];
    
    for(let i = 0; i < listOfAll.length; i++) {
      let currTime = JSON.stringify(listOfAll[i].time._d).substring(12, 14);

      console.log('bounds',this.state.value[0], this.state.value[1]);
      if(currTime >= this.state.value[0] && currTime <= this.state.value[1]) {
        filteredList.push(listOfAll[i]);
      }
    }

    this.props.searchCallback(filteredList);
  }
  
  render() {
    return (
      <div>
        <label>Choose a time!</label>
        <Range min={1} max={24} allowCross={false} value={this.state.value} onAfterChange={this.onSliderChange} onChange={this.onSliderChange} tipFormatter={value => `${value}`} />
      </div>
    );
  }
}
