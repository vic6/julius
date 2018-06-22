import React, {Component } from 'react';
import { Form } from 'semantic-ui-react';
import ExpenseForm from './ExpenseForm'

export default class Expense extends Component {
  state = {name: '', payer: '', total: '', items: []}

  handleAddItem = (item) => {
    this.setState((prevState) => ({items: [...prevState.items, item]}))
  }

  render() {
    console.log(this.state.items)
    return(
      <ExpenseForm handleAddItem={this.handleAddItem} />
    )
  }
}
