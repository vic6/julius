import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import './EventForm.css';

export default class EventForm extends Component {
  state = { participants: [] };

  addParticipant = () => {
    this.setState(prevState => ({ participants: [...prevState.participants, { name: '' }] }));
  };

  removeParticipant = (formKey) => {
    console.log(formKey);
    this.setState({
      participants: this.state.participants.filter((form, formId) => formId !== formKey)
    });
    console.log(this.state.participants)
  };

  handleChange = (event, id) => {
    console.log('Form id', id)
    const newParticipants = this.state.participants.map((person, formId) => {
      if (id !== formId) return person;
      return { ...person, name: event.target.value };
    });

    this.setState({ participants: newParticipants });
  }

  renderForms = () => {
    const userForms = this.state.participants.map((particpant, id) => (
      <div key={id}>
        <Form.Group>
          <Form.Input
            placeholder="Persons name"
            type="text"
            value={particpant.name}
            onChange={(event)=>this.handleChange(event, id)}
          />
          <Button onClick={() => this.removeParticipant(id)}>Remove</Button>
        </Form.Group>
      </div>
    ))
    return userForms
  };

  render() {
    console.log(this.state.participants)
    return (
      <Form className="event-form">
        <Form.Input label="Event name" placeholder="Dinner" type="text" />
        <Form.Input label="Participents" placeholder="Your name" type="text" />
        <Form.Input placeholder="Persons name" type="text" />
        {this.renderForms()}
        <Button onClick={this.addParticipant}>Add person</Button>
        <Link to='/event'><Form.Button>Create Event</Form.Button></Link>
      </Form>
    );
  }
}
