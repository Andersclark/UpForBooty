import React, { Component } from 'react';

export default class Icon extends Component {

    status(){
        let icon ;
        switch (this.props.status) {
            case 'SLEEP':
                icon= <span role="img" aria-label="sleep">😴</span>;
                break;
            case 'WORK':
                icon = <span role="img" aria-label="briefcase"> 💼</span>;  
                break; 
            case 'BOOTY':
                icon = <span role="img" aria-label="peach">🍑</span>;
                break;
            default:
                icon = <span role="img" aria-label="wink">😉</span>;
        }
        return icon;
    }
    render() {        
        return (
            <div>
                {this.status()}
            </div>
        )
    }
}
