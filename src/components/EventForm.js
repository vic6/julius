import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import './EventForm.css';

export default class EventForm extends Component {
  // state = {
  //   eventName:'',
  //   participants: [{name: '', profile: {}}, {name: '', profile: {}}],
  //   expenses: []
  // }
  //
  // addParticipant = () => {
  //   this.setState(prevState => ({
  //     participants: [...prevState.participants, { name: '', profile: {} }]
  //   }));
  // };
  //
  // removeParticipant = formKey => {
  //   console.log(formKey);
  //   this.setState({
  //     participants: this.state.participants.filter((form, formId) => formId !== formKey)
  //   });
  //   console.log(this.state.participants);
  // };
  //
  // eventNameChange = event => {
  //   this.setState({ eventName: event.target.value });
  // };
  //
  // submitEvent = () => {
  //   localStorage.removeItem('eventName');
  //   localStorage.removeItem('participants');
  //   localStorage.removeItem('expenses');
  //   this.setState({expenses: []})
  //
  //   localStorage.setItem('eventName', this.state.eventName);
  //   localStorage.setItem('participants', JSON.stringify(this.state.participants));
  //   localStorage.setItem('expenses', this.state.expenses);
  // };
  //
  // handleChange = (event, id) => {
  //   console.log('Form id', id);
  //   const newParticipants = this.state.participants.map((person, formId) => {
  //     if (id !== formId) return person;
  //     return { ...person, name: event.target.value };
  //   });
  //   this.setState({ participants: newParticipants });
  // };
  //
  // renderForms = () => {
  //   const userForms = this.state.participants.map((particpant, id) => (
  //     <div key={id}>
  //       <Form.Group>
  //         <Form.Input
  //           placeholder="Persons name"
  //           type="text"
  //           value={particpant.name}
  //           onChange={event => this.handleChange(event, id)}
  //         />
  //         <Button onClick={() => this.removeParticipant(id)}>Remove</Button>
  //       </Form.Group>
  //     </div>
  //   ));
  //   return userForms;
  // };

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
        {this.props.errors && <p className='errors'>{this.props.errors}</p>}
        <Form.Field label="Participents" />
        <div className="event-form__participants">
          {!!this.props.renderForms && this.props.renderForms()}
          <Button onClick={this.props.addParticipant}>Add person</Button>
        </div>
        <Form.Button type="submit">Create Event</Form.Button>
      </Form>
    );
  }
}
