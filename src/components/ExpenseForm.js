import React, { Component } from 'react';
import { Button, Form, Message, Select } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class ExpenseForm extends Component {
  state = {
    expenseName: '',
    amount: '',
    payer: {},
    consumers: [],
    errors: false,
    success: null
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAmountChange = event => {
    const amount = event.target.value;
    const currencyCheck = /^\d{1,}(\.\d{0,2})?$/;
    // allows user to clear amount
    if (!amount || amount.match(currencyCheck)) {
      this.setState(() => ({ amount }));
    }
  };

  resetExpenseForm = () => {
    this.setState({
      payer: '',
      expenseName: '',
      amount: '',
      consumers: []
    });
  };

  handleSelectChange = event => {
    const participants = JSON.parse(localStorage.getItem('participants'));
    const payer =
      participants.filter(participant => participant.name === event.target.innerText)[0] || '';
    this.setState({ payer });
  };

  toggleCheckbox = particpant => {
    if (this.state.consumers.includes(particpant.name)) {
      this.setState({
        consumers: this.state.consumers.filter(person => person !== particpant.name)
      });
    } else {
      this.setState({
        consumers: [...this.state.consumers, particpant.name]
      });
    }
  };

  isFormValid = () => {
    if (this.state.payer.name === undefined) {
      this.setState({
        errors: 'Please select a payer'
      });
      return false;
    } else if (this.state.consumers.length < 1) {
      this.setState({ errors: 'Select at least 1 person to charge' });
      return false;
    }
    this.setState({
      errors: false,
      success: <Message success header={`Expense Added: ${this.state.expenseName}`} />
    });
    return true;
  };

  renderCheckboxes = () =>
    JSON.parse(localStorage.getItem('participants')).map(person => (
      <Form.Field
        key={person.name}
        onChange={event => this.toggleCheckbox(person, event)}
        label={person.name}
        value={person.name}
        control="input"
        type="checkbox"
      />
    ));

  render() {
    const { expenseName, amount } = this.state;
    const participants = JSON.parse(localStorage.getItem('participants'));
    const options = participants.map(person => ({ text: person.name, value: person.name }));
    return (
      <div>
        {this.state.success && this.state.success}
        <Form
          onSubmit={() =>
            this.props.handleAddExpense(this.state, this.resetExpenseForm, this.isFormValid)
          }>
          {this.state.errors && <p className="errors">{this.state.errors}</p>}
          <Form.Field
            required
            placeholder="Name"
            onChange={this.handleSelectChange}
            control={Select}
            name="payer"
            label="Who Paid"
            options={options}
            value={this.state.payer ? this.state.payer.name : null}
          />
          <Form.Input
            required
            label="Item name"
            name="expenseName"
            type="text"
            placeholder="flashlight"
            value={expenseName}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Amount"
            name="amount"
            type="text"
            required
            value={amount}
            onChange={this.handleAmountChange}
          />

          <Form.Field name="consumers" label="Split Between" />
          {this.renderCheckboxes()}
          <Button primary>Enter Item</Button>
          <Link href="/event" to="/event">
            <Button secondary>Back</Button>
          </Link>
        </Form>
      </div>
    );
  }
}
