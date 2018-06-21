import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Event from './components/Event';

class App extends Component {
  state = { eventName: '', participants: [{ name: '' }, { name: '' }] };

  addParticipant = () => {
    this.setState(prevState => ({ participants: [...prevState.participants, { name: '' }] }));
  };

  removeParticipant = formKey => {
    console.log(formKey);
    this.setState({
      participants: this.state.participants.filter((form, formId) => formId !== formKey)
    });
    console.log(this.state.participants);
  };

  eventNameChange = event => {
    this.setState({ eventName: event.target.value });
    // localStorage.setItem('eventName', this.state.eventName)
  };

  submitEvent = () => {
    localStorage.setItem('eventName', this.state.eventName)
    localStorage.setItem('participants', this.state.participants)
  }

  handleChange = (event, id) => {
    console.log('Form id', id);
    const newParticipants = this.state.participants.map((person, formId) => {
      if (id !== formId) return person;
      return { ...person, name: event.target.value };
    });

    this.setState({ participants: newParticipants });
  };

  renderForms = () => {
    const userForms = this.state.participants.map((particpant, id) => (
      <div key={id}>
        <Form.Group>
          <Form.Input
            placeholder="Persons name"
            type="text"
            value={particpant.name}
            onChange={event => this.handleChange(event, id)}
          />
          <Button onClick={() => this.removeParticipant(id)}>Remove</Button>
        </Form.Group>
      </div>
    ));
    console.log(this.state.participants);
    return userForms;
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  eventName={this.state.eventName}
                  eventNameChange={this.eventNameChange}
                  submitEvent={this.submitEvent}
                  addParticipant={this.addParticipant}
                  removeParticipant={this.removeParticipant}
                  handleChange={this.handleChange}
                  renderForms={this.renderForms}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/event"
              component={(props) => (
                <Event participants={this.state.participants} eventName={this.state.eventName} {...props} />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
