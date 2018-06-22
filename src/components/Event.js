import React, { Component } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';

export default class Event extends Component {
  state = { expenses: [], eventLog: {} };

  handleAddExpense = (expense) => {
    this.setState((prevState) => ({expenses: [...prevState.expenses, expense]}))
    localStorage.set('expenses', JSON.stringify(this.state.expenses))
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <Header as="h1">{localStorage.getItem('eventName')}</Header>
        </div>

        <span>
          Event Total{':$0'}
          <Link href='/expense/create/' to='/expense/create'><Button>Add Expense</Button></Link>
        </span>
      </div>
    );
  }
}
