import React, {Component} from 'react';
import { Button, Grid,Header } from 'semantic-ui-react';
import ExpenseForm from './ExpenseForm';


export default class Event extends Component {
  state = { expenses: [], eventLog: {}};


  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <Header as='h1'>{localStorage.getItem('eventName')}</Header>
        </div>

        <div>
          <span>Event Total<Button>Add Expense</Button></span>
        </div>
      </div>
    )
  }
}
