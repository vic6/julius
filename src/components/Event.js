import React, { Component } from 'react';
import { Button, Header, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import round2Fixed from '../utils/index';

export default class Event extends Component {
  getUserProfiles = () => {
    const debtorsList = [];
    const participants = JSON.parse(localStorage.getItem('participants'));

    if (participants.length > 0) {
      participants.map((person, i)=> {
        const profileNames = Object.keys(person.profile);
        if (profileNames.length > 0) {
          profileNames.map(name => {
            if (person.profile[name] > 0) {
              debtorsList.push(
                <List.Item
                  key={i}
                  icon="money"
                  content={`${name} owes ${person.name} $${round2Fixed(person.profile[name], 2)}`}
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
    const expenses = this.props.expenses.map(expense => {
      const { payer, amount, expenseName, consumers } = expense;
      console.log(expense)
      const content = consumers.length === participants.length ? 'Everybody' : consumers;
      return (
        <List.Item key={expense.id}>
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
        <List>{this.getUserProfiles()}</List>
        <Header as="h2">Expenses</Header>
        <List divided relaxed>
          {this.renderExpenses()}
        </List>
        <span>
          <Link href="/expense/new/" to="/expense/new">
            <Button>Add Expense</Button>
          </Link>
        </span>
      </div>
    );
  }
}
