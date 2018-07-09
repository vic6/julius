import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import './EventForm.css';

export default class EventForm extends Component {
  render() {
    return (
      <Form className="event-form" onSubmit={() => this.props.submitEvent(this.props)}>
        <Form.Input
          onChange={this.props.eventNameChange}
          label="Event name"
          placeholder="Camping Trip"
          type="text"
          value={this.props.eventName}
          required
        />
        {this.props.errors && <p className="errors">{this.props.errors}</p>}
        <Form.Field label="Participants" />
        <div className="event-form__participants">
          {!!this.props.renderForms && this.props.renderForms()}
          <Button onClick={this.props.addParticipant}>Add person</Button>
        </div>
        <Form.Button type="submit">Create Event</Form.Button>
      </Form>
    );
  }
}
