import React, { Component } from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './EventForm.css';

export default class EventForm extends Component {
  render() {
    return (
      <Form className="event-form">
        <Form.Input
          onChange={this.props.eventNameChange}
          label="Event name"
          placeholder="Camping Trip"
          type="text"
          value={this.props.eventName}
        />
        <Form.Field label="Participents" />
        <div className='event-form__participants'>
        {this.props.renderForms()}
        <Button onClick={this.props.addParticipant}>Add person</Button>
      </div>

        <Link href="/event" to="/event">
          <Form.Button onClick={this.props.submitEvent}>Create Event</Form.Button>
        </Link>
      </Form>
    );
  }
}
