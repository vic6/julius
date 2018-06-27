import React from 'react';
import renderer from 'react-test-renderer';
import ExpenseFormContainer from '../components/ExpenseFormContainer';

test('ExpenseFormContainer renders correctly', ()=> {
  const participants = [{name: 'chef', profile: {}}, {name: 'bob', profile: {}}, {name: 'stan', profile: {}}]
  const expenses = {expenseName: 'Girl scout cookies', amount: '3.50', payer: participants[0], consumers: [participants[1], participants[2]]}

  localStorage.setItem('participants', JSON.stringify(participants))
  localStorage.setItem('expenses', JSON.stringify(expenses))

  const component = renderer.create(<ExpenseFormContainer />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
