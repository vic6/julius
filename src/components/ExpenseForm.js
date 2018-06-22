import React, { Component } from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import ItemForm from './ItemForm';

export default class ExpenseForm extends Component {

  render() {
    return (
      <Form>
        <Form.Input label="Expense name" placeholder='Camping Supplies' type="text" />
        <Form.Input label="Who Paid?" placeholder='Camping Supplies' type="text" />

        <ItemForm handleAddItem={this.props.handleAddItem} />
      </Form>
    );
  }
}
