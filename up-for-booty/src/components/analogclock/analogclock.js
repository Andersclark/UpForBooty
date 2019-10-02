import React, { Component } from 'react';
import './analogclock.css';

const Minutehand = (props) => ( <div style = {{ transform: [{rotate: props.angle + 'deg'}] }} className="minutehand"></div>)
const Hourhand = (props) => ( <div style = {{ transform: [{rotate: (90 + 'deg') }] }} className="hourhand"></div>)
const Secondhand = (props) => (<div style = {{ transform: [{rotate: props.angle + 'deg'}] }} className="secondhand"></div>)


export default class Analogclock extends Component {

  constructor(props){
    super(props);
    this.state={MinAngle: null, HourAngle: null , SecAngle : null}
  }
  
  clockHands() {
    return (
      <div>
        <div className="clockface">
          <div className="minutsecontainer">
            <Minutehand  angle = {this.state.MinAngle}/>
          </div>
          <div className="hourscontainer">
            <Hourhand angle = {this.state.HourAngle}/>
          </div>
          <div className="secondscontainer">
            <Secondhand angle = {this.state.SecAngle}/>
          </div>
        </div>
      </div>)
  }
  
  
  initClock() {    
    let elements =  [Minutehand, Hourhand, Secondhand]
    // Construct date from moment-prop
    let date = this.props.time;
    let seconds = date.format("ss");
    let minutes = date.format("mm");
    let hours = date.format("hh");

    let hands = [
      {
        hand: 'hourhand',
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: 'minutehand',
        angle: (minutes * 6)
      },
      {
        hand: 'secondhand',
        angle: (seconds * 6)
      }
    ];

      this.setState({MinAngle: hands[1].angle , HourAngle: hands[0].angle  , SecAngle : hands[2].angle })
      /*  
      // If this is a minute hand, note the seconds position (to calculate minute position later)
        if (hands[j].hand === 'minutes') {
          elements[j].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
        }
        */
    
    
    
/*
    // Loop through each of these hands to set their angle
    for (let j = 0; j < hands.length; j++) {
      let elements = document.querySelectorAll('.' + hands[j].hand);

      for (let k = 0; k < elements.length; k++) {
        elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
        elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
        // If this is a minute hand, note the seconds position (to calculate minute position later)
        if (hands[j].hand === 'minutes') {
          elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
        }
      }
    }*/
  }
  componentDidMount() {
    this.initClock()
  }
  componentWillUnmount() {
    //kill interval
  }
  render() {
    return (
      <div>
        {this.clockHands()}
      </div>
    );


  }
}