import React, {Component} from 'react';

export default class Event extends Component {
  state = {eventName: '', expenses: []};

  render() {
    return (
      <div>
        {this.state.eventName}
      </div>
    )
  }
}
