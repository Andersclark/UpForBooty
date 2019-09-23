import React, { Component } from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range)

function log(value) {
  console.log(value); 
}

export default class TimezoneSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: 1,
      upperBound: 24,
      value: [1, 24],
    };
  }
  onLowerBoundChange = (e) => {
    this.setState({ lowerBound: +e.target.value });
  }
  onUpperBoundChange = (e) => {
    this.setState({ upperBound: +e.target.value });
  }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }
  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  }
  render() {
    return (
      <div>
        <label>Choose a time!</label>
        <Range min={1} max={24} allowCross={false} value={this.state.value} onChange={this.onSliderChange} tipFormatter={value => `${value}`} />
      </div>
    );
  }
}