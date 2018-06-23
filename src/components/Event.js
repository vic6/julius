import React, { Component } from 'react';
import { Button, Grid, Header, Message } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';

export default class Event extends Component {

  // getUserProfiles = ()=> {
  //   const participants = JSON.parse(localStorage.getItem('participants'));
  //   return participants;
  // }

  renderExpenses = () => {
    let expenses = [];
  }

  getUserProfiles = ()=> {
    const debtorsList = [];
    const participants = JSON.parse(localStorage.getItem('participants'));
    const profiles = participants.map(person => {
      console.log('PROFILE', person.profile)
      console.log(Object.keys(person.profile))
      const profileNames = Object.keys(person.profile)

      if(profileNames.length > 0) {
        profileNames.map(name => {
          if (person.profile[name] > 0) {
            debtorsList.push(`${name} owes ${person.name} $${person.profile[name]}`)
          }
        })
      }
    })
    console.log('DEBT')
    return debtorsList;
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
