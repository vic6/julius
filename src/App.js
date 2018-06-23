import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Form, Button, Container } from 'semantic-ui-react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Event from './components/Event';
import Expense from './components/Expense';

class App extends Component {
  state = {
    eventName: '',
    participants: [{ name: '', profile: {} }, { name: '', profile: {} }],
    expenses: []
  };

  componentDidMount = () => {
    console.log('MOUNT', localStorage.getItem('expenses'));
    if (localStorage.getItem('expenses')) {
      const expenses = JSON.parse(localStorage.getItem('expenses'));
      this.setState({
        expenses
      });
    }
  };

  addParticipant = () => {
    this.setState(prevState => ({
      participants: [...prevState.participants, { name: '', profile: {} }]
    }));
  };

  handleAddExpense = (expense, resetForm) => {
    const split = expense.consumers.length;
    const participants = JSON.parse(localStorage.getItem('participants'));
    const { payer } = expense;
    expense.consumers.map(consumer => {
      if (consumer in payer.profile) {
        payer.profile[consumer] += expense.amount / split;
        const debtor = participants.filter(person => person.name === consumer)[0];
        debtor.profile[payer.name] -= expense.amount / split;
        const updatedParticipants = participants.map(person => {
          if (person.name === payer.name) {
            return payer;
          }
          return person;
        });
        localStorage.setItem('participants', JSON.stringify(updatedParticipants));
      } else if (consumer !== payer.name) {
        // payer.profile[consumer] = 0 + expense.amount / split;
        const debtor = participants.filter(person => person.name === consumer)[0];
        debtor.profile[payer.name] = 0 - expense.amount / split;
        payer.profile[debtor.name] = 0 + expense.amount / split;
        const updatedParticipants = participants.map(person => {
          if (person.name === debtor.name) {
            return debtor;
          } else if (person.name === payer.name) {
            return payer;
          }
          return person;
        });
        localStorage.setItem('participants', JSON.stringify(updatedParticipants));
      }
      return expense;
    });
    this.setState(prevState => ({ expenses: [...prevState.expenses, expense] }));
    // const expenses = JSON.parse(localStorage.getItem('expenses'));
    const updatedExpenses = [...this.state.expenses, expense];
    console.log('UPDATED expenses', updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    resetForm();
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
  };

  submitEvent = () => {
    localStorage.removeItem('eventName');
    localStorage.removeItem('participants');
    localStorage.removeItem('expenses');
    this.setState({
      expenses: []
    });

    localStorage.setItem('eventName', this.state.eventName);
    localStorage.setItem('participants', JSON.stringify(this.state.participants));
    localStorage.setItem('expenses', []);
  };

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
    return userForms;
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
            <Container>
              <Route
                exact
                path="/"
                render={props => (
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
                component={props => (
                  <Event
                    participants={this.state.participants}
                    eventName={this.state.eventName}
                    expenses={this.state.expenses}
                    {...props}
                  />
                )}
              />
              <Route
                path="/expense/new"
                render={props => <Expense handleAddExpense={this.handleAddExpense} {...props} />}
              />
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
