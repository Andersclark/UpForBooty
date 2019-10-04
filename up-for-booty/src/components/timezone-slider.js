import React, { Component } from 'react';
import Slider from 'rc-slider';
import store from '../store';
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
      language: store.getLanguage()
    };
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

  onSliderChange = (value) => {
    this.setState({
      value
    });
    this.props.sliderCallback(value);
  }

  displaySliderTime() {
    if (this.state.language === 'eng') {
      let timeToDisplay = (this.state.value[0] > 12 ? (this.state.value[0] - 12) + ':00 PM - ' : this.state.value[0] + ':00 AM - ') + (this.state.value[1] > 12 ? (this.state.value[1] - 12) + ':00 PM' : this.state.value[1] + ':00 AM')
      return <label className="centerLabel">Showing booties between {timeToDisplay}</label>
    } else {
      let timeToDisplay = this.state.value[0] + ':00 - ' + this.state.value[1] + ':00'
      return <label className="centerLabel">Visar booties mellan {timeToDisplay}</label>
    };
  }

  render() {
    return (
      <div>
        <Range className="sliderWidth" min={1} max={24} allowCross={false} value={this.state.value} onAfterChange={this.onSliderChange} onChange={this.onSliderChange} tipFormatter={value => `${value}`} />
        {this.displaySliderTime()}
      </div>
    );
  }
}
