import React, { Component } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';

export default class Event extends Component {
  state = { expenses: [], eventLog: {} };

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
