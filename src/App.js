import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Form, Button, Container } from 'semantic-ui-react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Event from './components/Event';
import Expense from './components/Expense';
import './App.css';

class App extends Component {
  state = {
    eventName: '',
    participants: [{ name: '', profile: {} }, { name: '', profile: {} }],
    expenses: [],
    errors: false
  };

  componentDidMount = () => {
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

  handleAddExpense = (expense, resetForm, isFormValid) => {
    if (isFormValid()) {
      const split = expense.consumers.length;
      if (!expense.payer) return;
      if (split.length === 0) return;
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

      document.querySelectorAll('input[type=checkbox]').forEach(el => (el.checked = false));
      this.setState(prevState => ({ expenses: [expense, ...prevState.expenses] }));
      const updatedExpenses = [...this.state.expenses, expense];
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      resetForm();
    }
  };

  removeParticipant = formKey => {
    this.setState({
      participants: this.state.participants.filter((form, formId) => formId !== formKey)
    });
  };

  eventNameChange = event => {
    this.setState({ eventName: event.target.value });
  };

  submitEvent = props => {
    const names = new Set();
    const hasDuplicates = this.state.participants.some(
      person => names.size === names.add(person.name.trim()).size
    );
    const emptyString = this.state.participants.filter(person => person.name.trim().length === 0);
    if (hasDuplicates) {
      this.setState({
        errors: 'Duplicate names or not allowed'
      });
    } else if (emptyString.length > 0) {
      this.setState({ errors: 'Please enter participants' });
    } else {
      this.setState({ errors: false });
      localStorage.removeItem('eventName');
      localStorage.removeItem('participants');
      localStorage.removeItem('expenses');
      this.setState({ expenses: [] });
      localStorage.setItem('eventName', this.state.eventName);
      localStorage.setItem('participants', JSON.stringify(this.state.participants));
      localStorage.setItem('expenses', []);
      props.history.push('/event');
    }
  };

  handleChange = (event, id) => {
    const newParticipants = this.state.participants.map((person, formId) => {
      if (id !== formId) return person;
      return { ...person, name: event.target.value };
    });
    this.setState({ participants: newParticipants });
  };

  renderForms = () => {
    // key should use a uuid rather than index
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
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home
                      eventName={this.state.eventName}
                      eventNameChange={this.eventNameChange}
                      errors={this.state.errors}
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
                  component={props =>
                    localStorage.getItem('eventName') ? (
                      <Event expenses={this.state.expenses} {...props} />
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
                <Route
                  path="/expense/new"
                  render={props => <Expense handleAddExpense={this.handleAddExpense} {...props} />}
                />
                <Redirect to="/" />
              </Switch>
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
