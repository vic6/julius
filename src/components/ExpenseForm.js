import React, { Component } from 'react';
import { Button, Checkbox, Form, Select } from 'semantic-ui-react';

export default class ExpenseForm extends Component {
  state = { expenseName: '', amount: '', payer: {}, consumers: [] };

//   addItem(name, amount, consumers) {
//   let item = new Item(name, amount, consumers);
//   this.items.push(item);
//   this.total += item.amount;
//   let split = consumers.length;
//
//   for (let consumer of consumers) {
//     // console.log(consumer);
//     if (consumer.name in this.payer.profile) {
//       // console.log('IN PROFILE');
//       this.payer.profile[consumer.name] += item.amount / split;
//       consumer.profile[this.payer.name] -= item.amount / split;
//     } else if (consumer.name !== this.payer.name) {
//       // console.log('NOT in profile');
//       this.payer.profile[consumer.name] = 0 + item.amount / split;
//       consumer.profile[this.payer.name] = 0 - item.amount / split;
//     }
//     // consumer.expenses.push(this);
//   }
//   return `Total: $${this.total}`;
// }

// handleExpenseAmount = (expense) => {
//   const split = this.state.consumers.length;
//   const participants = JSON.parse(localStorage.getItem('participants'));
//   const {amount, consumers, payer} = this.state
//   return consumers.map((consumer) => {
//     if (consumer in participants[payer].profile) {
//       participants[payer].profile[payer] += amount / split
//     } else if (consumer !== payer){
//       participants[payer].profile[consumer] = 0 + amount / split;
//       participants[consumer].profile[payer] = 0 - amount / split;
//     }
//     return 'Done';
//   })
// }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSelectChange = event => {
    const participants = JSON.parse(localStorage.getItem('participants'));
    console.log(participants)
    console.log('Event',event.target.innerText)
    const payer = participants.filter(participant => participant.name === event.target.innerText)[0]
    console.log(payer);
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
    // onSubmit={()=>this.props.handleAddItem(this.state)}
    return (
      <Form onChange={this.handleChange} onSubmit={() => this.props.handleAddExpense(this.state)}>
        <Form.Input
          label="Item name"
          name="expenseName"
          type="text"
          placeholder="flashlight"
          value={expenseName}
          // value='Ice cream'
        />
        <Form.Field
          onChange={this.handleSelectChange}
          control={Select}
          name="payer"
          label="Who Paid"
          options={options}
        />
        <Form.Input label="Amount" name="amount" type="number"
          value={amount}
          // value='34'

        />
        <Form.Field name="consumers" label="Split Between" />
        {this.renderCheckboxes()}
        <Button>Enter Item</Button>
      </Form>
    );
  }
}
