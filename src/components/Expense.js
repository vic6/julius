import React, {Component } from 'react';
import { Form } from 'semantic-ui-react';
import ExpenseForm from './ExpenseForm'

export default class Expense extends Component {
  state = {items: []}

  handleAddItem = () => {
    
  }

  render() {
    return(
      <ExpenseForm />
    )
  }
}
