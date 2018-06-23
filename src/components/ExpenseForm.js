import React, { Component } from 'react';
import { Button, Checkbox, Form, Select } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class ExpenseForm extends Component {
  state = {
    expenseName: '',
    amount: '',
    payer: {},
    consumers: []
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  resetExpenseForm = () => {
    this.setState({
      payer: '', expenseName: '', amount: '', consumers: ''
    })
  }

  handleSelectChange = event => {
    const participants = JSON.parse(localStorage.getItem('participants'));
    const payer = participants.filter(
      participant => participant.name === event.target.innerText
    )[0];
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

  renderCheckboxes = () =>
    JSON.parse(localStorage.getItem('participants')).map(person => (
      <Form.Field
        key={person.name}
        onChange={() => this.toggleCheckbox(person)}
        label={{ children: person.name }}
        control={Checkbox}
        value={person.name}
      />
    ));

  render() {
    const { expenseName, amount } = this.state;
    const participants = JSON.parse(localStorage.getItem('participants'));
    const options = participants.map(person => ({ text: person.name, value: person.name }));
    return (
      <Form onChange={this.handleChange} onSubmit={() => this.props.handleAddExpense(this.state, this.resetExpenseForm)}>
        <Form.Field
          required
          onChange={this.handleSelectChange}
          control={Select}
          name="payer"
          label="Who Paid"
          options={options}
        />
        <Form.Input
          required
          label="Item name"
          name="expenseName"
          type="text"
          placeholder="flashlight"
          value={expenseName}
        />
        <Form.Input label="Amount" name="amount" type="number" required value={amount} />
        <Form.Field name="consumers" label="Split Between" required/>
        {this.renderCheckboxes()}
        <Button primary>Enter Item</Button>
        <Link href='/event'to='/event'><Button secondary>Back</Button></Link>

      </Form>
    );
  }
}
