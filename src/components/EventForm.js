import React, { Component } from 'react';
import { Button, Input, Form } from 'semantic-ui-react';
import './EventForm.css';

export default class EventForm extends Component {
  state = { participents: [] };

  addParticipant = () => {
    this.setState(prevState => ({
      participents: [
        ...prevState.participents,
        <Form.Input placeholder="Persons name" type="text" />
      ]
    }));
  };

  render() {
    return (
      <Form className="event-form">
        <Form.Input label="Event name" placeholder="Dinner" type="text" />
        <Form.Input label="Participents" placeholder="Your name" type="text" />
        <Form.Input placeholder="Person" type="text" />
        {this.state.participents.length > 0 && this.state.participents}
        <Button onClick={this.addParticipant}>Add person</Button>
        <Form.Button>Create Event</Form.Button>
      </Form>
    );
  }
}
