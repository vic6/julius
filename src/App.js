import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Event from './components/Event';
import Expense from './components/Expense';

class App extends Component {
  state = { eventName: '', participants: [{ name: '', profile: {} }, { name: '', profile: {} }], expenses: [] };

  addParticipant = () => {
    this.setState(prevState => ({ participants: [...prevState.participants, { name: '', profile: {} }] }));
  };

  // handleAddExpense = expense => {
  //   this.handleAddExpense(expense)
  //   this.setState(prevState => ({ expenses: [...prevState.expenses, expense] }));
  // };

  // for (let consumer of consumers) {
  //     // console.log(consumer);
  //     if (consumer.name in this.payer.profile) {
  //       // console.log('IN PROFILE');
  //       this.payer.profile[consumer.name] += item.amount / split;
  //       consumer.profile[this.payer.name] -= item.amount / split;
  //     } else if (consumer.name !== this.payer.name) {
  //       // console.log('NOT in profile');
  //       this.payer.profile[consumer.name] = 0 + item.amount / split;
  //       consumer.profile[this.payer.name] = 0 - item.amount / split;
  //     }
  //     // consumer.expenses.push(this);
  //   }

  handleAddExpense = (expense) => {
    const newExpense = expense
    const split = expense.consumers.length;
    const participants = JSON.parse(localStorage.getItem('participants'));
    const {payer} = expense;
    const people = expense.consumers.map((consumer) => {

      if (consumer in payer.profile) {
        payer.profile[consumer] += expense.amount / split
        const debtor = participants.filter(person => person.name === consumer)[0];
        debtor.profile[payer.name] -= expense.amount/split;
        let updatedParticipants = participants.map((p) => {
          if(p.name === payer.name) {
            return payer;
          }
          return p;
        })
        localStorage.setItem('participants', JSON.stringify(updatedParticipants));
        console.log(updatedParticipants)

      } else if (consumer !== payer.name){
        payer.profile[consumer] = 0 + expense.amount / split;
        const debtor = participants.filter(person => person.name === consumer)[0];
        debtor.profile[payer.name] = 0 - expense.amount / split;
        payer.profile[debtor.name] = 0 + expense.amount / split;
        console.log('DEBTOR', debtor)
        console.log('PAYER', payer)
        let updatedParticipants = participants.map(p => {
          if(p.name === debtor.name) {
            return debtor;
          } else if(p.name === payer.name) {
            return payer;
          }
            return p;
        })
        localStorage.setItem('participants', JSON.stringify(updatedParticipants));
        console.log(participants)
        console.log(updatedParticipants)
        // localStorage.setItem('participants', updatedParticipants)
        // console.log('UPDATed', updatedParticipants)
      }
      console.log(people)
      this.setState(prevState => ({ expenses: [...prevState.expenses, expense] }));

    })
    console.log('NEW', newExpense);
    return newExpense;
  }

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
    localStorage.setItem('eventName', this.state.eventName);
    localStorage.setItem('participants', JSON.stringify(this.state.participants));
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
                  {...props}
                />
              )}
            />
            <Route
              path="/expense/create"
              render={props => <Expense handleAddExpense={this.handleAddExpense} {...props} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
