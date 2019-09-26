import React, { Component } from 'react';
import './analogclock.css';

export default class Analogclock extends Component {
  
  initClock() {
    // Get the local time using JS
    const date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
  
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
    // Loop through each of these hands to set their angle
    for (let j = 0; j < hands.length; j++) {
      let elements = document.querySelectorAll('.' + hands[j].hand);
      for (let k = 0; k < elements.length; k++) {
          elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
          elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
          // If this is a minute hand, note the seconds position (to calculate minute position later)
          if (hands[j].hand === 'minutes') {
            elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
          }
      }
    }
  }
  componentDidMount(){
    this.initClock()
  }
  componentWillUnmount(){
    //kill interval
  }
  render(){
    return (
      <div>
          <h1>A CLOCK</h1>
          <div className="clockface">
            <div className="minutsecontainer">
              <div className="minutehand"></div>
            </div>
            <div classname="hourscontainer">
              <div className="hourhand"></div>
            </div>
            <div class="secondscontainer">
              <div class="secondhand"></div>
            </div>
          </div>
      </div>
    );

    
  }
}