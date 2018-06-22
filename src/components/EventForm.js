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
        {/* <Form.Input onChange={event => this.props.handleChange(event)} label="Participents" placeholder="Your name" type="text" />
        <Form.Input onChange={this.props.handleChange} placeholder="Persons name" type="text" /> */}
        {this.props.renderForms()}
        <Button onClick={this.props.addParticipant}>Add person</Button>
        <Link href="/event" to="/event">
          <Form.Button onClick={this.props.submitEvent}>Create Event</Form.Button>
        </Link>
      </Form>
    );
  }
}
