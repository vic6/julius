import React, { Component } from 'react';
import { Button, Form, Select } from 'semantic-ui-react';

const uuid = require('uuid');

export default class ExpenseForm extends Component {
  render() {
    const { options } = this.props;
    const { expenseName, amount, payer, errors, success, consumers } = this.props;
    const expense = { expenseName, amount, payer, consumers };
    expense.id = uuid();
    return (
      <div>
        {success && success}
        <Form
          autoComplete="off"
          onSubmit={() =>
            this.props.handleAddExpense(
              expense,
              this.props.resetExpenseForm,
              this.props.isFormValid
            )
          }>
          {errors && <p className="errors">{errors}</p>}
          <Form.Field
            required
            placeholder="Name"
            onChange={this.props.handleSelectChange}
            control={Select}
            name="payer"
            label="Who Paid"
            options={options}
            value={payer ? payer.name : null}
          />
          <Form.Input
            required
            label="Item name"
            name="expenseName"
            type="text"
            placeholder="flashlight"
            value={expenseName}
            onChange={this.props.handleChange}
          />
          <Form.Input
            label="Amount"
            name="amount"
            type="text"
            required
            value={amount}
            onChange={this.props.handleAmountChange}
          />
          <Form.Field name="consumers" label="Split Between" />
          {this.props.renderCheckboxes()}
          <Button primary>Enter Item</Button>
          <Button onClick={() => this.props.goBackExpenseForm(this.props.history)} secondary>
            Back
          </Button>
        </Form>
      </div>
    );
  }
}
