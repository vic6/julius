import React, { Component } from 'react';
import { Button, Grid, Icon, Header, List } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';

export default class Event extends Component {
  getUserProfiles = () => {
    const debtorsList = [];
    const participants = JSON.parse(localStorage.getItem('participants'));

    if(participants.length > 0){
      participants.map(person => {
        const profileNames = Object.keys(person.profile);

        if (profileNames.length > 0) {
          profileNames.map(name => {
            if (person.profile[name] > 0) {
              debtorsList.push(
                <List.Item
                  icon="money"
                  content={`${name} owes ${person.name} $${person.profile[name]}`}
                />
              );
            }
            return name;
          });
        }
        return person;
      });
    }
    return debtorsList;
  };

  renderExpenses = () => {
    const participants = JSON.parse(localStorage.getItem('participants'));
    // let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const expenses = this.props.expenses.map(expense => {
      const { payer, amount, expenseName, consumers } = expense;
      const content = consumers.length === participants.length ? 'Everybody' : 'Some People';
      return (
        <List.Item>
          <List.Icon name="shop" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{`${payer.name} paid $${amount} for ${expenseName}`}</List.Header>
            <List.Description>{`People involved: ${content}`}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
    return expenses;
  };

  render() {
    return (
      <div>
        <div>
          <Header as="h1">{localStorage.getItem('eventName')}</Header>
        </div>
        <List>
          {this.getUserProfiles()}
        </List>
        <Header as='h2'>Expenses</Header>
        <List divided relaxed>
          {this.renderExpenses()}
        </List>
        <span>
          Event Total{':$0'}
          <Link href="/expense/new/" to="/expense/new">
            <Button>Add Expense</Button>
          </Link>
        </span>
      </div>
    );
  }
}
