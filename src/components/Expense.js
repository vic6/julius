import React, {Component } from 'react';
import { Form } from 'semantic-ui-react';
import ExpenseForm from './ExpenseForm'

export default class Expense extends Component {
  render() {
    return(
      <ExpenseForm handleAddExpense={this.props.handleAddExpense} />
    )
  }
}
