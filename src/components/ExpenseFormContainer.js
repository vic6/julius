import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import ExpenseForm from './ExpenseForm';

export default class ExpenseFormContainer extends Component {
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

  goBackExpenseForm = history => {
    history.push('/event');
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
    const participants = JSON.parse(localStorage.getItem('participants'));
    const options = participants.map(person => ({
      text: person.name,
      value: person.name
    }));
    const { expenseName, amount, payer, consumers, errors, success } = this.state;
    return (
      <ExpenseForm
        handleAddExpense={this.props.handleAddExpense}
        handleChange={this.handleChange}
        handleAmountChange={this.handleAmountChange}
        resetExpenseForm={this.resetExpenseForm}
        handleSelectChange={this.handleSelectChange}
        toggleCheckbox={this.toggleCheckbox}
        isFormValid={this.isFormValid}
        renderCheckboxes={this.renderCheckboxes}
        options={options}
        expenseName={expenseName}
        amount={amount}
        payer={payer}
        consumers={consumers}
        errors={errors}
        success={success}
        history={this.props.history}
        goBackExpenseForm={this.goBackExpenseForm}
      />
    );
  }
}
