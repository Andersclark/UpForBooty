import React, { Component } from 'react';
import Slider from 'rc-slider';

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
    this.props.sliderCallback(value);
  }
  
  render() {
    return (
      <div>
        <label>Show people where time is between {this.state.value[0]}.00 and {this.state.value[1]}.00</label>
        <Range min={1} max={24} allowCross={false} value={this.state.value} onAfterChange={this.onSliderChange} onChange={this.onSliderChange} tipFormatter={value => `${value}`} />
      </div>
    );
  }
}
