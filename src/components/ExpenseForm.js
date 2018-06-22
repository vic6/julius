import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

export default class ExpenseForm extends Component {
    state = {expenseName: '', amount: '', consumers: []}

    handleChange = (event) => {
      console.log(this.state);
      const { name, value } = event.target;
      this.setState({
        [name]: value
      })
    }

    toggleCheckbox = (particpant) => {
      if(this.state.consumers.includes(particpant.name)) {
        this.setState({
          consumers: this.state.consumers.filter(person => person !== particpant.name)
        })
      } else {
        this.setState({
          consumers: [...this.state.consumers, particpant.name]
        })
      }
    }

    renderCheckboxes = () =>
      JSON.parse(localStorage.getItem('participants')).map(person => (
        <Form.Field key={person.name} onChange={()=>this.toggleCheckbox(person)} label={{ children: person.name }} control={Checkbox} value={person.name} />
      ));

    render() {
      const { expenseName, amount } = this.state;
      console.log(this.state.consumers)
      // onSubmit={()=>this.props.handleAddItem(this.state)}
      return (
        <Form onChange={this.handleChange} onSubmit={()=>this.props.handleAddExpense(this.state)}>
          <Form.Input label="Expense name" placeholder='Camping Supplies' type="text" />
          <Form.Input label="Who Paid?" placeholder='Camping Supplies' type="text" />

          <Form.Input label='Item name' name='expenseName' type='text' placeholder='flashlight' value={expenseName} />
          <Form.Input label='Amount' name='amount' type='number' value={amount} />
          <Form.Field name='consumers'label="Split Between" />
          {this.renderCheckboxes()}
          <Button>Enter Item</Button>
        </Form>
      )
    }
  }
