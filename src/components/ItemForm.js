import React, {Component} from 'react';
import { Button, Checkbox, Form, Grid } from 'semantic-ui-react';

export default class ItemForm extends Component {
  state = {itemName: '', amount: '', consumers: []}

  renderCheckboxes = () =>
    JSON.parse(localStorage.getItem('participants')).map(person => (
      <Form.Field label={{ children: person.name }} control={Checkbox} />
    ));

  render() {
    return (
      <Form>
        <Form.Input label='Item name' type='text' placeholder='flashlight' />
        <Form.Input label='Amount' type='number' />
        <Form.Field label="Split Between" />
        {this.renderCheckboxes()}
        <Button>Enter Item</Button>
      </Form>
    )
  }
}
