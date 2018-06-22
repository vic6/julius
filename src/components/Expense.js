import React, {Component } from 'react';
import { Form } from 'semantic-ui-react';
import ExpenseForm from './ExpenseForm'

export default class Expense extends Component {
  state = {name: '', payer: '', total: '', consumers: []}

  render() {
    console.log(this.state.items)
    return(
      <ExpenseForm handleAddExpense={this.props.handleAddExpense} />
    )
  }
}
