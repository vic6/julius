import React, { Component } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';

export default class Event extends Component {
  state = { expenses: [], eventLog: {} };

  getUserProfiles = ()=> {
    let debtorsList = [];
    const participants = JSON.parse(localStorage.getItem('participants'));
    const profiles = participants.filter(person => Object.keys(person.profile));
    console.log(profiles);
    console.log(participants)
    return profiles;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <Header as="h1">{localStorage.getItem('eventName')}</Header>
        </div>

        <pre>
          <p>{JSON.stringify(this.getUserProfiles(), null, 2)}</p>
        </pre>

        <span>
          Event Total{':$0'}
          <Link href='/expense/create/' to='/expense/create'><Button>Add Expense</Button></Link>
        </span>
      </div>
    );
  }
}
